from django.template.defaultfilters import slugify
from wagtail.wagtailcore import blocks


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
        if 'image' in result:
            image_field = 'image'
        elif 'background_image' in result:
            image_field = 'background_image'
        else:
            image_field = None

        if image_field in result:
            if result[image_field].get('renditions'):
                image_meta = value.get('image_meta')
                if image_meta and result['mobile_use_renditions']:
                    mobile_rendition = result[image_field]['renditions'][image_meta + '/mobile']
                else:
                    mobile_rendition = result[image_field]['renditions']['original']

                if image_meta and result['desktop_use_renditions']:
                    desktop_rendition = result[image_field]['renditions'][image_meta + '/desktop']
                else:
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
