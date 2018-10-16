import json

from django.core.exceptions import ValidationError
from django.forms.utils import ErrorList
from django.template.defaultfilters import slugify

from wagtail.core import blocks
from wagtail.core.blocks import StructValue
from wagtail.documents.blocks import DocumentChooserBlock
from wagtail.snippets.blocks import SnippetChooserBlock

from shelves.blocks import BlobImageChooserBlock
from images.renditions import MOBILE_RENDITION_CHOICES, DESKTOP_RENDITION_CHOICES

from .serializers import BannerPanelSerializer


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

    def __init__(self, *args, **kwargs):
        if kwargs:
            self.max_width = kwargs.get('max_width', None)
            self.max_height = kwargs.get('max_height', None)
            self.image_required = kwargs.get('required', None)
        super(ImageBlock, self).__init__(*args, **kwargs)

    def clean(self, value):
        result = []  # build up a list of (name, value) tuples to be passed to the StructValue constructor
        errors = {}
        for name, val in value.items():
            try:
                result.append((name, self.child_blocks[name].clean(val)))
                if name == 'image':
                    if val:
                        if self.max_width:
                            if val.width > self.max_width:
                                errors['image'] = ['Image size exceeds maximum width ({}px)'.format(self.max_width)]
                        if self.max_height:
                            if val.height > self.max_height:
                                errors['image'] = ['Image size exceeds maximum height ({}px)'.format(self.max_height)]
                    else:
                        if self.image_required:
                            errors['image'] = ['This field is required.']

            except ValidationError as e:
                errors[name] = ErrorList([e])

        if errors:
            # The message here is arbitrary - StructBlock.render_form will suppress it
            # and delegate the errors contained in the 'params' dict to the child blocks instead
            raise ValidationError('Validation error in StructBlock', params=errors)

        return StructValue(self, result)

    def get_parent_rendition(self, type):
        pass
        # image = result['image']
        # image['layout'] = result['meta_layout']
        # if image:
        #     if image.get('renditions'):
        #         mobile_rendition = None
        #         desktop_rendition = None

        #         # This is a bit hacky but it's for the unit tests
        #         if type(value['meta_use_mobile_renditions']) == bool:
        #             use_mobile_renditions = value['meta_use_mobile_renditions']
        #         else:
        #             use_mobile_renditions = json.loads(value['meta_use_mobile_renditions'].lower())

        #         if type(value['meta_use_desktop_renditions']) == bool:
        #             use_desktop_rendtions = value['meta_use_desktop_renditions']
        #         else:
        #             use_desktop_rendtions = json.loads(value['meta_use_desktop_renditions'].lower())

        #         if image_meta and use_mobile_renditions:
        #             mobile_rendition = image['renditions'].get(image_meta + '/mobile')
        #         if not mobile_rendition:
        #             mobile_rendition = image['renditions']['original']

        #         if image_meta and use_desktop_rendtions:
        #             desktop_rendition = image['renditions'].get(image_meta + '/desktop')
        #         if not desktop_rendition:
        #             desktop_rendition = image['renditions']['original']

        #         result['image']['renditions'] = {
        #             'mobile': mobile_rendition,
        #             'desktop': desktop_rendition
        #         }

    # Convert value to plain dict.
    def get_api_representation(self, value, context=None):
        # image_meta = context.get('image_meta', None)

        result = blocks.StructBlock.get_api_representation(self, value, context)

        image = result['image']

        if image and image.get('renditions'):
            image['layout'] = result['meta_layout']

            meta_mobile_rendition = result['meta_mobile_rendition']
            meta_desktop_rendition = result['meta_desktop_rendition']

            if meta_mobile_rendition == 'none':
                mobile_rendition = image['renditions']['original']
            elif meta_mobile_rendition == 'parent':
                pass
            else:
                mobile_rendition = image['renditions'][meta_mobile_rendition]
            
            if meta_desktop_rendition == 'none':
                desktop_rendition = image['renditions']['original']
            elif meta_desktop_rendition == 'parent':
                pass
            else:
                desktop_rendition = image['renditions'][meta_desktop_rendition]

            result['image']['renditions'] = {
                'mobile': mobile_rendition,
                'desktop': desktop_rendition
            }

        return result['image']

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


class PositionedImageBlock(ImageBlock):
    meta_position = blocks.ChoiceBlock(choices=IMAGE_POSITION,
                                     label='Position',
                                     classname='dct-meta-field',
                                     required=False,
                                     default=False)


class IDBlock(blocks.CharBlock):
    def __init__(self, retain_case=False, *args, **kwargs):
        self.retain_case = retain_case
        super(IDBlock, self).__init__(*args, **kwargs)

    def get_api_representation(self, value, context=None):
        if self.retain_case:
            return value
        return slugify(value)


class BannerPanelChooserBlock(SnippetChooserBlock):
    def get_api_representation(self, value, context=None):
        return BannerPanelSerializer(context=context).to_representation(value)


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
