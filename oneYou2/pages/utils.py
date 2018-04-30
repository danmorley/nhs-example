import datetime
import json

from bs4 import BeautifulSoup
from django.conf import settings
from django.utils import timezone
from django.utils.encoding import is_protected_type

from shelves.models import ShelfAbstract


SHARED_CONTENT_TYPES = ['promo_shelf', 'banner_shelf', 'app_shelf']


def replace_links(field):
    field = render_image_links(field)
    field = render_page_chooser_links(field)
    return field


def render_image_links(field):
    from images.models import PHEImage
    if field:
        soup = BeautifulSoup(field, "html.parser")
        results = soup.findAll("embed")
        for result in results:
            image = PHEImage.objects.get(id=result['id'])
            alt_text = result.get("alt", "")
            img_tag_src = '<img alt="{}" src="{}"/>'.format(alt_text, image.link)
            img_tag = BeautifulSoup(img_tag_src, "html.parser")
            result.replaceWith(img_tag)
        return str(soup)
    else:
        return field


def render_page_chooser_links(field):
    from wagtail.wagtailcore.models import Page
    if field:  # If the field is blank soup would return html, head & body tags.
        soup = BeautifulSoup(field, "html.parser")
        results = soup.findAll("a", {"linktype": "page"})
        for result in results:
            page = Page.objects.get(id=result['id'])
            site_name = page.get_site().site_name
            url_parts = page.get_url_parts()
            result['href'] = '/{}{}'.format(site_name.lower(), url_parts[2])
        return str(soup)
    else:
        return field


def parse_shelf(shelf, parent=None):
    if type(shelf['value']) is dict:
        shelf_type = shelf['type']
        if not parent:
            shelf['value']['image_meta'] = '{}/{}/{}'.format(shelf_type, None, None)
        elif parent.get('type') == 'grid_shelf':
            shelf['value']['image_meta'] = "{}/{}/{}".format(shelf_type, parent['type'], parent['value']['meta_layout'])
        else:
            shelf['value']['image_meta'] = "{}/{}/{}".format(shelf_type, parent['type'], None)

        for key in shelf['value']:
            if type(shelf['value'][key]) is str:
                shelf['value'][key] = replace_links(shelf['value'][key])
            if type(shelf['value'][key]) is list:
                items = shelf['value'][key]
                for item in items:
                    parse_shelf(item, parent=shelf)

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

                    if shelf['type'] in SHARED_CONTENT_TYPES:
                        shelf['content'] = ShelfAbstract.objects.get(id=shelf['value']).specific.serializable_data()
                        final_content.append(shelf)
                    else:
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
