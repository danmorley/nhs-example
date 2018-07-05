from django.template.defaultfilters import slugify
from wagtail.wagtailcore import blocks
from shelves.blocks import BlobImageChooserBlock


IMAGE_VARIANT_CHOICES = (
    ('contain', 'Contain'),
    ('cover', 'Cover'),
    ('parent', 'Use parent')
)


class ImageBlock(blocks.StructBlock):
    image = BlobImageChooserBlock(required=False)
    meta_variant = blocks.ChoiceBlock(IMAGE_VARIANT_CHOICES,
                                      label='Variant',
                                      default='cover',
                                      classname='dct-meta-field')
    meta_rendition_key = blocks.CharBlock(required=False,
                                          label='Rendition',
                                          classname='dct-meta-field')
    meta_use_mobile_renditions = blocks.BooleanBlock(default=True,
                                                     label="Use mobile reditions",
                                                     required=False,
                                                     classname='dct-meta-field')
    meta_use_desktop_renditions = blocks.BooleanBlock(default=True,
                                                      label="Use desktop renditions",
                                                      required=False,
                                                      classname='dct-meta-field')

    def get_api_representation(self, value, context=None):
        # Convert value to plain dict.
        result = blocks.StructBlock.get_api_representation(self, value, context)

        # If image supplied, filter renditions list to leave just two renditions, one for
        # desktop and one for mobile.
        image = result['image']
        if image:
            if image.get('renditions'):
                image_meta = result.get('meta_rendition_key')
                mobile_rendition = None
                desktop_rendition = None

                if image_meta and value['meta_use_mobile_renditions']:
                    mobile_rendition = image['renditions'].get(image_meta + '/mobile')
                if not mobile_rendition:
                    mobile_rendition = image['renditions']['original']

                if image_meta and value['meta_use_desktop_renditions']:
                    desktop_rendition = image['renditions'].get(image_meta + '/desktop')
                if not desktop_rendition:
                    desktop_rendition = image['renditions']['original']

                result['image']['renditions'] = {
                    'mobile': mobile_rendition,
                    'desktop': desktop_rendition
                }

        return result

    class Meta:
        icon = 'image'
        form_classname = 'dct-image-block dct-meta-block sequence-member'


class CTABlock(blocks.StructBlock):
    image_meta = blocks.TextBlock(required=False, classname='dct-meta-field')
    mobile_use_renditions = blocks.BooleanBlock(default=True, required=False, classname='dct-meta-field')
    desktop_use_renditions = blocks.BooleanBlock(default=True, required=False, classname='dct-meta-field')

    def get_api_representation(self, value, context=None):
        # TODO: This method could use the function in page utils
        # recursively call get_api_representation on children and return as a plain dict
        result = dict([
            (name, self.child_blocks[name].get_api_representation(val, context=context))
            for name, val in value.items()
        ])
        image_fields = []
        if 'image' in result:
            image_fields.append('image')
        if 'background_image' in result:
            image_fields.append('background_image')
            
        for image_field in image_fields:
            if image_field in result:
                if result[image_field].get('renditions'):
                    image_meta = value.get('image_meta')
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
