
from django.template.defaultfilters import slugify

from wagtail.core import blocks

from wagtailmedia.blocks import AbstractMediaChooserBlock

from .blocks import (IMAGE_DISPLAY, IDBlock, ImageBlock, SimpleCtaLinkBlock, DocumentDownloadBlock, InlineScriptBlock,
                     AppTeaserChooserBlock, InlineSvgBlock)


IMAGE_PANEL_VARIANTS = (
    ('normal', 'Normal'),
    ('stretch', 'Stretch'),
)

IMAGE_TEASER_VARIANT_CHOICES = (
    ('light-bg', 'Light Background'),
    ('dark-bg', 'Dark Background'),
)

IMAGE_TEASER_LAYOUT_CHOICES = (
    ('desktop-image-top-mobile-image-top', 'Desktop: Top, Mobile: Top'),
    ('desktop-image-top-mobile-image-left', 'Desktop: Top, Mobile: Left'),
    ('desktop-image-left-mobile-image-top', 'Desktop: Left, Mobile: Top'),
    ('desktop-image-left-mobile-image-left', 'Desktop: Left, Mobile: Left'),
)

VIDEO_TEASER_LAYOUT_CHOICES = IMAGE_TEASER_LAYOUT_CHOICES + (
    ('image_only', 'Image only'),
)

RICH_TEXT_PANEL_VARIANTS = (
    ('standard', 'standard'),
    ('crisis-card', 'Formatting for Route to Crisis cards'),
    ('crisis-card-no-header', 'Formatting for Route to Crisis cards - no header H3'),
)

PLAIN_TEXT_PANEL_VARIANTS = (
    ('vertical_align_top', 'Vertical align top'),
    ('vertical_align_middle', 'Vertical align middle'),
)

INFO_PANEL_VARIANTS = (
    ('light_background', 'Light background'),
    ('dark_background', 'Dark background')
)

INFO_PANEL_LAYOUTS = (
    ('desktop-image-left-mobile-image-top', 'Desktop: Image Left/Text Right, Mobile: Image Top'),
    ('desktop-image-right-mobile-image-right', 'Desktop: Image Right, Mobile: Image Right'),
)

ICON_CARD_LAYOUTS = (
    ('icon_on_left', 'Icon on Left'),
    ('icon_on_right', 'Icon on Right'),
    ('icon_heading_left', 'Icon Heading Left'),
    ('icon_heading_right', 'Icon Heading Right'),
    ('icon_body_left', 'Icon Body Left'),
    ('icon_body_right', 'Icon Body Right'),
    ('icon_on_top', 'Icon on Top'),
    ('icon_on_bottom', 'Icon on Bottom'),
)

SIMPLE_LIST_LAYOUTS = (
    ('full_width', 'Full Width'),
    ('2_col_1_on_mobile', 'Responsive (2 columns on desktop)'),
)

SIMPLE_LIST_VARIANTS = (
    ('bullet_standard', 'bullet'),
    ('bullet_alt', 'bullet alternative style'),
    ('numeric_standard', 'numeric'),
    ('numeric_alt', 'numeric alternative style'),
)

ICON_CARD_VARIANTS = (
    ('standard', 'no background color, standard heading'),
    ('light_bg', 'light background color, standard heading'),
    ('light_bg_color_heading', 'light background color, color heading'),
    ('light_bg_large_heading', 'light background color, larger body heading'),
    ('light_bg_large_color_heading', 'light background color, larger color body heading'),
    ('dark_bg', 'darker background color, standard heading'),
    ('dark_bg_color_heading', 'darker background color, color heading'),
    ('dark_bg_large_heading', 'darker background color, larger body heading'),
    ('dark_bg_large_color_heading', 'darker background color, larger color body heading'),
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
    meta_image_display = blocks.ChoiceBlock(IMAGE_DISPLAY,
                                            label='Image Display',
                                            default='cover', classname='dct-meta-field')

    class Meta:
        abstract = True
        form_classname = 'dct-panel-image-teaser dct-meta-panel'


class AudioTeaserPanel(TeaserPanel):
    audio = AbstractMediaChooserBlock(required=False)

    def get_api_representation(self, value, context=None):
        result = blocks.StructBlock.get_api_representation(self, value, context)

        if 'audio' in result:
            audio_id = result['audio']
            from wagtailmedia.models import Media
            result['audio'] = Media.objects.get(id=audio_id).file.url

        return result


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
        choices=VIDEO_TEASER_LAYOUT_CHOICES,
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
    meta_image_display = blocks.ChoiceBlock(IMAGE_DISPLAY,
                                            label='Image Display',
                                            default='cover', classname='dct-meta-field')

    class Meta:
        abstract = True
        form_classname = 'dct-information-panel dct-meta-panel'


class StandardInformationPanel(InformationPanel):
    meta_variant = blocks.ChoiceBlock(
        choices=INFO_PANEL_VARIANTS,
        label='Variant',
        classname='dct-meta-field'
    )
    meta_layout = blocks.ChoiceBlock(
        choices=INFO_PANEL_LAYOUTS,
        label='Layout',
        classname='dct-meta-field'
    )

    class Meta:
        verbose_name = 'information panel'


class CtaPanel(Panel):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    ctas = blocks.StreamBlock([
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
    meta_variant = blocks.ChoiceBlock(choices=PLAIN_TEXT_PANEL_VARIANTS,
                                      default='vertical_align_top',
                                      label='Variant',
                                      classname='dct-meta-field')

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
        ('accordion_items_panel', AccordionItemsPanel(required=True, icon='collapse-down'))
    ])
    scroll_items_to_top_when_selected = blocks.BooleanBlock(
        label='Scroll to the top of the item when selected',
        required=False,
        default=False,
        classname='dct-meta-field'
    )

    class Meta:
        form_classname = 'dct-panel-panel-accordion dct-meta-panel'

class SimpleServiceFinderPanel(Panel):
    text = blocks.RichTextBlock(required=False)
    heading = blocks.CharBlock(required=False)
    finder_url = blocks.URLBlock()
    searchbox_placeholder = blocks.CharBlock(required=False)
    submit_button_copy = blocks.CharBlock()
    use_location_button_copy = blocks.CharBlock()

    class Meta:
        form_classname = 'dct-panel-panel-simple-service-finder dct-meta-panel'


class InlineScriptPanel(Panel, InlineScriptBlock):
    class Meta:
        form_classname = 'dct-panel-inline-script dct-meta-panel'


class InlineSvgPanel(Panel, InlineSvgBlock):
    class Meta:
        form_classname = 'dct-inline-svg-panel dct-meta-panel'


LIST_ITEMS = [
    ('rich_text_panel', StandardRichTextPanel(icon='title')),
    ('plain_text_panel', PlainTextPanel(required=False)),
    ('simple_image_panel', StandardSimpleImagePanel(icon='image')),
    ('inline_svg_panel', InlineSvgPanel(icon='snippet')),
]

class SimpleListPanel(Panel):
    items = blocks.StreamBlock(LIST_ITEMS, icon='arrow-left', label='Items')
    
    meta_layout = blocks.ChoiceBlock(
        choices=SIMPLE_LIST_LAYOUTS,
        default='full_width',
        label='Layout',
        classname='dct-meta-field',
    )
    
    meta_variant = blocks.ChoiceBlock(choices=SIMPLE_LIST_VARIANTS,
                                      default='bullett_standard',
                                      label='Variant',
                                      classname='dct-meta-field')
    class Meta:
        form_classname = 'dct-panel-simple-list dct-meta-panel'

class AppTeaserPanel(Panel):
    panel = AppTeaserChooserBlock(target_model='dctcmsbase.AppTeaser', icon='image')

    class Meta:
        form_classname = 'dct-appteaser-shelf dct-meta-panel'


class IconCardPanel(Panel):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    image = ImageBlock(required=False)
    ctas = blocks.StreamBlock([
        ('simple_cta_link', SimpleCtaLinkBlock())
    ], icon='arrow-left', label='CTA links', required=False)
    meta_variant = blocks.ChoiceBlock(choices=ICON_CARD_VARIANTS,
                                      default='standard',
                                      label='Variant',
                                      classname='dct-meta-field')
    meta_layout = blocks.ChoiceBlock(choices=ICON_CARD_LAYOUTS,
                                     default='icon_on_left',
                                     label='Layout',
                                     classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-icon-card-panel dct-meta-panel'


class ListItemPanel(Panel):
    text = blocks.CharBlock(required=True)
