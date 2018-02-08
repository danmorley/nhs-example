from __future__ import absolute_import, unicode_literals

from django.db import models
from django.forms.models import model_to_dict

from wagtail.wagtailadmin.edit_handlers import FieldPanel, InlinePanel

from modelcluster.models import ClusterableModel
from datetime import datetime

# from pages.models import OneYou2Page

import uuid

def to_dict(querySet):
  queryDict = []
  for modelObject in querySet:
    modelDict = model_to_dict(modelObject)
    for key, value in list(modelDict.items()):
      if value is None:
        del modelDict[key]
      elif type(value) == datetime:
        modelDict[key] = value.timestamp()
    queryDict.append(modelDict)
  return queryDict


class Release(ClusterableModel):
  release_name = models.CharField(max_length=255, unique=True)
  release_time = models.DateTimeField(blank=True, null=True)
  uuid = models.CharField(max_length=255, unique=True)
  # need to set up links to pages once I have the page object

  panels = [
    FieldPanel('release_name', classname='release_name',),
    FieldPanel('release_time', classname='release_time',),
    InlinePanel('pages', [FieldPanel('title')], label='Pages',),
  ]

  def save(self, *args, **kwargs):
    if self.uuid == None:
      self.uuid = str(uuid.uuid4())

    return super(Release, self).save(*args, **kwargs)
