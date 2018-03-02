from __future__ import absolute_import, unicode_literals

from django.db import models
from django.forms.models import model_to_dict
from django.utils import timezone

from wagtail.wagtailadmin.edit_handlers import FieldPanel, InlinePanel

from modelcluster.models import ClusterableModel
from datetime import datetime
import uuid

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
  release_name = models.CharField(max_length=255, unique=True)
  release_time = models.DateTimeField(blank=True, null=True)
  uuid = models.CharField(max_length=255, unique=True)
  content = models.TextField(null=True)

  base_form_class = ReleaseAdminForm

  panels = [
    FieldPanel('release_name', classname='release_name',),
    FieldPanel('release_time', classname='release_time',),
  ]

  def __init__(self, *args, **kwargs):
    super(Release, self).__init__(*args, **kwargs)
    if not self.id is None:
      if (self.release_time is not None) and self.release_time < timezone.now():
        pages = []

        for revision in self.revisions.all():
          pages.append(revision.revision.content_json)

        self.content = str(pages)

        self.save()


  def save(self, *args, **kwargs):
    is_new_entry = self.id is None

    if not self.uuid or self.uuid is None:
      self.uuid = str(uuid.uuid4())

    super(Release, self).save(*args, **kwargs)

    if is_new_entry:
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
