from wagtail.core import blocks

from .blocks import PositionedImageBlock, IDBlock, BackgroundImageBlock, BannerChooserBlock
from .panels import (StandardRichTextPanel, StandardInformationPanel, CtaPanel, StandardSimpleImagePanel,
    PlainTextPanel, AccordionPanel, StandardImageTeaserPanel, AudioTeaserPanel, StandardVideoTeaserPanel,
    SimpleServiceFinder)
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

GRID_PANELS = [
    ('rich_text_panel', StandardRichTextPanel(icon='title')),
    ('information_panel', StandardInformationPanel(target_model='shelves.AppTeaser', icon='image')),
    ('cta_panel', CtaPanel(icon='plus')),
    ('simple_image_panel', StandardSimpleImagePanel(icon='image')),
    ('plain_text_panel', PlainTextPanel(required=False)),
    ('accordion_panel', AccordionPanel(required=False, icon='form')),
    ('image_teaser', StandardImageTeaserPanel(icon='pick')),
    ('audio_teaser', AudioTeaserPanel(icon='pick')),
    ('video_teaser', StandardVideoTeaserPanel(icon='pick')),
    ('simple_service_finder', SimpleServiceFinder(icon='form')),
]


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
    items = blocks.StreamBlock(GRID_PANELS, icon='arrow-left', label='Items')
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


class PanelCarouselShelf(Shelf, WithTracking):
    heading = blocks.CharBlock(required=False)
    items = blocks.StreamBlock([
        ('video_teaser', StandardVideoTeaserPanel(icon='media')),
        ('image_teaser', StandardImageTeaserPanel(icon='pick')),
        ('cta_panel', CtaPanel(icon='plus')),
    ], icon='arrow-left', label='Items', required=False)

    class Meta:
        verbose_name = 'panel carousel'
        form_classname = 'dct-panel-carousel-shelf dct-meta-panel'


class TwoColumnShelf(Shelf, WithTracking):
    column_1_heading = blocks.CharBlock(required=False)
    column_1_items = blocks.StreamBlock(GRID_PANELS, icon='arrow-left', label='Column 1 Content')
    column_2_heading = blocks.CharBlock(required=False)
    column_2_items = blocks.StreamBlock(GRID_PANELS, icon='arrow-left', label='Column 2 Content')
    background_image = BackgroundImageBlock(required=False)


    class Meta:
        abstract = True
        form_classname = 'dct-two-column-shelf dct-meta-panel'


class StandardTwoColumnShelf(TwoColumnShelf):
    meta_layout = blocks.ChoiceBlock(choices=TWO_COLUMNS_LAYOUT_CHOICES, label='Layout')
    
    class Meta:
        verbose_name = 'two column'


class SimplePageHeadingShelf(Shelf):
    heading = blocks.CharBlock(required=False)
    display_back_button = blocks.BooleanBlock(label='Display a back button', required=False, default=True)
    back_button_label = blocks.CharBlock(required=False)

    class Meta:
        form_classname = 'dct-simple-page-heading-shelf dct-meta-panel'


class SimpleSectionHeadingShelf(Shelf):
    heading = blocks.CharBlock(required=True)

    class Meta:
        form_classname = 'dct-simple-section-heading-shelf dct-meta-panel'


class SimpleRichTextShelf(Shelf):
    body = blocks.RichTextBlock(required=False)

    class Meta:
        form_classname = 'dct-simple-rich-text-shelf dct-meta-panel'