import datetime
import json

from django.conf import settings
from django.utils import timezone
from django.utils.encoding import is_protected_type

from shelves.models import ShelfAbstract


SHARED_CONTENT_TYPES = ['promo_shelf', 'banner_shelf', 'app_shelf']


def replace_embeds_with_links(field):
    from images.models import PHEImage
    start = 0
    while start >= 0:
        start = field.find('<embed')
        finish = field.find('/>', start) + 2
        if not start < 0:
            initial_string = field[start:finish]
            embed_string = initial_string.replace('<embed', '<img')
            id_start = embed_string.find('id="') + 4
            id_end = embed_string.find('"', id_start)
            id = embed_string[id_start:id_end]
            image = PHEImage.objects.get(id=id)
            embed_string = embed_string.replace(id, image.link)
            embed_string = embed_string.replace('id', 'src')
            field = field.replace(initial_string, embed_string)
    return field


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
                    if type(shelf['value']) is dict:
                        for key in shelf['value']:
                            if type(shelf['value'][key]) is str:
                                shelf['value'][key] = replace_embeds_with_links(shelf['value'][key])
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
