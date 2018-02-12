from __future__ import absolute_import, unicode_literals

from django.db import models
from django.forms.models import model_to_dict

from wagtail.wagtailadmin.edit_handlers import FieldPanel, InlinePanel

from modelcluster.models import ClusterableModel
from datetime import datetime
import uuid

from .forms import ReleaseAdminForm

def query_set_to_dict(querySet):
  queryDict = []
  for modelObject in querySet:
    modelDict = modelObject.dict()
    queryDict.append(modelDict)
  return queryDict

def obj_to_dict(obj):
  modelDict = model_to_dict(obj)
  for key, value in list(modelDict.items()):
    if value is None:
      del modelDict[key]
    elif type(value) == datetime:
      modelDict[key] = value.timestamp()
  return modelDict  

class Release(ClusterableModel):
  release_name = models.CharField(max_length=255, unique=True)
  release_time = models.DateTimeField(blank=True, null=True)
  uuid = models.CharField(max_length=255, unique=True)

  base_form_class = ReleaseAdminForm

  panels = [
    FieldPanel('release_name', classname='release_name',),
    FieldPanel('release_time', classname='release_time',),
  ]

  def save(self, *args, **kwargs):
    if not self.uuid or self.uuid is None:
      self.uuid = str(uuid.uuid4())

    return super(Release, self).save(*args, **kwargs)

  def dict(self):
    self_dict = obj_to_dict(self)
    self_dict['pages'] = []
    for page in self.pages.all():
      self_dict['pages'].append(page.id)
    return self_dict
