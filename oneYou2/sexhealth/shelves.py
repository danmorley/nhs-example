
from wagtail.core import blocks

from dctcmsbase.shelves import PageHeadingShelf
from dctcmsbase.panels import VIDEO_HOSTS, BRIGHTCOVE_OPTION


PAGE_HEADING_VARIANT_CHOICES = (
    ('standard', 'Standard'),
    ('no-text', 'No Text'),
)


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