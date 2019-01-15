
from wagtail.core import blocks

from dctcmsbase.panels import VIDEO_HOSTS, BRIGHTCOVE_OPTION, SimpleServiceFinderPanel
from dctcmsbase.shelves import PageHeadingShelf, StandardGridShelf, StandardTwoColumnShelf, STANDARD_GRID_PANELS


PAGE_HEADING_VARIANT_CHOICES = (
    ('standard', 'Standard'),
    ('no-text', 'No Text'),
)

SEXHEALTH_GRID_SHELF_PANELS = STANDARD_GRID_PANELS
SEXHEALTH_TWO_COLUMNSHELF_PANELS = STANDARD_GRID_PANELS + [('simple_service_finder_panel', SimpleServiceFinderPanel(icon='form'))]


class SexHealthPageHeadingShelf(PageHeadingShelf):
    meta_variant = blocks.ChoiceBlock(choices=PAGE_HEADING_VARIANT_CHOICES,
                                default='standard',
                                label='Variant',
                                classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-page-heading-shelf dct-meta-panel'


class SexHealthPageHeadingWithVideoShelf(PageHeadingShelf):
    host = blocks.ChoiceBlock(choices=VIDEO_HOSTS, label='Host', default=BRIGHTCOVE_OPTION)
    video_id = blocks.CharBlock(required=False)
    meta_use_play_link = blocks.BooleanBlock(label='Use play video link', required=False, default=False,
                                             classname='dct-meta-field')
    meta_play_link_text = blocks.CharBlock(default='Play', label='Play Video Link Text', classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-page-heading-with-video-shelf dct-meta-panel'


class SexHealthGridShelf(StandardGridShelf):
    items = blocks.StreamBlock(SEXHEALTH_GRID_SHELF_PANELS, icon='arrow-left', label='Items')


class SexHealthTwoColumnShelf(StandardTwoColumnShelf):
    column_1_items = blocks.StreamBlock(SEXHEALTH_TWO_COLUMNSHELF_PANELS, icon='arrow-left', label='Column 1 Content')
    column_2_items = blocks.StreamBlock(SEXHEALTH_TWO_COLUMNSHELF_PANELS, icon='arrow-left', label='Column 2 Content')