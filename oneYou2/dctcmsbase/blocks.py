import json

from django.core.exceptions import ValidationError
from django.forms.utils import ErrorList
from django.template.defaultfilters import slugify

from wagtail.api import APIField
from wagtail.core import blocks
from wagtail.core.blocks import StructValue
from wagtail.documents.blocks import DocumentChooserBlock
from wagtail.snippets.blocks import SnippetChooserBlock

from shelves.blocks import BlobImageChooserBlock
from images.renditions import MOBILE_RENDITION_CHOICES, DESKTOP_RENDITION_CHOICES
from home.models import SiteSettings

from .serializers import BannerSerializer


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
        image = result['image']

        if image:
            image['meta_variant'] = result['meta_variant']

            if image.get('renditions'):
                meta_mobile_rendition = result['meta_mobile_rendition']
                meta_desktop_rendition = result['meta_desktop_rendition']

                if meta_mobile_rendition == 'none':
                    mobile_rendition = image['renditions']['original']
                else:
                    mobile_rendition = image['renditions'][meta_mobile_rendition]
                
                if meta_desktop_rendition == 'none':
                    desktop_rendition = image['renditions']['original']
                else:
                    desktop_rendition = image['renditions'][meta_desktop_rendition]

                image['renditions'] = {
                    'mobile': mobile_rendition,
                    'desktop': desktop_rendition,
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
        return BannerSerializer(context=context).to_representation(value)


class ItemPageBlock(blocks.PageChooserBlock):
    def get_api_representation(self, value, context=None):
        if value:
            site = value.get_site()
            site_settings = SiteSettings.objects.get(site=site)
            site_name = site_settings.uid

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
        form_classname = 'dct-simple-cta-link-block dct-meta-block'


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
        document_id = result['document']

        if document_id:
            from wagtail.documents.models import Document
            result['document'] = Document.objects.get(id=document_id).file.url

        return result