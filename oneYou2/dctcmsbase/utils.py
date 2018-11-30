import datetime
import html
import json

from collections import OrderedDict
from bs4 import BeautifulSoup
from django.conf import settings
from django.utils import timezone
from django.utils.encoding import is_protected_type

from wagtail.documents.models import Document

from wagtailmedia.models import Media

from dctsharedcontent.models import SharedContent
from home.models import SiteSettings


def process_inlines(field):
    if field:
        field = process_inline_hyperlinks(field)
        field = process_inline_images(field)
    return field


def process_inline_images(field):
    from images.models import PHEImage
    soup = BeautifulSoup(field, 'html.parser')
    embed_tags = soup.findAll('embed')
    for embed_tag in embed_tags:
        image = PHEImage.objects.get(id=embed_tag['id'])
        alt_text = embed_tag.get('alt', '')
        img_tag_src = '<img alt="{}" src="{}"/>'.format(alt_text, image.link)
        img_tag = BeautifulSoup(img_tag_src, 'html.parser')
        embed_tag.replaceWith(img_tag)
    return html.unescape(str(soup)).replace(';=', '=')


def process_inline_hyperlinks(field):
    from wagtail.core.models import Page
    soup = BeautifulSoup(field, 'html.parser')
    a_tags = soup.findAll('a', {'linktype': 'page'})
    for a_tag in a_tags:
        page = Page.objects.get(id=a_tag['id'])
        site_name = SiteSettings.objects.get(site=page.get_site()).uid
        url_parts = page.get_url_parts()
        a_tag['href'] = '/{}{}'.format(site_name, url_parts[2])
    return html.unescape(str(soup)).replace(';=', '=')


#
#   Called when a page is saved or published.
#
#   Sets the image_meta field to the appropriate rendition.
#   Processes inline tags in rich text fields to convert them to actual URLs.
#
def parse_shelf(shelf, parent=None):
    if type(shelf['value']) is dict or type(shelf['value']) is OrderedDict:
        shelf_type = shelf['type']

        # Process inline tags, updating shelf values as necessary.
        for key in shelf['value']:
            if type(shelf['value'][key]) is str:
                shelf['value'][key] = process_inlines(shelf['value'][key])
            if type(shelf['value'][key]) is list:
                items = shelf['value'][key]
                for item in items:
                    if type(item) is dict or type(item) is OrderedDict:
                        # Item is a block, such as a grid item.
                        parse_shelf(item, parent=shelf)

                    if type(item) is list:
                        # Item is a row (eg. table row) that contains blocks.
                        for subitem in item:
                            parse_shelf(subitem, parent=shelf)

    return shelf


def get_field_value(field, model):
    if field.remote_field is None:
        value = field.pre_save(model, add=model.pk is None)

        # Make datetimes timezone aware
        # https://github.com/django/django/blob/master/django/db/models/fields/__init__.py#L1394-L1403
        if isinstance(value, datetime.datetime) and settings.USE_TZ:
            if timezone.is_naive(value):
                default_timezone = timezone.get_default_timezone()
                value = timezone.make_aware(value, default_timezone).astimezone(timezone.utc)
            # convert to UTC
            value = timezone.localtime(value, timezone.utc)

        if is_protected_type(value):
            return value
        else:
            if field.verbose_name is 'body':
                field_dict = json.loads(field.value_to_string(model))
                final_content = []
                for shelf in field_dict:
                    parse_shelf(shelf, parent=None)
                    shelf['content'] = shelf['value']
                    final_content.append(shelf)
                return json.dumps(final_content)
            else:
                return field.value_to_string(model)
    else:
        return getattr(model, field.get_attname())


def get_serializable_data_for_fields(model):
    """
    Return a serialised version of the model's fields which exist as local database
    columns (i.e. excluding m2m and incoming foreign key relations)
    """
    pk_field = model._meta.pk
    # If model is a child via multitable inheritance, use parent's pk
    while pk_field.remote_field and pk_field.remote_field.parent_link:
        pk_field = pk_field.remote_field.model._meta.pk

    obj = {'pk': get_field_value(pk_field, model)}

    for field in model._meta.fields:
        if field.serialize:
            obj[field.name] = get_field_value(field, model)

    return obj