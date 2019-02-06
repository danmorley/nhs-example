from wagtail.core import blocks

from dctcmsbase.blocks import SimpleCtaLinkBlock
from dctcmsbase.panels import (StandardRichTextPanel, StandardInformationPanel, StandardImageTeaserPanel,
    StandardVideoTeaserPanel)
from dctcmsbase.shelves import STANDARD_GRID_PANELS, StandardGridShelf, StandardTwoColumnShelf, Shelf, WithTracking

from .panels import ActionGroupPanel, BackwardsCompatibleContentPanel


ONEYOU_GRID_SHELF_PANELS = STANDARD_GRID_PANELS + [
    ('oneyou_teaser_panel', BackwardsCompatibleContentPanel(label='OneYou1 teaser', icon='folder-inverse')),
]
ONEYOU_TWO_COLUMNSHELF_PANELS = STANDARD_GRID_PANELS
ARTICLE_ONEYOU_GRID_PANELS = [
    ('rich_text_panel', StandardRichTextPanel(icon='title')),
    ('information_panel', StandardInformationPanel(target_model='dctcmsbase.AppTeaser', icon='image')),
    ('image_teaser_panel', StandardImageTeaserPanel(icon='pick')),
    ('video_teaser_panel', StandardVideoTeaserPanel(icon='pick')),
]


class OneYouGridShelf(StandardGridShelf):
    items = blocks.StreamBlock(ONEYOU_GRID_SHELF_PANELS, icon='arrow-left', label='Items')


class OneYouTwoColumnShelf(StandardTwoColumnShelf):
    column_1_items = blocks.StreamBlock(STANDARD_GRID_PANELS, icon='arrow-left', label='Column 1 Content')
    column_2_items = blocks.StreamBlock(STANDARD_GRID_PANELS, icon='arrow-left', label='Column 2 Content')


class OneYouSectionHeadingShelf(Shelf, WithTracking):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)


class ActionPlanShelf(Shelf, WithTracking):
    action_groups = blocks.StreamBlock([
        ('action_group', ActionGroupPanel(required=False, icon='collapse-down')),
    ])
    ctas = blocks.StreamBlock([
        ('simple_menu_item', SimpleCtaLinkBlock())
    ], icon='arrow-left', label='Items', required=False)


class ActionPlanDisplayShelf(Shelf, WithTracking):
    title = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    ctas = blocks.StreamBlock([
        ('simple_menu_item', SimpleCtaLinkBlock())
    ], icon='arrow-left', label='Items', required=False)


class ArticleOneYouGridShelf(StandardGridShelf):
    items = blocks.StreamBlock(ONEYOU_GRID_SHELF_PANELS, icon='arrow-left', label='Items')