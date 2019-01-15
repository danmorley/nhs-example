from wagtail.core import blocks

from dctcmsbase.blocks import ImageBlock, SimpleCtaLinkBlock
from dctcmsbase.panels import Panel

from .blocks import ActionChooserBlock


class ActionGroupPanel(Panel):
    title = blocks.CharBlock(required=True)
    actions = blocks.StreamBlock([
        ('action_panel', ActionChooserBlock(target_model='oneyou.Action', icon='list-ul')),
    ])

    class Meta:
        form_classname = 'dct-action-group-shelf dct-meta-panel'


class BackwardsCompatibleContentPanel(Panel):
    heading = blocks.CharBlock(required=False)
    body = blocks.RichTextBlock(required=False)
    image = ImageBlock(required=False)
    ctas = blocks.StreamBlock([
        ('simple_menu_item', SimpleCtaLinkBlock())
    ], icon='arrow-left', label='Items', required=False,)

    class Meta:
        form_classname = 'dct-oneyou-teaser-panel dct-meta-panel'