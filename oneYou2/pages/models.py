import json
import uuid

from django.db import models
from django.db.models import DateField, TextField
from django.forms.models import model_to_dict
from django.template.loader import render_to_string

from wagtail.wagtailcore import blocks
from wagtail.wagtailcore.models import Page, Orderable
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailadmin.edit_handlers import FieldPanel, StreamFieldPanel, InlinePanel, ObjectList, TabbedInterface
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtailsnippets.edit_handlers import SnippetChooserPanel
from wagtail.wagtailsnippets.models import register_snippet
from wagtailsnippetscopy.models import SnippetCopyMixin
from wagtailsnippetscopy.registry import snippet_copy_registry

from modelcluster.fields import ParentalKey

from shelves.blocks import PromoShelfChooserBlock, BannerShelfChooserBlock, AppTeaserChooserBlock, BlobImageChooserBlock

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


class PageHeading(blocks.StructBlock):
    heading = blocks.CharBlock(required=True)
    body = blocks.TextBlock(required=True)
    background_image = BlobImageChooserBlock()
    shelf_id = blocks.CharBlock(required=False, label="ID", help_text="Not displayed in the front end")


class SectionHeading(blocks.StructBlock):
    heading = blocks.CharBlock(required=True)
    shelf_id = blocks.CharBlock(required=False, label="ID", help_text="Not displayed in the front end")


class SimplePageHeading(SectionHeading):
    """This is a page heading with only text."""
    pass


class CTABlock(blocks.StructBlock):
    def get_api_representation(self, value, context=None):
        # recursively call get_api_representation on children and return as a plain dict
        result = dict([
            (name, self.child_blocks[name].get_api_representation(val, context=context))
            for name, val in value.items()
        ])
        cta_links = []
        for link in result['cta']:
            cta_links.append(link['value'])
        result['cta'] = cta_links
        return result


class BackwardsCompatibleContent(CTABlock):
    heading = blocks.CharBlock(required=True)
    body = blocks.TextBlock(required=True)
    image = BlobImageChooserBlock()
    cta =blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items', required=False, verbose_name="cta")
    shelf_id = blocks.CharBlock(required=False, label="ID")


class FindOutMoreDropDown(CTABlock):
    heading = blocks.CharBlock(required=True)
    cta = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items')
    shelf_id = blocks.CharBlock(required=False, label="ID")


class VideoTemplate(blocks.StructBlock):
    heading = blocks.CharBlock(required=True)
    body = blocks.TextBlock(required=True)
    image = BlobImageChooserBlock(help_text="Click this image plays the video")
    video = blocks.CharBlock(required=True)
    cta = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items', required=False)
    shelf_id = blocks.CharBlock(required=False, label="ID")


class ImageTeaserTemplate(blocks.StructBlock):
    heading = blocks.CharBlock(required=True)
    body = blocks.TextBlock(required=True)
    image = BlobImageChooserBlock()
    cta = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items', required=False)
    shelf_id = blocks.CharBlock(required=False, label="ID")


class Carousel(blocks.StructBlock):
    heading = blocks.CharBlock()
    items = blocks.StreamBlock([
        ('oneyou1_teaser', BackwardsCompatibleContent(label="OneYou1 teaser", icon="folder-inverse")),
        ('video_teaser', VideoTemplate(icon="media")),
        ('image_teaser', ImageTeaserTemplate(icon="pick", label="Inspiration teaser")),
        ('promo_shelf', PromoShelfChooserBlock(target_model="shelves.PromoShelf", icon="image")),
        ('banner_shelf', BannerShelfChooserBlock(target_model="shelves.BannerShelf", icon="image")),
        ('app_teaser', AppTeaserChooserBlock(target_model="shelves.AppTeaser", icon="image")),
    ], icon='arrow-left', label='Items')
    shelf_id = blocks.CharBlock(required=False, label="ID")


class Grid(blocks.StructBlock):
    heading = blocks.CharBlock()
    rows_to_show = blocks.IntegerBlock(default=0)
    items = blocks.StreamBlock([
        ('oneyou1_teaser', BackwardsCompatibleContent(label="OneYou1 teaser", icon="folder-inverse")),
        ('video_teaser', VideoTemplate(icon="media")),
        ('image_teaser', ImageTeaserTemplate(icon="pick", label="Inspiration teaser")),
    ], icon='arrow-left', label='Items')
    shelf_id = blocks.CharBlock(required=False, label="ID")


# Pages

class OneYou2Page(Page):
    body = StreamField([
        ('page_heading_shelf', PageHeading(icon='title')),
        ('simple_page_heading_shelf', SimplePageHeading(icon='title')),
        ('section_heading_shelf', SectionHeading(classname="full title", icon='title')),
        ('carousel_shelf', Carousel(icon="repeat")),
        ('promo_shelf', PromoShelfChooserBlock(target_model="shelves.PromoShelf", icon="image")),
        ('banner_shelf', BannerShelfChooserBlock(target_model="shelves.BannerShelf", icon="image")),
        ('app_teaser', AppTeaserChooserBlock(target_model="shelves.AppTeaser", icon="image")),
        ('grid_shelf', Grid(icon="form")),
        ('oneyou1_teaser', BackwardsCompatibleContent(label="OneYou1 teaser", icon="folder-inverse")),
        ('video_teaser', VideoTemplate(icon="media")),
        ('image_teaser', ImageTeaserTemplate(icon="pick", label="Inspiration teaser")),
        ('find_out_more_dropdown', FindOutMoreDropDown(label="Link dropdown", icon="order-down")),
    ])
    page_ref = models.CharField(max_length=255, unique=True)
    release = models.ForeignKey(
        'release.Release',
        related_name='pages',
        blank=True,
        null=True,
        default=None,
        on_delete=models.SET_NULL)
    theme = models.ForeignKey(
        'pages.Theme',
        related_name='pages',
        null=True,
        on_delete=models.SET_NULL)

    @property
    def page_theme(self):
        return self.theme.to_dict()

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
        FieldPanel('release'),
        SnippetChooserPanel('theme'),
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

    api_fields = ['body', 'path', 'depth', 'numchild', 'page_ref', 'live', 'page_theme']

    def save(self, *args, **kwargs):
        if not self.page_ref or self.page_ref is None:
            self.page_ref = str(uuid.uuid4())

        assigned_release = self.release

        if self.release:
            self.release = None

        super(OneYou2Page, self).save(*args, **kwargs)

        if assigned_release:
            if self.live:
                assigned_release.add_revision(self.get_latest_revision())
            else:
                assigned_release.remove_page(self.id)

        return self

    def __init__(self, *args, **kwargs):
        super(OneYou2Page, self).__init__(*args, **kwargs)
        if not self.page_ref or self.page_ref is None:
            self.page_ref = str(uuid.uuid4())

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
        self.theme_id = obj_dict['page_theme']['id']
        return self

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
                   page_ref=obj_dict['page_ref'],
                   body=json.dumps(obj_dict['body']),
                   live=obj_dict['live'],
                   theme_id=obj_dict['page_theme']['id'])


# Orderables

class ChangeHistory(Orderable):
    page = ParentalKey(OneYou2Page, related_name='change_history')
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
