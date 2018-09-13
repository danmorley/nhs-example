from __future__ import absolute_import, unicode_literals

from django.db import models

from wagtail.admin.edit_handlers import FieldPanel
from wagtail.core.models import Page
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.contrib.settings.models import BaseSetting, register_setting


class HomePage(Page):
    pass


@register_setting
class SiteSettings(BaseSetting):
    title = models.CharField(max_length=255)
    uid = models.SlugField(unique=True, verbose_name="Site name", help_text="An id which can be used to lookup the site"
                                                                            " in the API")
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
        FieldPanel('uid'),
        SnippetChooserPanel('menu'),
        SnippetChooserPanel('footer'),
        SnippetChooserPanel('header'),
    ]
