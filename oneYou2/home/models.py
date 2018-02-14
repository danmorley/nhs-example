from __future__ import absolute_import, unicode_literals

from django.db import models

from wagtail.wagtailadmin.edit_handlers import FieldPanel
from wagtail.wagtailcore.models import Page
from wagtail.wagtailsnippets.edit_handlers import SnippetChooserPanel
from wagtail.contrib.settings.models import BaseSetting, register_setting


class HomePage(Page):
    pass


@register_setting
class SiteSettings(BaseSetting):
    title = models.CharField(max_length=255)
    menu = models.ForeignKey(
        'pages.Menu',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    footer = models.ForeignKey(
        'pages.footer',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    header = models.ForeignKey(
        'pages.header',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    content_panels = Page.content_panels + [
        FieldPanel('title'),
        SnippetChooserPanel('menu'),
        SnippetChooserPanel('footer'),
        SnippetChooserPanel('header'),
    ]
