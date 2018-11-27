from django.db import models

from wagtail.admin.edit_handlers import FieldPanel
from wagtail.admin.edit_handlers import StreamFieldPanel
from wagtail.core.fields import RichTextField, StreamField
from wagtail.snippets.models import register_snippet

from dctsharedcontent.models import SharedContent

from .blocks import BackgroundImageBlock, SimpleCtaLinkBlock
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

PROMO_LAYOUT_CHOICES = (
    ('vertical_left', 'Vertical & Left Aligned'),
    ('vertical_center', 'Vertical & Center Aligned'),
    ('vertical_right', 'Vertical & Right Aligned'),
    ('horizontal_left', 'Horizontal & Left Aligned'),
    ('horizontal_center', 'Horizontal & Center Aligned'),
    ('horizontal_right', 'Horizontal & Right Aligned'),
)

BANNER_LAYOUT_CHOICES = PROMO_LAYOUT_CHOICES


@register_snippet
class Promo(SharedContent):
    heading = models.CharField(max_length=255, null=True, blank=True)

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
        'attributes',
        'ctas',
    ]

    panels = [
        FieldPanel('heading'),
        StreamFieldPanel('attributes'),
        StreamFieldPanel('ctas'),
    ]


@register_snippet
class Banner(SharedContent):
    heading = models.CharField(max_length=255, null=True, blank=True)
    body = RichTextField(blank=True, null=True)

    heading = models.CharField(max_length=255, null=True, blank=True)

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
        FieldPanel('heading'),
        FieldPanel('body'),
        StreamFieldPanel('attributes'),
        StreamFieldPanel('ctas'),
    ]