import json
import uuid

from django.db import models
from django.db.models import DateField, TextField

from wagtail.wagtailcore import blocks
from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailadmin.edit_handlers import FieldPanel, StreamFieldPanel, InlinePanel, ObjectList, TabbedInterface
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel

from wagtail.wagtailsnippets.models import register_snippet
from wagtailsnippetscopy.models import SnippetCopyMixin
from wagtailsnippetscopy.registry import snippet_copy_registry



from modelcluster.fields import ParentalKey

class OneYou2Page(Page):
    body = StreamField([
        ('heading', blocks.CharBlock(classname="full title")),
        ('paragraph', blocks.RichTextBlock()),
        ('image', ImageChooserBlock()),
    ])
    uuid = models.CharField(max_length=255, unique=True)
    release = models.ForeignKey(
      'release.Release',
      related_name='pages',
      blank=True,
      null=True,
      default=None,
      on_delete=models.SET_NULL)

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
        FieldPanel('release'),
    ]

    info_content_panels = [
        InlinePanel('change_history', label='Change history'),
    ]

    edit_handler = TabbedInterface([
        ObjectList(content_panels, heading='Content'),
        ObjectList(info_content_panels, heading='Info'),
        ObjectList(Page.promote_panels, heading='Promote'),
        ObjectList(Page.settings_panels, heading='Settings', classname='settings'),
    ])

    api_fields = ['body','path', 'depth', 'numchild', 'uuid']

    def save(self, *args, **kwargs):
        if self.uuid == None:
            self.uuid = str(uuid.uuid4())

        return super(OneYou2Page, self).save(*args, **kwargs)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.uuid = str(uuid.uuid4())    


    def update_from_dict(self, obj_dict):
        self.title = obj_dict['title']
        self.path = obj_dict['path']
        self.depth = obj_dict['depth']
        self.numchild = obj_dict['numchild']
        self.slug = obj_dict['meta']['slug']
        self.seo_title = obj_dict['meta']['seo_title']
        self.show_in_menus = obj_dict['meta']['show_in_menus']
        self.search_description = obj_dict['meta']['search_description']
        self.first_published_at = obj_dict['meta']['first_published_at']
        self.body = json.dumps(obj_dict['body'])
        return self

    @classmethod
    def create_from_dict(cls, obj_dict):
        return cls(title=obj_dict['title'], path=obj_dict['path'], depth=obj_dict['depth'], numchild=obj_dict['numchild'],
            slug=obj_dict['meta']['slug'], seo_title=obj_dict['meta']['seo_title'], show_in_menus=obj_dict['meta']['show_in_menus'],
            search_description=obj_dict['meta']['search_description'], first_published_at=obj_dict['meta']['first_published_at'], 
            uuid=obj_dict['uuid'], body=json.dumps(obj_dict['body']))


class ChangeHistory(Orderable):
    page = ParentalKey(OneYou2Page, related_name='change_history')
    date_of_change = DateField(blank=False, verbose_name='Date')
    comment = TextField(blank=False)

    panels = [
        FieldPanel('date_of_change', classname='col4'),
        FieldPanel('comment', classname='col8'),
    ]


# StruckBlocks

class SimpleMenuItem(blocks.StructBlock):
    link_text = blocks.CharBlock(required=True)
    link_external = blocks.URLBlock(label='External link', required=False)
    link_page = blocks.PageChooserBlock(required=False)


class MultiMenuItem(blocks.StructBlock):
    label = blocks.CharBlock(required=True)
    menu_items = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items')


class SocialMediaFooterLink(blocks.StructBlock):
    choices = (
        ('twitter', "Twitter"),
        ('facebook', "Facebook"),
    )
    label = blocks.CharBlock(required=True)
    type = blocks.ChoiceBlock(choices=choices)
    link = blocks.URLBlock(label='External link', required=False)


# Snippets

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
        'wagtailimages.Image',
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

