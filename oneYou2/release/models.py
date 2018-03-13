from __future__ import absolute_import, unicode_literals

import json
import uuid
from collections import OrderedDict

from datetime import datetime

from modelcluster.models import ClusterableModel

from django.db import models
from django.forms.models import model_to_dict
from django.utils import timezone
from wagtail.api.v2.endpoints import BaseAPIEndpoint
from wagtail.api.v2.serializers import PageSerializer

from wagtail.wagtailadmin.edit_handlers import FieldPanel, InlinePanel

from oneYou2.panels import ReadOnlyPanel
from .forms import ReleaseAdminForm

from frontendHandler.models import FrontendVersion

from pages.models import OneYou2Page

from rest_framework.viewsets import GenericViewSet


class DummyView(GenericViewSet):

    def __init__(self, *args, **kwargs):
        super(DummyView, self).__init__(*args, **kwargs)

        # seen_types is a mapping of type name strings (format: "app_label.ModelName")
        # to model classes. When an object is serialised in the API, its model
        # is added to this mapping. This is used by the Admin API which appends a
        # summary of the used types to the response.
        self.seen_types = OrderedDict()


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
    frontend_id = models.CharField(max_length=255)
    site = models.ForeignKey(
        'wagtailcore.Site',
        related_name='releases',
        blank=False,
        null=False,
        on_delete=models.CASCADE)

    base_form_class = ReleaseAdminForm

    panels = [
        FieldPanel('site', classname='site', ),
        FieldPanel('base_release', classname='base_release', ),
        FieldPanel('release_name', classname='release_name', ),
        ReadOnlyPanel('uuid', classname='uuid', ),
        FieldPanel('release_time', classname='release_time', ),
    ]

    def __init__(self, *args, **kwargs):
        super(Release, self).__init__(*args, **kwargs)

        if self.id and self.content.count() == 0:
            if self.is_released():
                rc = ReleaseContent(release=self)
                rc.save()
                pages = self.generate_fixed_content()
                rc.content = json.dumps(pages)
                rc.save()

        if not self.id:
            self.frontend_id = self.get_current_frontend_id()

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

    def get_serializer_class(self):
        class Meta:
            model = OneYou2Page
            fields = ['id', 'title', 'body', 'path', 'depth', 'numchild', 'page_ref', 'live', 'page_theme', 'type',
                      'detail_url', 'html_url', 'slug', 'show_in_menus', 'seo_title', 'search_description',
                      'first_published_at', 'parent']

        attrs = {
            'Meta': Meta,
            'meta_fields': ['type', 'detail_url', 'html_url', 'slug', 'show_in_menus', 'seo_title',
                            'search_description',
                            'first_published_at', 'parent'],
            'child_serializer_classes': {},
        }

        return type("OneYou2PageSerializer", (PageSerializer,), attrs)

    def generate_fixed_content(self):
        from oneYou2.api import api_router
        pages = {}

        for revision in self.revisions.all():
            class Request(object):
                def __init__(self):
                    self.site = revision.revision.page.get_site()

            page_obj = revision.revision.as_page_object()
            serializer = self.get_serializer_class()
            response = serializer(page_obj,
                                  context={'request': Request(), 'view': DummyView(), 'router': api_router})
            pages[str(revision.revision.page_id)] = response.data


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

    def get_current_frontend_id(self):
        return FrontendVersion.get_current_version()



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
            page_content = content_dict[key]
        except KeyError:
            page_content = None
        return page_content
