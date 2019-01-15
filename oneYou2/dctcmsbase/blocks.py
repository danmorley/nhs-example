import json

from django.core.exceptions import ValidationError
from django.forms.utils import ErrorList
from django.template.defaultfilters import slugify

from wagtail.api import APIField
from wagtail.core import blocks
from wagtail.core.blocks import StructValue
from wagtail.documents.blocks import DocumentChooserBlock
from wagtail.images.blocks import ImageChooserBlock
from wagtail.snippets.blocks import SnippetChooserBlock

from home.models import SiteSettings
from images.renditions import MOBILE_RENDITION_CHOICES, DESKTOP_RENDITION_CHOICES
from images.serializers import ImageSerializer
from shelves.blocks import BlobImageChooserBlock


IMAGE_POSITION = (
    ('top', 'Image top'),
    ('bottom', 'Image bottom'),
)

CTA_VARIANT = (
    ('link', 'Link'),
    ('button', 'Button'),
)

IMAGE_DISPLAY = (
    ('contain', 'Contain'),
    ('cover', 'Stretch'),
)

IMAGE_VARIANT = (
    ('none', 'None'),
    ('gradient', 'Background Gradient'),
)


class BlobImageChooserBlock(ImageChooserBlock):
    def get_api_representation(self, value, context=None):
        return ImageSerializer(context=context, required=False).to_representation(value)


class ImageBlock(blocks.StructBlock):
    image = BlobImageChooserBlock(required=False)
    meta_variant = blocks.ChoiceBlock(IMAGE_VARIANT,
                                      label='Variant',
                                      default='cover',
                                      classname='dct-meta-field')
    meta_mobile_rendition = blocks.ChoiceBlock(MOBILE_RENDITION_CHOICES,
                                      label='Mobile Rendition',
                                      default='none',
                                      classname='dct-meta-field')
    meta_desktop_rendition = blocks.ChoiceBlock(DESKTOP_RENDITION_CHOICES,
                                      label='Desktop Rendition',
                                      default='none',
                                      classname='dct-meta-field')

    # Convert value to plain dict.
    def get_api_representation(self, value, context=None):
        result = blocks.StructBlock.get_api_representation(self, value, context)

        if 'image' in result:
            image = result['image']
            image['meta_variant'] = result['meta_variant']

            meta_mobile_rendition = result['meta_mobile_rendition']
            meta_desktop_rendition = result['meta_desktop_rendition']

            image['renditions'] = {
                'mobile': value['image'].generate_and_get_rendition(meta_mobile_rendition) if value['image'] else None,
                'desktop': value['image'].generate_and_get_rendition(meta_desktop_rendition) if value['image'] else None,
            }
        return image

    class Meta:
        icon = 'image'
        form_classname = 'dct-image-block dct-meta-block sequence-member'


class BackgroundImageBlock(ImageBlock):
    meta_image_display = blocks.ChoiceBlock(
        choices=IMAGE_DISPLAY,
        label='Image Display',
        default='cover',
        classname='dct-meta-field',
    )

    def get_api_representation(self, value, context=None):
        result = blocks.StructBlock.get_api_representation(self, value, context)

        image = super(BackgroundImageBlock, self).get_api_representation(value, context)
        if image:
            image['meta_image_display'] = result['meta_image_display']

        return image


class PositionedImageBlock(ImageBlock):
    meta_position = blocks.ChoiceBlock(choices=IMAGE_POSITION,
                                     label='Position',
                                     classname='dct-meta-field',
                                     required=False,
                                     default=False)

    def get_api_representation(self, value, context=None):
        image = super(PositionedImageBlock, self).get_api_representation(value, context)
        result = blocks.StructBlock.get_api_representation(self, value, context)
        if image:
            image['meta_position'] = result['meta_position']

        return image


class IDBlock(blocks.CharBlock):
    def __init__(self, retain_case=False, *args, **kwargs):
        self.retain_case = retain_case
        super(IDBlock, self).__init__(*args, **kwargs)

    def get_api_representation(self, value, context=None):
        if self.retain_case:
            return value
        return slugify(value)


class BannerChooserBlock(SnippetChooserBlock):
    def get_api_representation(self, value, context=None):
        from .serializers import BannerSerializer
        return BannerSerializer(context=context).to_representation(value)


class AppTeaserChooserBlock(SnippetChooserBlock):
    def get_api_representation(self, value, context=None):
        from .serializers import AppTeaserSerializer
        return AppTeaserSerializer(context=context).to_representation(value)


class ItemPageBlock(blocks.PageChooserBlock):
    def get_api_representation(self, value, context=None):
        if value:
            site_name = SiteSettings.objects.get(site=value.get_site()).uid
            url_parts = value.get_url_parts()

            return {'id': value.id,
                    'slug': value.slug,
                    'relative_path': '/{}{}'.format(site_name, url_parts[2])
                    }
        else:
            return {}


class SimpleCtaLinkBlock(blocks.StructBlock):
    link_text = blocks.CharBlock(required=False)
    link_external = blocks.CharBlock(label='External link', required=False)
    link_page = ItemPageBlock(required=False)
    link_id = IDBlock(required=False, label='ID', classname='dct-meta-field', help_text='Uniquely identify the CTA. Often used for tracking')
    meta_cta_variant = blocks.ChoiceBlock(
        choices=CTA_VARIANT,
        default='link',
        label='CTA Style',
        classname='dct-meta-field'
    )

    class Meta:
        icon = 'link'
        label = 'cta'
        form_classname = 'dct-simple-cta-link-block dct-meta-block sequence-member'


class DocumentDownloadBlock(blocks.StructBlock):
    link_text = blocks.CharBlock(required=True)
    document = DocumentChooserBlock(label='Document', required=True)
    meta_cta_variant = blocks.ChoiceBlock(
        choices=CTA_VARIANT,
        default='link',
        label='CTA Style',
        classname='dct-meta-field'
    )
    
    api_fields = [
        APIField('document'),
    ]

    def get_api_representation(self, value, context=None):
        result = blocks.StructBlock.get_api_representation(self, value, context)

        if 'document' in result:
            document_id = result['document']
            from wagtail.documents.models import Document
            result['document'] = Document.objects.get(id=document_id).file.url

        return result


class DataAttributeBlock(blocks.StructBlock):
    name = blocks.CharBlock(help_text='Data attribute name, don\'t add \'data-\'')
    value = blocks.CharBlock()


class InlineScriptBlock(blocks.StructBlock):
    script = blocks.TextBlock(required=False, help_text='The javascript to be inserted')
    src = blocks.CharBlock(required=False, help_text='URL of the javascript file')
    script_id = IDBlock(required=False, label='Script tag ID', retain_case=True,
                        help_text='Optional ID of the script tag')
    placeholder_id = IDBlock(required=False, label='Placeholder ID', retain_case=True,
                             help_text='If given, an empty placeholder div will be added before the script tag')
    data_attributes = blocks.StreamBlock([
            ('data_attribute', DataAttributeBlock(icon='collapse-down')),
        ],
        required=False,
        label='Data attributes for placeholder div',
    )

    class meta:
        abstract = True


class InlineSvgBlock(blocks.StructBlock):
    svg = blocks.TextBlock(required=True, label='SVG code', help_text='The SVG source')
    svg_mob = blocks.TextBlock(
        required=False,
        label='SVG code for mobile',
        help_text='The SVG source for display on mobile devises'
    )
    styles = blocks.TextBlock(required=False, help_text='CSS styling')
    script = blocks.TextBlock(
        required=False,
        label='Inline script code',
        help_text='Inline javascript to make the SVG interactive'
    )

    class Meta:
        abstract = True