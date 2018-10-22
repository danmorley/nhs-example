from django.db import models

from wagtail.snippets.models import register_snippet
from wagtail.admin.edit_handlers import FieldPanel, PageChooserPanel, MultiFieldPanel
from wagtail.core.fields import RichTextField
from wagtail.images.edit_handlers import ImageChooserPanel

from modelcluster.fields import ParentalKey

from dctsharedcontent.models import SharedContent


MOBILE_BANNER_PANEL_RENDITION_CHOICES = (
    ('375x256', '375 x 256'),
)

DESKTOP_BANNER_PANEL_RENDITION_CHOICES  = (
    ('1440x309', '1440x309'),
)

BACKGROUND_IMAGE_VARIANT = (
    ('none', 'None'),
    ('gradient', 'Background Gradient'),
)

BANNER_LAYOUT_CHOICES = (
    ('vertical_left', 'Vertical & Left Aligned'),
    ('vertical_center', 'Vertical & Center Aligned'),
    ('vertical_right', 'Vertical & Right Aligned'),
    ('horizontal_left', 'Horizontal & Left Aligned'),
    ('horizontal_center', 'Horizontal & Center Aligned'),
    ('horizontal_right', 'Horizontal & Right Aligned'),
)


@register_snippet
class Banner(SharedContent):
    heading = models.CharField(max_length=255, null=True, blank=True)
    body = RichTextField(blank=True, null=True)
    background_image = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    background_image_mobile_rendition = models.CharField(
        max_length=20,
        choices=MOBILE_BANNER_PANEL_RENDITION_CHOICES,
        default='375x256',
    )
    background_image_desktop_rendition = models.CharField(
        max_length=20,
        choices=DESKTOP_BANNER_PANEL_RENDITION_CHOICES,
        default='1440x309',
    )
    meta_variant = models.CharField(
        max_length=20,
        choices=BACKGROUND_IMAGE_VARIANT,
        default='none',
    )
    cta_text = models.CharField(max_length=255, null=True, blank=True)
    cta_link = models.CharField(max_length=255, null=True, blank=True)
    cta_page = ParentalKey('wagtailcore.Page',
                           on_delete=models.SET_NULL,
                           related_name='base_banner_shelf_links',
                           null=True,
                           blank=True)

    @property
    def meta_layout(self):
        return 'full_width'

    # @property
    # def meta_variant(self):
    #     return 'main-banner'

    api_fields = [
        'heading',
        'body',
        'image',
        'cta_text',
        'cta_link',
        'cta_page',
        'meta_variant',
    ]

    general_panels = [
        FieldPanel('shelf_id'),
        FieldPanel('heading'),
        FieldPanel('body'),
    ]

    background_image_panels = [
        ImageChooserPanel('background_image'),
        FieldPanel('background_image_mobile_rendition'),
        FieldPanel('background_image_desktop_rendition'),
        FieldPanel('meta_variant'),
    ]

    cta_panels = [
        FieldPanel('cta_text'),
        FieldPanel('cta_link'),
        PageChooserPanel('cta_page'),
    ]

    panels = [
        MultiFieldPanel(general_panels, 'General', classname='collapsible'),
        MultiFieldPanel(background_image_panels, 'Background Image', classname='collapsible'),
        MultiFieldPanel(cta_panels, 'CTA', classname='collapsible'),
    ]