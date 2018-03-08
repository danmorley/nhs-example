from __future__ import absolute_import, unicode_literals

import json
import uuid

from datetime import datetime
from modelcluster.models import ClusterableModel

from django.db import models
from django.forms.models import model_to_dict
from django.utils import timezone

from wagtail.wagtailadmin.edit_handlers import FieldPanel, InlinePanel

from .forms import ReleaseAdminForm

from pages.models import OneYou2Page


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
  base_release = models.ForeignKey(
    'release.Release',
    related_name='base',
    blank=True,
    null=True,
    on_delete=models.SET_NULL)
  release_name = models.CharField(max_length=255, unique=True)
  release_time = models.DateTimeField(blank=True, null=True)
  uuid = models.CharField(max_length=255, unique=True)

  base_form_class = ReleaseAdminForm

  panels = [
    FieldPanel('base_release', classname='base_release', ),
    FieldPanel('release_name', classname='release_name',),
    FieldPanel('release_time', classname='release_time',),
  ]

  def __init__(self, *args, **kwargs):
    super(Release, self).__init__(*args, **kwargs)
    if self.id and self.content.count() == 0:
      if self.is_released():

        ReleaseContent(release=self, content=json.dumps(self.generate_fixed_content())).save()


  def save(self, *args, **kwargs):
    is_new_entry = self.id is None

    if not self.uuid or self.uuid is None:
      self.uuid = str(uuid.uuid4())

    super(Release, self).save(*args, **kwargs)

    if is_new_entry:
      if self.base_release:
        for page in self.base_release.revisions.all():
          relation = ReleasePage(release=self, revision=page.revision)
          relation.save()
      else:
        live_pages = OneYou2Page.objects.live()
        for page in live_pages:
          relation = ReleasePage(release=self, revision=page.get_latest_revision())
          relation.save()

    return self

  def dict(self):
    self_dict = obj_to_dict(self)
    self_dict['pages'] = []
    for page in self.pages.all():
      self_dict['pages'].append(page.id)
    return self_dict

  def __str__(self):
    return self.release_name

  def is_released(self):
    return (self.release_time is not None) and self.release_time < timezone.now()

  def add_revision(self, new_revision):
    for revision in self.revisions.all():
      if revision.revision.page_id == new_revision.page_id:
        revision.delete()
    relation = ReleasePage(release=self, revision=new_revision)
    relation.save()

  def remove_page(self, page_id):
    for revision in self.revisions.all():
      if revision.revision.page_id == page_id:
        revision.delete()

  def generate_fixed_content(self):
    pages = {}

    for revision in self.revisions.all():
      pages[str(revision.revision.page_id)] = revision.revision.content_json

    return pages

  def get_content_for(self, key):
    page_content = None
    if self.is_released():
      page_content = self.content.first().get_content_for(str(key))
    else:
      for revision in self.revisions.all():
        if revision.revision.page_id == key:
          page_content = json.loads(revision.revision.content_json)
    return page_content


class ReleasePage(models.Model):
  release = models.ForeignKey(
    'release.Release',
    related_name='revisions',
    blank=False,
    null=False,
    on_delete=models.CASCADE)
  revision = models.ForeignKey(
    'wagtailcore.PageRevision',
    related_name='release',
    blank=False,
    null=False,
    on_delete=models.CASCADE)


class ReleaseContent(models.Model):
  release = models.ForeignKey(
    'release.Release',
    related_name='content',
    blank=False,
    null=False,
    on_delete=models.CASCADE)
  content = models.TextField(null=True)

  def get_content_for(self, key):
    content_dict = json.loads(self.content)
    try:
      page_content = json.loads(content_dict[key])
    except KeyError:
      page_content = None
    return page_content


