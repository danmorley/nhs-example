
from wagtail.core import blocks

from dctcmsbase.shelves import PageHeadingShelf
from dctcmsbase.panels import VIDEO_HOSTS, BRIGHTCOVE_OPTION



class SexHealthPageHeadingShelf(PageHeadingShelf):
    host = blocks.ChoiceBlock(choices=VIDEO_HOSTS, label='Host', default=BRIGHTCOVE_OPTION)
    video_id = blocks.CharBlock(required=False)
    meta_use_play_link = blocks.BooleanBlock(label='Use play video link', required=False, default=False,
                                             classname='dct-meta-field')
    meta_play_link_text = blocks.CharBlock(default='Play', label='Play Video Link Text', classname='dct-meta-field')

    class Meta:
        form_classname = 'dct-page-heading-shelf dct-meta-panel'