from __future__ import absolute_import, unicode_literals

from django.db import models

from wagtail.wagtailcore.models import Page


class HomePage(Page):
  pass

class Release(models.Model):
  release_name = models.CharField(max_length=255, unique=True)
  release_time = models.DateTimeField(blank=True, null=True)
  
