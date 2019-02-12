from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import ugettext_lazy as _

from wagtail.admin.edit_handlers import FieldPanel, MultiFieldPanel, StreamFieldPanel
from wagtail.core.fields import RichTextField, StreamField
from wagtail.snippets.models import register_snippet

from dctsharedcontent.models import SharedContent

from .blocks import BackgroundImageBlock, SimpleCtaLinkBlock, ImageBlock
from .stream_block import ExpandedStreamBlock


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
    attributes = StreamField(
        ExpandedStreamBlock([
            ('background_image', BackgroundImageBlock()),
        ]),
        blank=True, null=True,
    )
    ctas = StreamField([
            ('cta', SimpleCtaLinkBlock()),
        ], blank=True, null=True)

    @property
    def meta_layout(self):
        return 'full_width'


    api_fields = [
        'heading',
        'body',
        'attributes',
        'ctas',
    ]

    panels = [
        MultiFieldPanel([
            FieldPanel('shelf_id'),
            FieldPanel('heading'),
            FieldPanel('body'),
        ], heading='General'),
        StreamFieldPanel('attributes'),
        StreamFieldPanel('ctas'),
    ]


@register_snippet
class AppTeaser(SharedContent):
    heading = models.CharField(max_length=255, null=True, blank=True)
    body = RichTextField(blank=True, null=True)
    attributes = StreamField(
        ExpandedStreamBlock([
            ('image', ImageBlock()),
        ]),
        blank=True, null=True,
    )
    ctas = StreamField([
            ('cta', SimpleCtaLinkBlock()),
        ], blank=True, null=True)
    cta_googleplay = models.URLField(max_length=255, null=True, blank=True)
    cta_appstore = models.URLField(max_length=255, null=True, blank=True)

    panels = [
        FieldPanel('shelf_id'),
        FieldPanel('heading'),
        FieldPanel('body'),
        StreamFieldPanel('attributes'),
        StreamFieldPanel('ctas'),
        MultiFieldPanel([
            FieldPanel('cta_googleplay'),
            FieldPanel('cta_appstore'),
        ], heading='App Store CTAs'),
    ]
