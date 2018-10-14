import json
import logging

from django.conf import settings
from django.db import models
from django.db.models import DateField, TextField
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.template.response import TemplateResponse, SimpleTemplateResponse

from wagtail.admin.edit_handlers import FieldPanel, StreamFieldPanel, InlinePanel, ObjectList, TabbedInterface, \
    MultiFieldPanel
from wagtail.core import blocks
from wagtail.core.fields import StreamField, RichTextField
from wagtail.core.models import Site, Page, Orderable
from wagtail.documents.blocks import DocumentChooserBlock
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.snippets.models import register_snippet

from wagtailsnippetscopy.models import SnippetCopyMixin
from wagtailsnippetscopy.registry import snippet_copy_registry

from modelcluster.fields import ParentalKey
from modelcluster.models import get_all_child_relations, get_all_child_m2m_relations

from .blocks import IDBlock, CTABlock, MenuItemPageBlock, ImageBlock, SimpleCtaLinkBlock, MediaChooserBlock
from .utils import get_serializable_data_for_fields

from home.models import SiteSettings, PageType
from oneYou2.utils import get_protocol

from shelves.blocks import PromoShelfChooserBlock, BannerShelfChooserBlock, AppTeaserChooserBlock, \
    BlobImageChooserBlock, RecipeTeaserChooserBlock, ActionChooserBlock


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

GRID_IMAGE_CHOICES = (
    ('contain', 'Contain'),
    ('cover', 'Stretch'),
)

GRID_GUTTER_CHOICES = (
    ('gutter-unset', 'Unset'),
    ('gutter-sm', 'Small'),
    ('gutter-md', 'Medium'),
    ('gutter-lg', 'Large'),
)

TWO_COLUMNS_LAYOUT_CHOICES = (
    ('50_50', '50%, 50%'),
    ('67_33', '67%, 33%'),
    ('33_67', '33%, 67%'),
    ('75_25', '75%, 25%'),
    ('25_75', '25%, 75%'),
)

TABLE_VARIANTS = (
    ('standard', 'Standard'),
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

ICON_CARD_VARIANTS = (
    ('standard_grey_bg', 'Standard on Grey Background'),
    ('standard_heading_standard_body_grey_bg', 'Standard Heading, Standard Body Text, Grey Background'),
    ('large_green_heading_standard_body_grey_bg', 'Large Green Heading, Standard Body Text, Grey Background'),
    ('x_small_heading_large_body_no_bg', 'X Small Heading, Large Body Text, No Background'),
    ('large_yellow_heading_standard_body_no_bg', 'Large yellow heading, standard body, no background (Active 10)'),
)

IMAGE_PANEL_VARIANTS = (
    ('normal', 'Normal'),
    ('stretch', 'Stretch'),
)

INFO_PANEL_VARIANTS = (
    ('mobile-image-top-text-right', 'Mobile image on top, Desktop image on left with text right'),
    ('mobile-image-right', 'Mobile image on right, Desktop image on right'),
    ('light_background', 'Light background'),
    ('dark_background', 'Dark background')
)

RICH_TEXT_PANEL_VARIANTS = (
    ('standard', 'standard'),
    ('crisis-card', 'Formatting for Route to Crisis cards'),
    ('crisis-card-no-header', 'Formatting for Route to Crisis cards - no header H3'),
)

VIDEO_LAYOUTS = (
    ('text_on_right', 'Video Left Text Right'),
    ('text_on_top', 'Video Bottom Text Top'),
)

BRIGHTCOVE_OPTION = ('brightcove', 'Brightcove')
WIREWAX_OPTION = ('wirewax', 'Wirewax')
VIDEO_HOSTS = (
    BRIGHTCOVE_OPTION,
    WIREWAX_OPTION,
)


CONTENT_STATUS_PENDING = 0

logger = logging.getLogger('wagtail.core')


class SimpleMenuItem(blocks.StructBlock):
    link_text = blocks.CharBlock(required=False)
    link_external = blocks.CharBlock(label='External link', required=False)
    link_page = MenuItemPageBlock(required=False)
    link_id = IDBlock(required=False, label="ID", classname='dct-meta-field', help_text="Uniquely identify the CTA. Often used for tracking")

    class Meta:
        icon = 'link'
        form_classname = 'dct-simple-menu-item dct-meta-panel'


class MultiMenuItem(blocks.StructBlock):
    label = blocks.CharBlock(required=False)
    menu_items = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items')


class DocumentDownloadItem(blocks.StructBlock):
    link_text = blocks.CharBlock(required=True)
    document = DocumentChooserBlock(label='Document', required=True)


class SocialMediaFooterLink(blocks.StructBlock):
    choices = (
        ('twitter', "Twitter"),
        ('facebook', "Facebook"),
    )
    label = blocks.CharBlock(required=False)
    type = blocks.ChoiceBlock(choices=choices)
    link = blocks.URLBlock(label='External link', required=False)


# Panels


class BackwardsCompatibleContent(CTABlock):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    image = BlobImageChooserBlock()
    cta = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items', required=False, verbose_name="cta")
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-oneyou2-teaser-panel dct-meta-panel'


class InformationPanel(CTABlock):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    image = BlobImageChooserBlock(required=False)
    cta = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items', required=False, verbose_name="cta")
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')
    meta_variant = blocks.ChoiceBlock(choices=INFO_PANEL_VARIANTS, label="Variant", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-information-panel dct-meta-panel'


class FindOutMoreDropDown(CTABlock):
    heading = blocks.CharBlock(required=False)
    cta = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items')
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-find-out-more-panel dct-meta-panel'


class VideoTemplate(CTABlock):
    host = blocks.ChoiceBlock(choices=VIDEO_HOSTS, label="Host", default=BRIGHTCOVE_OPTION)
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    image = BlobImageChooserBlock(help_text="Click this image plays the video")
    video = blocks.CharBlock(required=False)
    cta = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items', required=False)
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')
    meta_layout_mobile = blocks.ChoiceBlock(choices=[
        ('mobile_image_top', 'Top'),
        ('mobile_image_left', 'Left'),
        ('mobile_image_only', 'Image only'),
    ],
        default='mobile_image_left', label='Mobile Image Position', classname='dct-meta-field')
    meta_layout_desktop = blocks.ChoiceBlock(choices=[
        ('desktop_image_top', 'Top'),
        ('desktop_image_left', 'Left'),
        ('desktop_image_only', 'Image only'),
    ],
        default='desktop_image_left', label='Desktop Image Position', classname='dct-meta-field')
    meta_use_play_link = blocks.BooleanBlock(label='Use play video link', required=False, default=False,
                                             classname='dct-meta-field')
    meta_play_link_text = blocks.CharBlock(default='Play', label='Play Video Link Text', classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-video-teaser-panel dct-meta-panel'


class ImageTeaserTemplate(CTABlock):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    image = BlobImageChooserBlock()
    audio = MediaChooserBlock(required=False)
    cta = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem()),
        ('document_download', DocumentDownloadItem())
    ], icon='arrow-left', label='Items', required=False)
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')
    meta_variant = blocks.ChoiceBlock(choices=[
            ('light-bg', 'Light Background'),
            ('dark-bg', 'Dark Background')
        ],
        default='light-bg', label='Variant', classname='dct-meta-field')
    meta_layout_mobile = blocks.ChoiceBlock(choices=[
            ('mobile-image-default', 'Default'),
            ('mobile-image-top', 'Top'),
            ('mobile-image-left', 'Left'),
        ],
        default='mobile-image-default', label='Mobile Image Position', classname='dct-meta-field')
    meta_layout_desktop = blocks.ChoiceBlock(choices=[
            ('desktop-image-default', 'Default'),
            ('desktop-image-left', 'Left'),
        ],
        default='desktop-image-default', label='Desktop Image Position', classname='dct-meta-field')
    meta_cta_variant = blocks.ChoiceBlock(choices=[
            ('link', 'Link'),
            ('button', 'Button'),
        ],
        default='link', label='CTA Style', classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-panel-image-teaser dct-meta-panel'


class IconCardPanel(CTABlock):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    image = BlobImageChooserBlock(required=False)
    cta = blocks.StreamBlock([
        ('simple_cta_link', SimpleCtaLinkBlock())
    ], icon='arrow-left', label='CTA links', required=False)
    panel_id = IDBlock(required=False, label="ID", classname='dct-meta-field')
    meta_variant = blocks.ChoiceBlock(choices=ICON_CARD_VARIANTS,
                                      default='standard_grey_bg',
                                      label="Variant",
                                      classname='dct-meta-field')
    meta_layout = blocks.ChoiceBlock(choices=ICON_CARD_LAYOUTS,
                                     default='icon_on_left',
                                     label="Layout",
                                     classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-icon-card-panel dct-meta-panel'


class SimpleImagePanel(CTABlock):
    image = BlobImageChooserBlock(required=False)
    image_cta = SimpleCtaLinkBlock(required=False)
    panel_id = IDBlock(required=False, label="ID", classname='dct-meta-field')
    meta_variant = blocks.ChoiceBlock(choices=IMAGE_PANEL_VARIANTS,
                                      default='normal',
                                      label="Variant",
                                      classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-simple-image-panel dct-meta-panel'


class SimpleTextPanel(blocks.StructBlock):
    text = blocks.CharBlock(required=False)


class RichTextPanel(blocks.StructBlock):
    text = blocks.RichTextBlock(required=False)
    meta_variant = blocks.ChoiceBlock(choices=RICH_TEXT_PANEL_VARIANTS,
                                      default='standard',
                                      label="Variant",
                                      classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-rich-text-panel dct-meta-panel'
                  

class ListItemPanel(blocks.StructBlock):
    text = blocks.CharBlock(required=True)


class InlineScriptPanel(blocks.StructBlock):
    script = blocks.TextBlock(required=False, help_text="The javascript to be inserted")
    src = blocks.CharBlock(required=False, help_text="URL of the javascript file")
    field_id = IDBlock(required=False, label="ID", retain_case=True, classname='dct-meta-field')
    script_id = IDBlock(required=False, label='Script tag ID', retain_case=True,
                        help_text='Optional ID of the script tag')
    placeholder_id = IDBlock(required=False, label='Placeholder ID', retain_case=True,
                             help_text='If given, an empty placeholder div will be added before the script tag')

    class Meta:
        form_classname = 'dct-inline-script-panel dct-meta-panel'


class InlineSvgPanel(blocks.StructBlock):
    svg = blocks.TextBlock(required=True, label="SVG code", help_text="The SVG source")
    svg_mob = blocks.TextBlock(required=False, label="SVG code for mobile", help_text="The SVG source for display on mobile devises")
    styles = blocks.TextBlock(required=False, help_text="CSS styling")
    script = blocks.TextBlock(required=False, label="Inline script code", help_text="Inline javascript to make the SVG interactive")
    field_id = IDBlock(required=False, label="Placeholder ID", retain_case=True, classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-inline-svg-panel dct-meta-panel'


class CtaPanel(blocks.StructBlock):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    cta = blocks.StreamBlock([
        ('simple_cta_link', SimpleCtaLinkBlock())
    ], icon='arrow-left', label='CTA links', required=False)
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')


ACCORDION_ITEMS = [
    ('rich_text_panel', RichTextPanel(required=False)),
]


class AccordionItem(blocks.StructBlock):
    heading = blocks.CharBlock(required=False)
    items = blocks.StreamBlock(ACCORDION_ITEMS, icon='arrow-left', label='Items')
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-table-shelf dct-meta-panel'


class AccordionPanel(blocks.StructBlock):
    accordions = blocks.StreamBlock([
        ('accordion_item', AccordionItem(required=True, icon='collapse-down'))
    ])


GRID_PANELS = [
    ('oneyou1_teaser', BackwardsCompatibleContent(label="OneYou1 teaser", icon="folder-inverse")),
    ('video_teaser', VideoTemplate(icon="media")),
    ('rich_text_panel', RichTextPanel(icon="title")),
    ('image_teaser', ImageTeaserTemplate(icon="pick", label="Inspiration teaser")),
    ('app_teaser', AppTeaserChooserBlock(target_model="shelves.AppTeaser", icon="image")),
    ('information_panel', InformationPanel(target_model="shelves.AppTeaser", icon="image")),
    ('icon_card_panel', IconCardPanel(icon="snippet")),
    ('cta_panel', CtaPanel(icon='plus')),
    ('inline_script_panel', InlineScriptPanel(icon="code")),
    ('inline_svg_panel', InlineSvgPanel(icon="snippet")),
    ('list_item_panel', ListItemPanel(icon='list-ul')),
    ('simple_image_panel', SimpleImagePanel(icon="image")),
    ('rich_text_panel', RichTextPanel(required=False)),
    ('simple_text_panel', SimpleTextPanel(required=False)),
    ('accordion_panel', AccordionPanel(required=False, icon='form')),
]


# Shelves

class Shelf(blocks.StructBlock):
    tracking_group = blocks.CharBlock(required=False, classname='dct-meta-field', help_text='The tracking group, eg. EMM or OY')


class PageHeading(CTABlock, Shelf):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    background_image = BlobImageChooserBlock(required=False)
    image_left = ImageBlock(required=False)  # max_width=250, max_height=250)
    image_right = ImageBlock(required=False)  # max_width=250, max_height=250)
    shelf_id = IDBlock(required=False,
                       label="ID",
                       help_text="Not displayed in the front end",
                       classname='dct-meta-field')

    meta_gradient = blocks.BooleanBlock(label='Green gradient',
                                        required=False,
                                        default=False,
                                        classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-page-heading-shelf dct-meta-panel'


class SectionHeading(Shelf):
    heading = blocks.CharBlock(required=False)
    shelf_id = IDBlock(required=False,
                       label="ID",
                       help_text="Not displayed in the front end",
                       classname='dct-meta-field')
    body = blocks.RichTextBlock(required=False)

    class Meta:
        form_classname = 'dct-section-heading-shelf dct-meta-panel'


class SimplePageHeading(SectionHeading):
    """This is a page heading with only text."""
    pass


class ArticlePageHeadingShelf(Shelf):
    heading = blocks.CharBlock(required=False)
    display_back_button = blocks.BooleanBlock(label='Display a back button', required=False, default=True)
    back_button_label = blocks.CharBlock(required=False)
    shelf_id = IDBlock(required=False, label="ID", help_text="Not displayed in the front end", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-article-page-heading-shelf dct-meta-panel'


class IFrameShelf(blocks.StructBlock):
    heading = blocks.CharBlock(required=False, label='Shelf heading')
    title = blocks.CharBlock(required=False, help_text='Title for accessibility')
    src = blocks.CharBlock(required=True, label='Source URL')
    frame_border = blocks.IntegerBlock(default=0, required=False)
    scrolling = blocks.CharBlock(required=False)
    width = blocks.CharBlock(default='100%', required=False, help_text='eg. 100%, 300px')
    height = blocks.CharBlock(defaut='400px', required=False, help_text='eg. 300px, 20em')
    sandbox = blocks.CharBlock(required=False)
    shelf_id = blocks.CharBlock(required=False, label='ID', classname='dct-meta-field')
    meta_iframe_id = blocks.CharBlock(required=False, label='Iframe ID', classname='dct-meta-field')
    meta_wrapper_div_id = blocks.CharBlock(required=False, label='Wrapper div ID', classname='dct-meta-field')
    meta_wrapper_div_class = blocks.CharBlock(required=False, label='Wrapper div class', classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-iframe-shelf dct-meta-panel'


class Divider(blocks.StructBlock):
    shelf_id = IDBlock(required=False, label="ID", help_text="Not displayed in the front end")


class Carousel(Shelf):
    heading = blocks.CharBlock(required=False)
    items = blocks.StreamBlock([
        ('video_teaser', VideoTemplate(icon="media")),
        ('banner_shelf', BannerShelfChooserBlock(target_model="shelves.BannerShelf", icon="image")),
        ('app_teaser', AppTeaserChooserBlock(target_model="shelves.AppTeaser", icon="image")),
    ], icon='arrow-left', label='Items', required=False)
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-carousel-shelf dct-meta-panel'


class PanelCarousel(Shelf):
    heading = blocks.CharBlock(required=False)
    items = blocks.StreamBlock([
        ('video_teaser', VideoTemplate(icon="media")),
        ('app_teaser', AppTeaserChooserBlock(target_model="shelves.AppTeaser", icon="image")),
        ('image_teaser', ImageTeaserTemplate(icon="pick", label="Inspiration teaser")),
        ('cta_panel', CtaPanel(icon='plus')),
    ], icon='arrow-left', label='Items', required=False)
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-panel-carousel-shelf dct-meta-panel'


class Grid(Shelf):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    items = blocks.StreamBlock(GRID_PANELS, icon='arrow-left', label='Items')
    background_image = ImageBlock(required=False)
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')
    rows_to_show = blocks.IntegerBlock(default=0, classname='dct-meta-field')
    meta_variant = blocks.ChoiceBlock(choices=GRID_VARIANT_CHOICES,
                                      default='standard',
                                      label="Variant",
                                      classname='dct-meta-field')
    meta_layout = blocks.ChoiceBlock(choices=GRID_LAYOUT_CHOICES,
                                     default='full_width',
                                     label="Layout",
                                     help_text="Use this to select number of columns on desktop (only one column"
                                               " on mobile)", classname='dct-meta-field')
    meta_image_display = blocks.ChoiceBlock(GRID_IMAGE_CHOICES,
                                            label='Teaser image display',
                                            default='cover',
                                            classname='dct-meta-field')
    meta_gutter_size = blocks.ChoiceBlock(GRID_GUTTER_CHOICES,
                                            label='Gutter size',
                                            default='gutter-unset',
                                            classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-grid-shelf dct-meta-panel'


class RecipeGrid(Shelf):
    heading = blocks.CharBlock(required=False)
    items = blocks.StreamBlock([
        ('recipe_teaser', RecipeTeaserChooserBlock(target_model="shelves.RecipeTeaser", icon="image"))
    ], icon='arrow-left', label='Items')
    shelf_id = IDBlock(required=False, label="ID", classname='dct-meta-field')
    rows_to_show = blocks.IntegerBlock(default=0, classname='dct-meta-field')
    meta_image_display = blocks.ChoiceBlock(GRID_IMAGE_CHOICES,
                                            label='Teaser Image Display',
                                            default="cover", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-recipe-grid-shelf dct-meta-panel'


class Table(Shelf):
    header = blocks.ListBlock(blocks.CharBlock(required=False), default=[], label='Column headings')
    display_header = blocks.BooleanBlock(label='Display the table header?',
                                         required=False)
    body_rows = blocks.ListBlock(blocks.StreamBlock([
        ('simple_text_panel', SimpleTextPanel(required=False)),
        ('rich_text_panel', RichTextPanel(required=False)),
        ('icon_card_panel', IconCardPanel(required=False, icon="snippet"))
    ]))
    shelf_id = IDBlock(required=False, label='ID', classname='dct-meta-field')
    meta_variant = blocks.ChoiceBlock(choices=TABLE_VARIANTS,
                                      default='standard',
                                      label='Variant',
                                      classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-table-shelf dct-meta-panel'


class TriageToolShelf(Shelf):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    shelf_id = IDBlock(required=False,
                       label="ID",
                       help_text="Used to uniquely identify the shelf on the page.",
                       classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-triage-tool-shelf dct-meta-panel'


class ActionGroup(Shelf):
    title = blocks.CharBlock(required=True)
    actions = blocks.StreamBlock([
        ('action_panel', ActionChooserBlock(target_model="shelves.ActionShelf", icon="list-ul")),
    ])
    panel_id = IDBlock(required=False, label="ID", classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-action-group-shelf dct-meta-panel'


class TwoColumnShelf(Shelf):
    column_1_heading = blocks.CharBlock(required=False)
    column_1_items = blocks.StreamBlock(GRID_PANELS, icon='arrow-left', label='Column 1 Content')
    column_2_heading = blocks.CharBlock(required=False)
    column_2_items = blocks.StreamBlock(GRID_PANELS, icon='arrow-left', label='Column 2 Content')
    meta_layout = blocks.ChoiceBlock(choices=TWO_COLUMNS_LAYOUT_CHOICES, label="Layout")
    meta_image_display = blocks.ChoiceBlock(choices=(
            ('contain', 'Contain'),
            ('cover', 'Stretch')
        ),
        label='Teaser Image Display', default="cover")
    shelf_id = IDBlock(required=False, label="ID")

    class Meta:
        form_classname = 'dct-two-column-shelf dct-meta-panel'


class ActionPlan(Shelf):
    action_groups = blocks.StreamBlock([
        ('action_group', ActionGroup(required=False, icon="collapse-down")),
    ])
    cta = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items', required=False)
    shelf_id = IDBlock(required=False, label='ID', classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-action-plan-shelf dct-meta-panel'


class ActionPlanDisplay(Shelf):
    shelf_id = IDBlock(required=False, label='ID', classname='dct-meta-field')
    title = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)

    cta = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items', required=False)

    class Meta:
        form_classname = 'dct-action-plan-display-shelf dct-meta-panel'


class AccordionGroup(Shelf):
    accordions = blocks.StreamBlock([
        ('accordion_panel', AccordionItem(required=True, icon='collapse-down'))
    ])


class PromoShelf(Shelf):
    promo = PromoShelfChooserBlock(target_model="shelves.PromoShelf", icon="image")
    shelf_id = IDBlock(required=False,
                       label="ID",
                       help_text="Used to uniquely identify the shelf on the page.",
                       classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-promo-shelf dct-meta-panel'


class BannerShelf(Shelf):
    banner = BannerShelfChooserBlock(target_model="shelves.BannerShelf", icon="image")
    shelf_id = IDBlock(required=False,
                       label="ID",
                       help_text="Used to uniquely identify the shelf on the page.",
                       classname='dct-meta-field')


# Pages
class GeneralShelvePage(Page):
    # Meta Fields
    og_title = models.CharField(max_length=255, default="Home",)
    og_description = models.CharField(max_length=255, default="Description")
    og_url = models.CharField(max_length=255, blank=True)
    og_image_fk = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        default=1,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="OG image"
    )
    og_type = models.CharField(max_length=255, default="website")
    twitter_url = models.CharField(max_length=255, blank=True)
    twitter_card = models.CharField(max_length=255, default="summary")
    twitter_site = models.CharField(max_length=255, default="@TwitterUser")
    twitter_title = models.CharField(max_length=255, default="Home")
    twitter_description = models.CharField(max_length=255, default="Description")

    use_share_button = models.BooleanField(default=True)
    use_email_button = models.BooleanField(default=False)
    use_print_button = models.BooleanField(default=False)

    opt_in_1_text = models.CharField(max_length=255, blank=True, null=True)
    opt_in_2_text = models.CharField(max_length=255, blank=True, null=True)
    ts_and_cs_statement = models.TextField(blank=True, null=True)
    tracking_group = models.CharField(max_length=20, blank=True, null=True)

    twitter_image_fk = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        default=1,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name="Twitter image"
    )
    release = models.ForeignKey(
        'release.Release',
        related_name='%(class)s_pages',
        blank=True,
        null=True,
        default=None,
        on_delete=models.SET_NULL,
        limit_choices_to={'content_status': CONTENT_STATUS_PENDING})

    theme = models.ForeignKey(
        'pages.Theme',
        related_name='%(class)s_pages',
        null=True,
        on_delete=models.SET_NULL)

    @property
    def og_image(self):
        try:
            return self.og_image_fk.file.url
        except AttributeError:
            pass
        except ValueError:
            pass
        return ""

    @property
    def twitter_image(self):
        try:
            return self.twitter_image_fk.file.url
        except AttributeError:
            pass
        except ValueError:
            pass
        return ""

    @property
    def page_theme(self):
        return self.theme.to_dict()

    @property
    def link_url(self):
        # TODO: This could potentially use some base page methods
        site_name = SiteSettings.objects.get(site_id=self.get_site().id).uid
        return '/' + site_name + self.url_path

    @property
    def breadcrumbs(self):
        ancestors = self.get_ancestors().live()[1:]
        breadcrumbs = []
        for ancestor in ancestors:
            # If root page it doesn't have link url
            try:
                breadcrumbs.append({"name": ancestor.specific.title, "url": ancestor.specific.link_url})
            except AttributeError:
                site_name = SiteSettings.objects.get(site_id=self.get_site().id).uid
                breadcrumbs.append({"name": ancestor.specific.title, "url": '/' + site_name})
        return breadcrumbs
        
    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
        FieldPanel('release'),
        SnippetChooserPanel('theme'),
    ]

    info_content_panels = [
        InlinePanel('change_history', label='Change history'),
    ]

    meta_content_panels = [
        MultiFieldPanel(
            [
                FieldPanel('og_title'),
                FieldPanel('og_description'),
                FieldPanel('og_url'),
                ImageChooserPanel('og_image_fk'),
                FieldPanel('og_type'),
            ],
            heading='Open Graph Tags',
            classname='collapsible collapsed'),
        MultiFieldPanel(
            [
                FieldPanel('twitter_url'),
                FieldPanel('twitter_card'),
                FieldPanel('twitter_site'),
                FieldPanel('twitter_title'),
                FieldPanel('twitter_description'),
                ImageChooserPanel('twitter_image_fk'),
            ],
            heading='Twitter Tags',
            classname='collapsible collapsed'),
        MultiFieldPanel(
            [
                FieldPanel('use_share_button'),
                FieldPanel('use_email_button'),
                FieldPanel('use_print_button'),
            ],
            heading='Share buttons',
            classname='collapsible collapsed'),
        MultiFieldPanel(
            [
                FieldPanel('opt_in_1_text'),
                FieldPanel('opt_in_2_text'),
                FieldPanel('ts_and_cs_statement'),
            ],
            heading='Action plan terms and conditions',
            classname='collapsible collapsed'),
        MultiFieldPanel(
            [
                FieldPanel('tracking_group'),
            ],
            heading='Tracking',
            classname='collapsible collapsed'),
    ]

    promote_panels = [
        FieldPanel('slug'),
    ]

    edit_handler = TabbedInterface([
        ObjectList(content_panels, heading='Content'),
        ObjectList(info_content_panels, heading='Notes'),
        ObjectList(meta_content_panels, heading='Meta'),
        ObjectList(Page.promote_panels, heading='Settings'),
    ])

    api_fields = ['body', 'path', 'depth', 'numchild', 'live', 'page_theme']
    exclude_fields_in_copy = ['release']

    def save(self, *args, **kwargs):
        assigned_release = self.release

        if self.release:
            self.release = None

        super(GeneralShelvePage, self).save(*args, **kwargs)
        newest_revision = self.get_latest_revision()

        if assigned_release:
            if self.live:
                assigned_release.add_revision(newest_revision)
            else:
                assigned_release.remove_page(self.id)

        return self

    def serve_preview(self, request, mode_name, model_name):
        request.is_preview = True
        print("SERVE PREVIEW")

        if mode_name == 'json':
            from .serializers import GeneralShelvePageSerializer
            latest_revision_as_page = self.get_latest_revision_as_page()
            serialized_page = GeneralShelvePageSerializer(instance=latest_revision_as_page)
            return JsonResponse(serialized_page.data)

        if mode_name == 'react':
            path = self.get_url_parts(request)[2] if self.get_url_parts(request) is not None else '/home'
            context = {
                'preview_url': '/{}{}?preview_page={}'.format(model_name, path, self.slug)
            }
            return SimpleTemplateResponse(template='preview_wrapper.html', context=context)

        return self.serve(request)

    def serializable_data(self):
        obj = get_serializable_data_for_fields(self)

        for rel in get_all_child_relations(self):
            rel_name = rel.get_accessor_name()
            children = getattr(self, rel_name).all()

            if hasattr(rel.related_model, 'serializable_data'):
                obj[rel_name] = [child.serializable_data() for child in children]
            else:
                obj[rel_name] = [get_serializable_data_for_fields(child) for child in children]

        for field in get_all_child_m2m_relations(self):
            children = getattr(self, field.name).all()
            obj[field.name] = [child.pk for child in children]

        return obj

    def serve(self, request, *args, **kwargs):
        request.is_preview = getattr(request, 'is_preview', False)

        return TemplateResponse(
            request,
            self.get_template(request, *args, **kwargs),
            self.get_context(request, *args, **kwargs)
        )

    DEFAULT_PREVIEW_MODES = [
        ('react', 'Default'),
        # ('html', 'AMP'),
        ('json', 'API'),
    ]

    @property
    def preview_modes(self):
        """
        A list of (internal_name, display_name) tuples for the modes in which
        this page can be displayed for preview/moderation purposes. Ordinarily a page
        will only have one display mode, but subclasses of Page can override this -
        for example, a page containing a form might have a default view of the form,
        and a post-submission 'thankyou' page
        """
        return self.DEFAULT_PREVIEW_MODES

    @property
    def default_preview_mode(self):
        return self.preview_modes[0][0]

    class Meta:
        abstract = True


class OneYou2Page(GeneralShelvePage):
    body = StreamField([
        ('page_heading_shelf', PageHeading(icon='title')),
        ('simple_page_heading_shelf', SimplePageHeading(icon='title')),
        ('section_heading_shelf', SectionHeading(classname="full title", icon='title')),
        ('carousel_shelf', Carousel(icon="repeat")),
        ('panel_carousel_shelf', PanelCarousel(icon="repeat")),
        ('promo_shelf', PromoShelfChooserBlock(target_model="shelves.PromoShelf", icon="image")),
        ('promo_shelf_v2', PromoShelf(icon="title")),
        ('banner_shelf', BannerShelfChooserBlock(target_model="shelves.BannerShelf", icon="image")),
        ('grid_shelf', Grid(icon="form")),
        ('recipe_grid_shelf', RecipeGrid(icon="form")),
        ('find_out_more_dropdown', FindOutMoreDropDown(label="Link dropdown", icon="order-down")),
        ('iframe_shelf', IFrameShelf(label="IFrame", icon='placeholder')),
        ('divider', Divider(label="Divider", icon='horizontalrule')),
        ('article_page_heading_shelf', ArticlePageHeadingShelf(label="Article Page Heading", icon='title')),
        ('table', Table(label="Table", icon='list-ul')),
        ('script_shelf', InlineScriptPanel(label="Script shelf", icon='code')),
        ('triage_tool_shelf', TriageToolShelf(label="Triage tool shelf", icon='cog')),
        ('svg_shelf', InlineSvgPanel(label="SVG shelf", icon='snippet')),
        ('accordion_group', AccordionGroup(label="Accordion Group", icon='form')),
        ('action_plan_shelf', ActionPlan(label="Action Plan Builder shelf", icon='form')),
        ('action_plan_display_shelf', ActionPlanDisplay(label="Action Plan Display shelf", icon='form')),
        ('two_column_shelf', TwoColumnShelf(label="Two Column Shelf", icon='grip')),
    ], null=True, blank=True)

    @classmethod
    def allowed_subpage_models(cls):
        """
        Returns the list of page types that this page type can have as subpages,
        as a list of model classes
        """
        from experiments.models import OneYouVariant
        return [
            OneYou2Page, RecipePage, OneYouVariant
        ]

    def update_from_dict(self, obj_dict, default_excludes=None, excludes=None):
        if not default_excludes:
            default_excludes = ['id', 'path', 'depth', 'numchild', 'content_type_id', 'live_revision_id',
                                'page_ptr_id', 'oneyou2page_ptr_id', 'release_id', 'live', 'locked', 'url_path']
        if not excludes:
            excludes = []

        excludes = default_excludes + excludes
        for key, value in obj_dict.items():
            if key not in excludes and not key.startswith('_'):
                setattr(self, key, value)
        return self

    def serve_preview(self, request, mode_name):
        return super(OneYou2Page, self).serve_preview(request, mode_name, 'oneyou')

    @classmethod
    def create_from_dict(cls, obj_dict):
        return cls(title=obj_dict['title'],
                   path=obj_dict['path'],
                   depth=obj_dict['depth'],
                   numchild=obj_dict['numchild'],
                   slug=obj_dict['meta']['slug'],
                   seo_title=obj_dict['meta']['seo_title'],
                   show_in_menus=obj_dict['meta']['show_in_menus'],
                   search_description=obj_dict['meta']['search_description'],
                   first_published_at=obj_dict['meta']['first_published_at'],
                   body=json.dumps(obj_dict['body']),
                   live=obj_dict['live'],
                   theme_id=obj_dict['page_theme']['id'])


OneYou2Page._meta.get_field('og_title').default = "One You - Home"
OneYou2Page._meta.get_field('og_description').default = ("Start the fight back to a healthier you! One You is"
                                                         " packed with practical tips, tools and free apps"
                                                         " to help you improve your health today")
OneYou2Page._meta.get_field('twitter_site').default = "@OneYouPHE"
OneYou2Page._meta.get_field('twitter_title').default = "One You - Home"
OneYou2Page._meta.get_field('twitter_description').default = ("Start the fight back to a healthier you! One You is packed with"
                                                        " practical tips, tools and free apps to help you improve"
                                                        " your health today")


class RecipePage(OneYou2Page):
    DIFFICULTY_OPTIONS = (
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    )
    image = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    recipe_name = models.CharField(max_length=255, null=True, blank=True)
    tags = models.CharField(max_length=255, null=True, blank=True)
    serves = models.IntegerField(default=0)
    preparation_time = models.IntegerField(default=0)
    difficulty = models.CharField(max_length=255, choices=DIFFICULTY_OPTIONS, default='medium')
    ingredients_list = RichTextField(null=True, blank=True)
    instructions = RichTextField(null=True, blank=True)

    content_panels = [
        FieldPanel('title'),
        ImageChooserPanel('image'),
        FieldPanel('recipe_name'),
        FieldPanel('tags'),
        FieldPanel('serves'),
        FieldPanel('preparation_time'),
        FieldPanel('difficulty'),
        FieldPanel('ingredients_list'),
        FieldPanel('instructions'),
        FieldPanel('body'),
        FieldPanel('release'),
        SnippetChooserPanel('theme'),
    ]

    edit_handler = TabbedInterface([
        ObjectList(content_panels, heading='Content'),
        ObjectList(OneYou2Page.info_content_panels, heading='Notes'),
        ObjectList(OneYou2Page.meta_content_panels, heading='Meta'),
        ObjectList(Page.promote_panels, heading='Settings'),
    ])

    @classmethod
    def allowed_subpage_models(cls):
        """
        Returns the list of page types that this page type can have as subpages,
        as a list of model classes
        """
        return [
            OneYou2Page, RecipePage
        ]

    def save(self, *args, **kwargs):
        assigned_release = self.release

        if self.release:
            self.release = None

        super(RecipePage, self).save(*args, **kwargs)
        newest_revision = self.get_latest_revision()

        if assigned_release:
            if self.live:
                assigned_release.add_revision(newest_revision)
            else:
                assigned_release.remove_page(self.id)

        return self

    def serve_preview(self, request, mode_name):
        request.is_preview = True

        if mode_name == 'json':
            from .serializers import RecipePageSerializer
            latest_revision_as_page = self.get_latest_revision_as_page()
            serialized_page = RecipePageSerializer(instance=latest_revision_as_page)
            return JsonResponse(serialized_page.data)

        if mode_name == 'react':
            context = {
                'preview_url': '/oneyou{}?preview_page={}'.format(self.get_url(), self.slug)
            }
            return SimpleTemplateResponse(template='preview_wrapper.html', context=context)

        return self.serve(request)


# Orderables

class ChangeHistory(Orderable):
    page = ParentalKey(Page, related_name='change_history')
    date_of_change = DateField(blank=False, verbose_name='Date')
    comment = TextField(blank=False)

    panels = [
        FieldPanel('date_of_change', classname='col4'),
        FieldPanel('comment', classname='col8'),
    ]


# Snippets
# TODO: Move these to shelves
@register_snippet
class Menu(SnippetCopyMixin, models.Model):
    label = models.CharField(max_length=255)
    menu_items = StreamField([
        ('simple_menu_item', SimpleMenuItem()),
        ('multi_menu_item', MultiMenuItem())
    ])

    panels = [
        FieldPanel('label'),
        StreamFieldPanel('menu_items')
    ]

    def __str__(self):
        return self.label


snippet_copy_registry.register(Menu, 'label')


@register_snippet
class Footer(models.Model):
    label = models.CharField(max_length=255)
    image = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    menu_items = StreamField([
        ('simple_menu_item', SimpleMenuItem()),
    ])

    follow_us = StreamField([
        ('social_media_link', SocialMediaFooterLink()),
    ])

    panels = [
        FieldPanel('label'),
        ImageChooserPanel('image'),
        StreamFieldPanel('menu_items'),
        StreamFieldPanel('follow_us')
    ]

    def __str__(self):
        return self.label


@register_snippet
class Header(models.Model):
    label = models.CharField(max_length=255)
    image = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    panels = [
        FieldPanel('label'),
        ImageChooserPanel('image'),
    ]

    def __str__(self):
        return self.label


@register_snippet
class Theme(models.Model):
    label = models.CharField(max_length=255)
    class_name = models.CharField(max_length=255)

    panels = [
        FieldPanel('label'),
        FieldPanel('class_name'),
    ]

    def __str__(self):
        return self.label

    def to_dict(self):
        return model_to_dict(self)


def get_subclasses(cls):
    for subclass in cls.__subclasses__():
        yield from get_subclasses(subclass)
        yield subclass


@receiver(pre_save, sender=Site)
def store_page_type(sender, instance, *args, **kwargs):
    for cls_item in get_subclasses(GeneralShelvePage):
        obj, created = PageType.objects.get_or_create(
            label=cls_item.__name__,
            app=cls_item.__module__.rsplit('.', 1)[0]
        )


# Disable variant from page creation
Page.subpage_types = [OneYou2Page, RecipePage]