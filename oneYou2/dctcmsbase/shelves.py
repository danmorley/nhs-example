from wagtail.core import blocks

from .blocks import (PositionedImageBlock, IDBlock, BackgroundImageBlock, BannerChooserBlock, InlineScriptBlock,
    InlineSvgBlock, SimpleCtaLinkBlock, AppTeaserChooserBlock)
from .panels import (StandardRichTextPanel, StandardInformationPanel, CtaPanel, StandardSimpleImagePanel,
    PlainTextPanel, AccordionPanel, StandardImageTeaserPanel, AudioTeaserPanel, StandardVideoTeaserPanel,
    SimpleServiceFinderPanel, InlineScriptPanel, InlineSvgPanel, AppTeaserPanel, IconCardPanel, ListItemPanel)
from .sharedcontent import BANNER_LAYOUT_CHOICES


SHELF_WIDTH = (
    ('responsive', 'Responsive Width'),
    ('full', 'Full Width'),
)

GRID_GUTTER_CHOICES = (
    ('gutter-unset', 'Unset'),
    ('gutter-sm', 'Small'),
    ('gutter-md', 'Medium'),
    ('gutter-lg', 'Large'),
)

GRID_VARIANT_CHOICES = (
    ('standard', 'Standard'),
    ('teal_background', 'Teal Background on desktop, White Background on mobile'),
    ('yellow_background', 'Yellow background'),
    ('light_blue_background', 'Light blue background'),
)

GRID_LAYOUT_CHOICES = (
    ('full_width', 'Full Width'),
    ('article_full_width', 'Article Full Width'),
    ('2_col_1_on_mobile', 'Responsive (2 columns on desktop)'),
    ('3_col_1_on_mobile', 'Responsive (3 columns on desktop)'),
    ('4_col_1_on_mobile', 'Responsive (4 columns on desktop, 1 on mobile)'),
    ('4_col_2_on_mobile', 'Responsive (4 columns on desktop, 2 on mobile)'),
    ('4_col_2_tablet_1_on_mobile', 'Responsive (4 columns on desktop, 2 tablet, 1 mobile)'),
)

TWO_COLUMNS_LAYOUT_CHOICES = (
    ('50_50', '50%, 50%'),
    ('67_33', '67%, 33%'),
    ('33_67', '33%, 67%'),
    ('75_25', '75%, 25%'),
    ('25_75', '25%, 75%'),
)

TWO_COLUMNS_VARIANT_CHOICES = (
    ('none', 'None'),
    ('with_padding', 'Padded'),
)

STANDARD_GRID_PANELS = [
    ('rich_text_panel', StandardRichTextPanel(icon='title')),
    ('information_panel', StandardInformationPanel(target_model='dctcmsbase.AppTeaser', icon='image')),
    ('cta_panel', CtaPanel(icon='plus')),
    ('icon_card_panel', IconCardPanel(icon='snippet')),
    ('simple_image_panel', StandardSimpleImagePanel(icon='image')),
    ('plain_text_panel', PlainTextPanel(required=False)),
    ('accordion_panel', AccordionPanel(required=False, icon='form')),
    ('image_teaser_panel', StandardImageTeaserPanel(icon='pick')),
    ('audio_teaser_panel', AudioTeaserPanel(icon='pick')),
    ('video_teaser_panel', StandardVideoTeaserPanel(icon='pick')),
    ('inline_script_panel', InlineScriptPanel(icon='code')),
    ('inline_svg_panel', InlineSvgPanel(icon='snippet')),
    ('app_teaser_panel', AppTeaserPanel(target_model='dctcmsbase.AppTeaser', icon='image')),
    ('list_item_panel', ListItemPanel(icon='list-ul')),
]

CAROUSEL_LAYOUT_CHOICES = (
    ('full_width', 'Full width'),
    ('panel', 'Panel'),
)

TABLE_VARIANTS = (
    ('standard', 'Standard'),
)


class Shelf(blocks.StructBlock):
    shelf_id = IDBlock(required=False,
                       label='ID',
                       help_text='Not displayed in the front end',
                       classname='dct-meta-field')
    name = blocks.CharBlock(required=False, classname='dct-meta-field dct-name-field', help_text='Name to help identfy the shelf')
    width = blocks.ChoiceBlock(SHELF_WIDTH,
                                label='Width',
                                default='responsive',
                                classname='dct-meta-field')

    class meta:
        abstract = True


class WithTracking(blocks.StructBlock):
    tracking_group = blocks.CharBlock(required=False, classname='dct-meta-field', help_text='The tracking group, eg. EMM or OY')

    class meta:
        abstract = True


class GridShelf(Shelf):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    background_image = BackgroundImageBlock(required=False)
    rows_to_show = blocks.IntegerBlock(default=0, classname='dct-meta-field')
    meta_gutter_size = blocks.ChoiceBlock(GRID_GUTTER_CHOICES,
                                            label='Gutter size',
                                            default='gutter-unset',
                                            classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-grid-shelf dct-meta-panel'
        abstract = True


class StandardGridShelf(GridShelf, WithTracking):
    meta_variant = blocks.ChoiceBlock(choices=GRID_VARIANT_CHOICES,
                                    default='standard',
                                    label='Variant',
                                    classname='dct-meta-field')
    
    meta_layout = blocks.ChoiceBlock(choices=GRID_LAYOUT_CHOICES,
                                     default='full_width',
                                     label='Layout',
                                     help_text='Use this to select number of columns on desktop (only one column'
                                               ' on mobile)', classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-grid-shelf dct-meta-panel'


class PageHeadingShelf(Shelf, WithTracking):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    background_image = BackgroundImageBlock(required=False)
    image_left = PositionedImageBlock(label='Left Image', required=False)
    image_right = PositionedImageBlock(label='Right Image', required=False)

    class Meta:
        form_classname = 'dct-page-heading-shelf dct-meta-panel'


class BannerShelf(Shelf, WithTracking):
    panel = BannerChooserBlock(target_model='dctcmsbase.Banner', icon='image')
    meta_layout = blocks.ChoiceBlock(choices=BANNER_LAYOUT_CHOICES,
                                    default='vertical_center',
                                    label='Layout',
                                    classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-banner-shelf dct-meta-panel'


class CarouselShelf(Shelf, WithTracking):
    heading = blocks.CharBlock(required=False)
    items = blocks.StreamBlock([
        ('video_teaser_panel', StandardVideoTeaserPanel(icon='media')),
        ('image_teaser_panel', StandardImageTeaserPanel(icon='pick')),
        ('cta_panel', CtaPanel(icon='plus')),
        ('banner_panel', BannerChooserBlock(target_model='dctcmsbase.Banner', icon='image')),
        ('app_teaser_panel', AppTeaserChooserBlock(target_model='dctcmsbase.AppTeaser', icon='image')),
    ], icon='arrow-left', label='Items', required=False)
    meta_layout = blocks.ChoiceBlock(choices=CAROUSEL_LAYOUT_CHOICES,
                                     default='full_width',
                                     label='Layout',
                                     classname='dct-meta-field')

    class Meta:
        verbose_name = 'panel carousel'
        form_classname = 'dct-panel-carousel-shelf dct-meta-panel'


class TwoColumnShelf(Shelf, WithTracking):
    column_1_heading = blocks.CharBlock(required=False)
    column_2_heading = blocks.CharBlock(required=False)
    background_image = BackgroundImageBlock(required=False)

    class Meta:
        abstract = True
        form_classname = 'dct-two-column-shelf dct-meta-panel'


class StandardTwoColumnShelf(TwoColumnShelf):
    meta_layout = blocks.ChoiceBlock(choices=TWO_COLUMNS_LAYOUT_CHOICES, label='Layout')
    meta_variant = blocks.ChoiceBlock(choices=TWO_COLUMNS_VARIANT_CHOICES,
                                        default='none',
                                        label='Variant',
                                        classname='dct-meta-field')
    
    class Meta:
        verbose_name = 'two column'


class SimplePageHeadingShelf(Shelf, WithTracking):
    heading = blocks.CharBlock(required=False)
    display_back_button = blocks.BooleanBlock(label='Display a back button', required=False, default=True)
    back_button_label = blocks.CharBlock(required=False)

    class Meta:
        form_classname = 'dct-simple-page-heading-shelf dct-meta-panel'


class SimpleSectionHeadingShelf(Shelf, WithTracking):
    heading = blocks.CharBlock(required=True)

    class Meta:
        form_classname = 'dct-simple-section-heading-shelf dct-meta-panel'


class SimpleRichTextShelf(Shelf, WithTracking):
    body = blocks.RichTextBlock(required=False)

    class Meta:
        form_classname = 'dct-simple-rich-text-shelf dct-meta-panel'


class InlineScriptShelf(Shelf, InlineScriptBlock, WithTracking):
    class Meta:
        form_classname = 'dct-inline-script-shelf dct-meta-panel'


class InlineSvgShelf(Shelf, InlineSvgBlock, WithTracking):
    class Meta:
        form_classname = 'dct-inline-svg-shelf dct-meta-panel'


class DividerShelf(Shelf, WithTracking):
    class Meta:
        form_classname = 'dct-divider-shelf dct-meta-panel'


class IFrameShelf(Shelf, WithTracking):
    heading = blocks.CharBlock(required=False, label='Shelf heading')
    title = blocks.CharBlock(required=False, help_text='Title for accessibility')
    src = blocks.CharBlock(required=True, label='Source URL')
    frame_border = blocks.IntegerBlock(default=0, required=False)
    scrolling = blocks.CharBlock(required=False)
    width = blocks.CharBlock(default='100%', required=False, help_text='eg. 100%, 300px')
    height = blocks.CharBlock(defaut='400px', required=False, help_text='eg. 300px, 20em')
    sandbox = blocks.CharBlock(required=False)
    meta_iframe_id = blocks.CharBlock(required=False, label='Iframe ID', classname='dct-meta-field')
    meta_wrapper_div_id = blocks.CharBlock(required=False, label='Wrapper div ID', classname='dct-meta-field')
    meta_wrapper_div_class = blocks.CharBlock(required=False, label='Wrapper div class', classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-iframe-shelf dct-meta-panel'


class FindOutMoreDropDownShelf(Shelf, WithTracking):
    heading = blocks.CharBlock(required=False)
    ctas = blocks.StreamBlock([
        ('simple_cta_link', SimpleCtaLinkBlock()),
    ], icon='arrow-left', label='Items')

    class Meta:
        form_classname = 'dct-find-out-more-shelf dct-meta-panel'


class TableShelf(Shelf, WithTracking):
    header = blocks.ListBlock(blocks.CharBlock(required=False), default=[], label='Column headings')
    display_header = blocks.BooleanBlock(label='Display the table header?',
                                         required=False)
    body_rows = blocks.ListBlock(blocks.StreamBlock([
        ('simple_text_panel', PlainTextPanel(required=False)),
        ('rich_text_panel', StandardRichTextPanel(required=False)),
        ('icon_card_panel', IconCardPanel(required=False, icon='snippet'))
    ]))
    meta_variant = blocks.ChoiceBlock(choices=TABLE_VARIANTS,
                                      default='standard',
                                      label='Variant',
                                      classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-table-shelf dct-meta-panel'