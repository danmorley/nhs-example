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

from shelves.models import ShelfAbstract

SHARED_CONTENT_TYPES = ['promo_shelf', 'banner_shelf', 'app_shelf']


def process_inlines(field):
    if field:
        field = process_inline_hyperlinks(field)
        field = process_inline_images(field)
    return field


def process_inline_images(field):
    from images.models import PHEImage
    soup = BeautifulSoup(field, "html.parser")
    embed_tags = soup.findAll("embed")
    for embed_tag in embed_tags:
        image = PHEImage.objects.get(id=embed_tag['id'])
        alt_text = embed_tag.get("alt", "")
        img_tag_src = '<img alt="{}" src="{}"/>'.format(alt_text, image.link)
        img_tag = BeautifulSoup(img_tag_src, "html.parser")
        embed_tag.replaceWith(img_tag)
    return html.unescape(str(soup)).replace(';=', '=')


def process_inline_hyperlinks(field):
    from wagtail.core.models import Page
    soup = BeautifulSoup(field, "html.parser")
    a_tags = soup.findAll("a", {"linktype": "page"})
    for a_tag in a_tags:
        page = Page.objects.get(id=a_tag['id'])
        site_name = page.get_site().site_name
        url_parts = page.get_url_parts()
        a_tag['href'] = '/{}{}'.format(site_name.lower(), url_parts[2])
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

        # To be removed in favour of ImageBlocks when all images have been converted to
        # ImageBlocks.
        if not parent:
            shelf['value']['image_meta'] = '{}/{}/{}'.format(shelf_type, None, None)
        elif parent.get('type') == 'grid_shelf':
            shelf['value']['image_meta'] = "{}/{}/{}".format(shelf_type, parent['type'], parent['value']['meta_layout'])
        else:
            shelf['value']['image_meta'] = "{}/{}/{}".format(shelf_type, parent['type'], None)

        # Process ImageBlocks by setting the meta_rendition (formerly image_meta) field
        # By convention, images must end in '_image' to be processed.
        for key in shelf['value']:
            if key.endswith('_image'):
                value = shelf['value'][key]
                if type(value) is dict or type(value) is OrderedDict:
                    if parent:
                        shelf['value'][key]['meta_rendition_key'] = \
                            "{}/{}/{}".format(shelf_type, parent['type'], parent['value']['meta_layout'])
                    else:
                        shelf['value'][key]['meta_rendition_key'] = "{}/{}/{}".format(shelf_type, None, None)

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


def determine_image_rendtions_for_shared_content_shelves(shelf, parent=None):
    """
    Will recursively traverse a tree of shelves and determine the correct image rendition.
    The rendition is based not only on the shelf type but also potentially on the shelf type of the parent.
    A shelf passed in will contain a dictionary in either image or background_image called "renditions" which will
    be a list of all possible renditions for the image. This function will filter and manipulate that dictionary
    so that the shelf returned contains only two keys, mobile and desktop. The frontend will then pick the appropriate
    rendition. This manipulation will also be performed on any child shelves. It is also possible that the original
    image will be used if desktop_use_renditions or mobile_use_renditions is false. In that case
    Args:
        shelf: A dictionary representations of one the CMS shelf types from within a streamfield.
        parent: Same as above
    Returns:
        shelf: A dictionary representation of a shelf and all it's child shelves (nested dictionaries) with a filtered
        renditions dict.
    """
    if type(shelf['value']) is dict or type(shelf['value']) is OrderedDict:
        shelf_type = shelf['type']

        if not parent:
            shelf['value']['image_meta'] = '{}/{}/{}'.format(shelf_type, None, None)
        elif parent.get('type') == 'grid_shelf':
            shelf['value']['image_meta'] = "{}/{}/{}".format(shelf_type, parent['type'], parent['value']['meta_layout'])
        else:
            shelf['value']['image_meta'] = "{}/{}/{}".format(shelf_type, parent['type'], None)

        # TODO: MERGE THE TWO IF STATEMENTS BELOW

        if 'banner_shelf' in shelf_type:
            background_image = shelf['value']['background_image']
            if background_image:
                rendition_shelf_type = 'banner_shelf'
                if parent:
                    parent_shelf_type = parent["type"]
                else:
                    parent_shelf_type = None

                background_image['renditions'] = {
                    'mobile': background_image['renditions']["{}/{}/None/mobile".format(rendition_shelf_type,
                                                                                        parent_shelf_type)],
                    'desktop': background_image['renditions']["{}/{}/None/desktop".format(rendition_shelf_type,
                                                                                          parent_shelf_type)]
                }

        if 'recipe_teaser' in shelf_type:
            image = shelf['value']['background_image']
            if image:
                rendition_shelf_type = 'recipe_teaser'
                parent_shelf_type = parent["type"]

                image['renditions'] = {
                    'mobile': image['renditions']["{}/{}/None/mobile".format(rendition_shelf_type,
                                                                             parent_shelf_type)],
                    'desktop': image['renditions']["{}/{}/None/desktop".format(rendition_shelf_type,
                                                                               parent_shelf_type)]
                }

        if 'app_teaser' in shelf_type:
            image = shelf['value']['image']
            if image:
                rendition_shelf_type = 'app_teaser'
                parent_shelf_type = parent["type"]
                parent_meta_layout = parent['value'].get('meta_layout')

                image['renditions'] = {
                    'mobile': image['renditions']["{}/{}/{}/mobile".format(rendition_shelf_type,
                                                                           parent_shelf_type,
                                                                           parent_meta_layout)],
                    'desktop': image['renditions']["{}/{}/{}/desktop".format(rendition_shelf_type,
                                                                             parent_shelf_type,
                                                                             parent_meta_layout)]
                }

        items = shelf['value'].get('items', [])
        for item in items:
            determine_image_rendtions_for_shared_content_shelves(item, parent=shelf)

    return shelf


def replace_resource_ids_with_links_for_download(shelf):
    if type(shelf['value']) is dict or type(shelf['value']) is OrderedDict:
        ctas = shelf['value'].get('cta', [])
        for cta in ctas:
            if 'document' in cta:
                cta['link_external'] = Document.objects.get(id=cta['document']).file.url
                cta['document'] = True
        if 'audio' in shelf['value'] and not shelf['value']['audio'] is None:
            print('found audio key in', shelf)
            shelf['value']['audio'] = Media.objects.get(id=shelf['value']['audio']).file.url
        items = shelf['value'].get('items', [])
        for item in items:
            replace_resource_ids_with_links_for_download(item)

    return shelf
