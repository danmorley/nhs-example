from __future__ import absolute_import, unicode_literals

import json
import uuid

from datetime import datetime

from modelcluster.models import ClusterableModel

from django.db import models
from django.forms.models import model_to_dict
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ValidationError

from wagtail.admin.edit_handlers import FieldPanel

from oneYou2.panels import ReadOnlyPanel

from frontendHandler.models import FrontendVersion

from pages.models import RecipePage

CONTENT_STATUS = (
    (0, "PENDING"),
    (1, "FROZEN"),
)


def validate_in_future(date_time):
    if date_time < timezone.localtime(timezone.now(), timezone.get_current_timezone()):
        raise ValidationError(_('Release date has already passed. Please choose one in the future.'))


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
    release_time = models.DateTimeField(blank=True, null=True, validators=[validate_in_future])
    uuid = models.CharField(max_length=255, unique=True)
    frontend_id = models.CharField(max_length=255, choices=FrontendVersion.get_available_versions(),
                                   default=FrontendVersion.get_current_version())
    content_status = models.IntegerField(choices=CONTENT_STATUS)
    site = models.ForeignKey(
        'wagtailcore.Site',
        related_name='releases',
        blank=False,
        null=False,
        on_delete=models.CASCADE)

    panels = [
        FieldPanel('site', classname='site', ),
        FieldPanel('base_release', classname='base_release', ),
        FieldPanel('release_name', classname='release_name', ),
        ReadOnlyPanel('uuid', classname='uuid', ),
        ReadOnlyPanel('content_status', classname='release_status'),
        FieldPanel('frontend_id', classname='frontend_id'),
        FieldPanel('release_time', classname='release_time', ),
    ]

    def __init__(self, *args, **kwargs):
        super(Release, self).__init__(*args, **kwargs)

        if not self.id:
            self.frontend_id = self.get_current_frontend_id()
            self.content_status = 0

    def save(self, *args, **kwargs):
        is_new_entry = self.id is None

        if not self.uuid or self.uuid is None:
            self.uuid = str(uuid.uuid4())

        super(Release, self).save(*args, **kwargs)

        if is_new_entry:
            content = {}
            if self.base_release:
                content = json.loads(self.base_release.content.first().content)
            else:
                from home.models import SiteSettings
                from django.apps import apps
                try:
                    site = SiteSettings.objects.get(site=self.site)
                    for page_type in site.page_types.all():
                        PageModel = apps.get_model(app_label=page_type.app, model_name=page_type.label)
                        live_pages = PageModel.objects.live()
                        for page in live_pages:
                            content[str(page.id)] = Release.generate_fixed_content(page.get_latest_revision())
                except SiteSettings.DoesNotExist:
                    pass
            ReleaseContent(release=self, content=json.dumps(content)).save()
        return self

    def dict(self):
        self_dict = obj_to_dict(self)
        attr = self.__class__.__dict__.keys()
        page_attributes = [key for key in attr if key.endswith('_pages')]
        for page_attr in page_attributes:
            self_dict[page_attr] = []
            for page in getattr(self, page_attr).all():
                self_dict[page_attr].append(page.id)
        return self_dict

    def __str__(self):
        return self.release_name

    def release_date_has_passed(self):
        return (self.release_time is not None) and\
               self.release_time < timezone.localtime(timezone.now(), timezone.get_current_timezone())

    def add_revision(self, new_revision):
        release_content = self.content.first()
        content = json.loads(release_content.content)
        content[str(new_revision.page_id)] = Release.generate_fixed_content(new_revision)
        release_content.content = json.dumps(content)
        release_content.save()
        try:
            ReleasePage.objects.get(release=self, revision__page=new_revision.page_id).delete()
        except ReleasePage.DoesNotExist:
            pass
        ReleasePage(release=self, revision=new_revision).save()

    def remove_page(self, page_id):
        release_content = self.content.first()
        content = json.loads(release_content.content)
        if str(page_id) in content:
            del content[str(page_id)]
        release_content.content = json.dumps(content)
        release_content.save()
        try:
            ReleasePage.objects.get(release=self, revision__page=page_id).delete()
        except ReleasePage.DoesNotExist:
            pass

    @classmethod
    def generate_fixed_content(cls, revision):
        from pages.serializers import GeneralShelvePageSerializer, RecipePageSerializer
        page = revision.as_page_object()
        if isinstance(page, RecipePage):
            return RecipePageSerializer(page).data
        return GeneralShelvePageSerializer(page).data

    def generate_fixed_site_meta(self):
        from oneYou2.serializers import SiteSerializer
        from home.models import SiteSettings
        site = SiteSettings.objects.get(site=self.site)
        setattr(site, 'release_uuid', self.uuid)
        return SiteSerializer(site).data

    def get_content_for(self, key):
        content = ReleaseContent.objects.get(release=self)
        return content.get_content_for(str(key))

    def get_current_frontend_id(self):
        return FrontendVersion.get_current_version()


class ReleasePage(models.Model):
    # TODO: I'm guessing these related names are the wrong way round
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
    
    def get_page_detail_dict(self, status=None):
        return {
            'id': self.revision.page.id,
            'title': self.revision.page.title,
            'slug': self.revision.page.slug,
            'created_at': self.revision.created_at,
            'revision_user': self.revision.user,
            'status': status,
        }


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
        return content_dict[key]
