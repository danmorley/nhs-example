from __future__ import absolute_import, unicode_literals

from django import forms
from django.core.exceptions import ValidationError
from django.db import models

from wagtail.admin.edit_handlers import FieldPanel, MultiFieldPanel
from wagtail.contrib.settings.models import BaseSetting, register_setting
from wagtail.core.models import Page
from wagtail.snippets.edit_handlers import SnippetChooserPanel


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

    google_site_verification_id = models.CharField(max_length=80, null=True, blank=True,)
    global_google_tag_manager_id = models.CharField(max_length=50, null=True, blank=True,)
    google_tag_manager_id = models.CharField(max_length=50, null=True, blank=True,)
    cookiebot_id = models.CharField(max_length=80, null=True, blank=True,)
    adobe_tracking_url = models.URLField(max_length=255, null=True, blank=True,)

    general_panels = [
        FieldPanel('title'),
        FieldPanel('uid'),
    ]

    configuration_panels = [
        FieldPanel('google_site_verification_id'),
        FieldPanel('global_google_tag_manager_id'),
        FieldPanel('google_tag_manager_id'),
        FieldPanel('cookiebot_id'),
        FieldPanel('adobe_tracking_url'),
    ]

    structure_panels = [
        SnippetChooserPanel('menu'),
        SnippetChooserPanel('footer'),
        SnippetChooserPanel('header'),
    ]

    panels = [
        MultiFieldPanel(general_panels, 'General', classname="collapsible"),
    ]