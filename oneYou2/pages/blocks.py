from django.template.defaultfilters import slugify
from wagtail.wagtailcore import blocks


class CTABlock(blocks.StructBlock):
    def get_api_representation(self, value, context=None):
        # recursively call get_api_representation on children and return as a plain dict
        result = dict([
            (name, self.child_blocks[name].get_api_representation(val, context=context))
            for name, val in value.items()
        ])
        cta_links = []
        for link in result['cta']:
            cta_links.append(link['value'])
        result['cta'] = cta_links
        return result


class IDBlock(blocks.CharBlock):
    def get_api_representation(self, value, context=None):
        return slugify(value)
