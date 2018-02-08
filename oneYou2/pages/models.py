from django.db import models
from django.db.models import DateField, TextField

from wagtail.wagtailcore import blocks
from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailadmin.edit_handlers import FieldPanel, StreamFieldPanel, InlinePanel, ObjectList, TabbedInterface
from wagtail.wagtailimages.blocks import ImageChooserBlock

from modelcluster.fields import ParentalKey
from wagtail.wagtailsnippets.models import register_snippet

from release.models import Release

import uuid

class OneYou2Page(Page):
    body = StreamField([
        ('heading', blocks.CharBlock(classname="full title")),
        ('paragraph', blocks.RichTextBlock()),
        ('image', ImageChooserBlock()),
    ])
    uuid = models.CharField(max_length=255, unique=True)
    release = ParentalKey(
      Release,
      related_name='pages',
      blank=True,
      null=True,
      default=None,
      on_delete=models.SET_NULL)

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
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

    api_fields = ['body','path', 'depth', 'numchild']

    def save(self, *args, **kwargs):
        if self.uuid == None:
            self.uuid = str(uuid.uuid4())

        return super(OneYou2Page, self).save(*args, **kwargs)

    @classmethod
    def create_from_dict(cls, obj_dict):
        print(obj_dict)
        return cls(title=obj_dict['title'], path=obj_dict['path'], depth=obj_dict['depth'], numchild=obj_dict['numchild'],
            slug=obj_dict['meta']['slug'], seo_title=obj_dict['meta']['seo_title'], show_in_menus=obj_dict['meta']['show_in_menus'],
            search_description=obj_dict['meta']['search_description'], first_published_at=obj_dict['meta']['first_published_at'])


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


# Snippets

@register_snippet
class Menu(models.Model):
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
