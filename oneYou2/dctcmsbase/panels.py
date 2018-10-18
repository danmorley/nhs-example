
from django.template.defaultfilters import slugify

from wagtail.core import blocks

from wagtailmedia.blocks import AbstractMediaChooserBlock

from .blocks import IDBlock, ImageBlock, SimpleCtaLinkBlock, DocumentDownloadBlock


IMAGE_PANEL_VARIANTS = (
    ('normal', 'Normal'),
    ('stretch', 'Stretch'),
)

IMAGE_TEASER_VARIANT_CHOICES = (
    ('no_bg', 'No Background'),
    ('primary_background', 'Primary colour background'),
    ('secondary_background', 'Primary colour background'),
)

IMAGE_TEASER_LAYOUT_CHOICES = (
    ('desktop-image-default-mobile-image-default', 'Desktop: Default, Mobile: Default'),
    ('desktop-image-default-mobile-image-top', 'Desktop: Default, Mobile: Top'),
    ('desktop-image-default-mobile-image-left', 'Desktop: Default, Mobile: Left'),
    ('desktop-image-left-mobile-image-default', 'Desktop: Left, Mobile: Default'),
    ('desktop-image-left-mobile-image-top', 'Desktop: Left, Mobile: Top'),
    ('desktop-image-left-mobile-image-left', 'Desktop: Left, Mobile: Left'),
)

RICH_TEXT_PANEL_VARIANTS = (
    ('standard', 'standard'),
    ('crisis-card', 'Formatting for Route to Crisis cards'),
    ('crisis-card-no-header', 'Formatting for Route to Crisis cards - no header H3'),
)

INFO_PANEL_VARIANTS = (
    ('mobile-image-top-text-right', 'Mobile image on top, Desktop image on left with text right'),
    ('mobile-image-right', 'Mobile image on right, Desktop image on right'),
    ('light_background', 'Light background'),
    ('dark_background', 'Dark background')
)

BRIGHTCOVE_OPTION = ('brightcove', 'Brightcove')
WIREWAX_OPTION = ('wirewax', 'Wirewax')
VIDEO_HOSTS = (
    BRIGHTCOVE_OPTION,
    WIREWAX_OPTION,
)


class Panel(blocks.StructBlock):
    panel_id = IDBlock(required=False,
                    label='ID',
                    help_text='Not displayed in the front end',
                    classname='dct-meta-field')
    
    class Meta:
        abstract = True


class RichTextPanel(Panel):
    text = blocks.RichTextBlock(required=False)

    class Meta:
        abstract = True
        form_classname = 'dct-rich-text-panel dct-meta-panel'


class StandardRichTextPanel(RichTextPanel):
    meta_variant = blocks.ChoiceBlock(choices=RICH_TEXT_PANEL_VARIANTS,
                                    default='standard',
                                    label='Variant',
                                    classname='dct-meta-field')
    
    class Meta:
        verbose_name = 'rich text panel'


class TeaserPanel(Panel):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    image = ImageBlock()
    ctas = blocks.StreamBlock([
        ('simple_cta_link', SimpleCtaLinkBlock()),
        ('document_download', DocumentDownloadBlock())
    ], icon='arrow-left', label='Items', required=False)

    class Meta:
        abstract = True
        form_classname = 'dct-panel-image-teaser dct-meta-panel'


class AudioTeaserPanel(TeaserPanel):
    audio = AbstractMediaChooserBlock(required=False)


class VideoTeaserPanel(TeaserPanel):
    host = blocks.ChoiceBlock(choices=VIDEO_HOSTS, label='Host', default=BRIGHTCOVE_OPTION)
    video = blocks.CharBlock(required=False)
    meta_use_play_link = blocks.BooleanBlock(label='Use play video link', required=False, default=False,
                                             classname='dct-meta-field')
    meta_play_link_text = blocks.CharBlock(default='Play', label='Play Video Link Text', classname='dct-meta-field')

    class Meta:
        abstract = True
        form_classname = 'dct-video-teaser-panel dct-meta-panel'


class StandardVideoTeaserPanel(VideoTeaserPanel):
    meta_layout = blocks.ChoiceBlock(
        choices=IMAGE_TEASER_LAYOUT_CHOICES,
        default='mobile-image-default',
        label='Mobile Image Position',
        classname='dct-meta-field'
    )

    class Meta:
        verbose_name = 'video teaser panel'

class StandardImageTeaserPanel(TeaserPanel):
    meta_variant = blocks.ChoiceBlock(
        choices=IMAGE_TEASER_VARIANT_CHOICES,
        default='light-bg',
        label='Variant',
        classname='dct-meta-field',
    )
    meta_layout = blocks.ChoiceBlock(
        choices=IMAGE_TEASER_LAYOUT_CHOICES,
        default='mobile-image-default',
        label='Mobile Image Position',
        classname='dct-meta-field',
    )

    class Meta:
        verbose_name = 'image teaser panel'


class InformationPanel(Panel):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    image = ImageBlock(required=False)
    ctas = blocks.StreamBlock([
        ('simple_cta_link', SimpleCtaLinkBlock()),
    ], icon='arrow-left', label='Items', required=False, verbose_name='cta')

    class Meta:
        abstract = True
        form_classname = 'dct-information-panel dct-meta-panel'


class StandardInformationPanel(InformationPanel):
    meta_variant = blocks.ChoiceBlock(
        choices=INFO_PANEL_VARIANTS,
        label='Variant',
        classname='dct-meta-field'
    )

    class Meta:
        verbose_name = 'information panel'


class CtaPanel(Panel):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    cta = blocks.StreamBlock([
        ('simple_cta_link', SimpleCtaLinkBlock()),
    ], icon='arrow-left', label='CTA links', required=False)

    class Meta:
        form_classname = 'dct-panel-cta dct-meta-panel'

class SimpleImagePanel(Panel):
    image = ImageBlock(required=False)
    image_cta = SimpleCtaLinkBlock(required=False)

    class Meta:
        abstract = True
        form_classname = 'dct-simple-image-panel dct-meta-panel'


class StandardSimpleImagePanel(SimpleImagePanel):
    meta_variant = blocks.ChoiceBlock(choices=IMAGE_PANEL_VARIANTS,
                                      default='normal',
                                      label='Variant',
                                      classname='dct-meta-field')

    class Meta:
        verbose_name = 'simple image panel'

class PlainTextPanel(Panel):
    text = blocks.CharBlock(required=False)

    class Meta:
        form_classname = 'dct-panel-plain-text dct-meta-panel'


ACCORDION_ITEMS = [
    ('rich_text_panel', StandardRichTextPanel(required=False)),
]

class AccordionItemsPanel(Panel):
    heading = blocks.CharBlock(required=False)
    items = blocks.StreamBlock(ACCORDION_ITEMS, icon='arrow-left', label='Items')

    class Meta:
        form_classname = 'dct-panel-accordion-items dct-meta-panel'


class AccordionPanel(Panel):
    accordions = blocks.StreamBlock([
        ('accordion_items', AccordionItemsPanel(required=True, icon='collapse-down'))
    ])

    class Meta:
        form_classname = 'dct-panel-panel-accordion dct-meta-panel'