import json

from django.core.exceptions import ValidationError
from django.forms.utils import ErrorList
from django.template.defaultfilters import slugify
from wagtail.wagtailcore import blocks
from shelves.blocks import BlobImageChooserBlock
from wagtail.wagtailcore.blocks import StructValue

IMAGE_VARIANT_CHOICES = (
    ('contain', 'Contain'),
    ('cover', 'Cover'),
    ('parent', 'Use parent')
)


class ImageBlock(blocks.StructBlock):
    image = BlobImageChooserBlock(required=True)
    meta_variant = blocks.ChoiceBlock(IMAGE_VARIANT_CHOICES,
                                      label='Variant',
                                      default='cover',
                                      classname='dct-meta-field')
    meta_use_mobile_renditions = blocks.BooleanBlock(default=True,
                                                     label="Use mobile reditions",
                                                     required=False,
                                                     classname='dct-meta-field')
    meta_use_desktop_renditions = blocks.BooleanBlock(default=True,
                                                      label="Use desktop renditions",
                                                      required=False,
                                                      classname='dct-meta-field')

    def __init__(self, *args, **kwargs):
        if kwargs:
            self.max_width = kwargs.get("max_width", None)
            self.max_height = kwargs.get("max_height", None)
        super(ImageBlock, self).__init__(*args, **kwargs)

    def clean(self, value):
        result = []  # build up a list of (name, value) tuples to be passed to the StructValue constructor
        errors = {}
        for name, val in value.items():
            try:
                result.append((name, self.child_blocks[name].clean(val)))
                if name == 'image':
                    if self.max_width:
                        if val.width > self.max_width:
                            errors['image'] = ["Image size exceeds maximum width"]
                    if self.max_height:
                        if val.height > self.max_height:
                            errors['image'] = ["Image size exceeds maximum height"]

            except ValidationError as e:
                errors[name] = ErrorList([e])

        if errors:
            # The message here is arbitrary - StructBlock.render_form will suppress it
            # and delegate the errors contained in the 'params' dict to the child blocks instead
            raise ValidationError('Validation error in StructBlock', params=errors)

        return StructValue(self, result)

    def get_api_representation(self, value, context=None):
        # Convert value to plain dict.

        image_meta = context['image_meta']

        result = blocks.StructBlock.get_api_representation(self, value, context)

        # If image supplied, filter renditions list to leave just two renditions, one for
        # desktop and one for mobile.
        if image_meta:

            image = result['image']
            if image:
                if image.get('renditions'):
                    mobile_rendition = None
                    desktop_rendition = None

                    # This is a bit hacky but it's for the unit tests
                    if type(value['meta_use_mobile_renditions']) == bool:
                        use_mobile_renditions = value['meta_use_mobile_renditions']
                    else:
                        use_mobile_renditions = json.loads(value['meta_use_mobile_renditions'].lower())

                    if type(value['meta_use_desktop_renditions']) == bool:
                        use_desktop_rendtions = value['meta_use_desktop_renditions']
                    else:
                        use_desktop_rendtions = json.loads(value['meta_use_desktop_renditions'].lower())

                    if image_meta and use_mobile_renditions:
                        mobile_rendition = image['renditions'].get(image_meta + '/mobile')
                    if not mobile_rendition:
                        mobile_rendition = image['renditions']['original']

                    if image_meta and use_desktop_rendtions:
                        desktop_rendition = image['renditions'].get(image_meta + '/desktop')
                    if not desktop_rendition:
                        desktop_rendition = image['renditions']['original']

                    result['image']['renditions'] = {
                        'mobile': mobile_rendition,
                        'desktop': desktop_rendition
                    }

        return result['image']

    class Meta:
        icon = 'image'
        form_classname = 'dct-image-block dct-meta-block sequence-member'


class CTABlock(blocks.StructBlock):
    image_meta = blocks.TextBlock(required=False, classname='dct-meta-field')
    mobile_use_renditions = blocks.BooleanBlock(default=True, required=False, classname='dct-meta-field')
    desktop_use_renditions = blocks.BooleanBlock(default=True, required=False, classname='dct-meta-field')

    def get_api_representation(self, value, context=None):
        # recursively call get_api_representation on children and return as a plain dict

        image_meta = value.get('image_meta')

        context["image_meta"] = image_meta

        result = dict([
            (name, self.child_blocks[name].get_api_representation(val, context=context))
            for name, val in value.items()
        ])

        # FROM HERE DOWN TO IF CTA IS ALL LEGACY STUFF, IT HANDLES ANY IMAGE CHOOSER THAT IS NOT PART OF AN IMAGE BLOCK
        image_fields = []
        for k, v in value.items():
            from images.models import PHEImage
            if type(v) == PHEImage:
                image_fields.append(k)

        for image_field in image_fields:
            if image_field in result:
                if result[image_field].get('renditions'):
                    mobile_rendition = None
                    desktop_rendition = None

                    if image_meta and result['mobile_use_renditions']:
                        mobile_rendition = result[image_field]['renditions'].get(image_meta + '/mobile')
                    if not mobile_rendition:
                        mobile_rendition = result[image_field]['renditions']['original']

                    if image_meta and result['desktop_use_renditions']:
                        desktop_rendition = result[image_field]['renditions'].get(image_meta + '/desktop')
                    if not desktop_rendition:
                        desktop_rendition = result[image_field]['renditions']['original']

                    result[image_field]['renditions'] = {
                        'mobile': mobile_rendition,
                        'desktop': desktop_rendition
                    }

        if 'cta' in result:
            cta_links = []
            for link in result['cta']:
                cta_links.append(link['value'])
            result['cta'] = cta_links
        return result


class IDBlock(blocks.CharBlock):
    def __init__(self, retain_case=False, *args, **kwargs):
        self.retain_case = retain_case
        super(IDBlock, self).__init__(*args, **kwargs)

    def get_api_representation(self, value, context=None):
        if self.retain_case:
            return value
        return slugify(value)


class MenuItemPageBlock(blocks.PageChooserBlock):
    def get_api_representation(self, value, context=None):
        if value:
            site_name = value.get_site().site_name
            url_parts = value.get_url_parts()

            return {'id': value.id,
                    'slug': value.slug,
                    'relative_path': '/{}{}'.format(site_name.lower(), url_parts[2])
                    }
        else:
            return {}


class SimpleCtaLinkBlock(blocks.StructBlock):
    link_text = blocks.CharBlock(required=False)
    link_external = blocks.CharBlock(label='External link', required=False)
    link_page = MenuItemPageBlock(required=False)

    class Meta:
        icon = 'link'
        form_classname = 'dct-simple-cta-link-block dct-meta-block'
