from django.template.defaultfilters import slugify
from wagtail.wagtailcore import blocks


class CTABlock(blocks.StructBlock):
    image_meta = blocks.TextBlock(required=False)

    def get_api_representation(self, value, context=None):
        # recursively call get_api_representation on children and return as a plain dict
        result = dict([
            (name, self.child_blocks[name].get_api_representation(val, context=context))
            for name, val in value.items()
        ])
        print("TYPE", type(value))
        if 'image' in result:
            image_meta = value.get('image_meta')
            if image_meta:
                print(image_meta)
                print(result['image']['renditions'].keys())
                mobile_rendition = result['image']['renditions'][image_meta + '/mobile']
                desktop_rendition = result['image']['renditions'][image_meta + '/desktop']
                result['image']['renditions'] = {
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
    def get_api_representation(self, value, context=None):
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
