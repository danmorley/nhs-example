from django.db import models
from django.forms.models import model_to_dict

from wagtail.admin.edit_handlers import FieldPanel, MultiFieldPanel, StreamFieldPanel
from wagtail.core import blocks
from wagtail.core.fields import StreamField
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.models import register_snippet
from wagtailsnippetscopy.models import SnippetCopyMixin

from .blocks import IDBlock, ItemPageBlock


class SimpleMenuItem(blocks.StructBlock):
    link_text = blocks.CharBlock(required=False)
    link_external = blocks.CharBlock(label='External link', required=False)
    link_page = ItemPageBlock(required=False)
    link_id = IDBlock(required=False, label='ID', classname='dct-meta-field', help_text='Uniquely identify the CTA. Often used for tracking')

    class Meta:
        icon = 'link'
        form_classname = 'dct-simple-menu-item dct-meta-panel'


class MultiMenuItem(blocks.StructBlock):
    label = blocks.CharBlock(required=False)
    menu_items = blocks.StreamBlock([
        ('simple_menu_item', SimpleMenuItem())
    ], icon='arrow-left', label='Items')


class SocialMediaFooterLink(blocks.StructBlock):
    choices = (
        ('twitter', 'Twitter'),
        ('facebook', 'Facebook'),
    )
    label = blocks.CharBlock(required=False)
    type = blocks.ChoiceBlock(choices=choices)
    link = blocks.URLBlock(label='External link', required=False)


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

    heading = models.CharField(max_length=255, null=True, blank=True,)
    show_sitemap = models.BooleanField(default=True)
    number_per_column = models.IntegerField(null=True, blank=True, default=4, help_text='Number of menu items per column')

    menu_items = StreamField([
        ('simple_menu_item', SimpleMenuItem()),
    ])

    follow_us = StreamField([
        ('social_media_link', SocialMediaFooterLink()),
    ], null=True, blank=True,)

    panels = [
        MultiFieldPanel(
            [
                FieldPanel('label'),
                FieldPanel('heading'),
                FieldPanel('show_sitemap'),
                FieldPanel('number_per_column'),
                ImageChooserPanel('image'),
            ],
            heading='General',),
        StreamFieldPanel('menu_items'),
        StreamFieldPanel('follow_us'),
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