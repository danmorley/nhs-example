import json

from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.forms.models import model_to_dict
from django.utils import timezone
from django.utils.functional import cached_property

from wagtail.admin.edit_handlers import FieldPanel, PageChooserPanel
from wagtail.core.fields import RichTextField
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.models import register_snippet

from modelcluster.fields import ParentalKey
from modelcluster.models import get_serializable_data_for_fields


def get_default_shelf_content_type():
    """
    Returns the content type to use as a default for shelves whose content type
    has been deleted.
    """
    return ContentType.objects.get_for_model(SharedContent)


class SharedContent(models.Model):
    live_revision = models.ForeignKey('SharedContentRevision',
                                      related_name='+',
                                      verbose_name='live revision',
                                      on_delete=models.SET_NULL,
                                      null=True,
                                      blank=True,
                                      editable=False)

    shelf_id = models.CharField(max_length=255,
                                blank=True,
                                null=True,
                                verbose_name='ID')

    content_type = models.ForeignKey(
        'contenttypes.ContentType',
        verbose_name='content type',
        related_name='shared_content',
        on_delete=models.SET(get_default_shelf_content_type),
        editable=False)

    is_creatable = False
    tracking_group = models.CharField(null=True, blank=True, max_length=20, help_text='The tracking group, eg. EMM or OY')

    content_panels = []
    promote_panels = []
    settings_panels = []

    class meta:
        abstract = True

    def __init__(self, *args, **kwargs):
        super(SharedContent, self).__init__(*args, **kwargs)
        if not self.id:
            # this model is being newly created
            # rather than retrieved from the db;
            if not self.content_type_id:
                # set content type to correctly represent the model class
                # that this was created as
                self.content_type = ContentType.objects.get_for_model(self)

    def __str__(self):
        if self.shelf_id:
            return self.shelf_id
        else:
            return str(self.id)

    def to_dict(self):
        obj_dict = model_to_dict(self)
        if 'content_type' in obj_dict:
            del obj_dict['content_type']
        obj_dict['content_type_id'] = self.content_type.id
        if 'sharedcontent_ptr' in obj_dict:
            del obj_dict['sharedcontent_ptr']
            obj_dict['sharedcontent_ptr_id'] = self.sharedcontent_ptr.id
        return obj_dict

    @classmethod
    def from_dict(cls, obj_dict):
        if isinstance(obj_dict, str):
            s = obj_dict.replace('\'', '"').replace('None', 'null')
            obj_dict = json.loads(s)
        newObj = cls()
        for key in obj_dict:
            newObj.__setattr__(key, obj_dict[key])
        return newObj

    def save(self, *args, **kwargs):
        self.live_revision = None
        super(SharedContent, self).save(*args, **kwargs)
        revision = SharedContentRevision(shelf_id=self.id, content_json=self.to_dict())
        revision.save()
        self.live_revision = revision
        super(SharedContent, self).save()

    @cached_property
    def specific(self):
        """
        Return this shelf in its most specific subclassed form.
        """
        # the ContentType.objects manager keeps a cache, so this should potentially
        # avoid a database lookup over doing self.content_type. I think.
        content_type = ContentType.objects.get_for_id(self.content_type_id)
        model_class = content_type.model_class()
        if model_class is None:
            # Cannot locate a model class for this content type. This might happen
            # if the codebase and database are out of sync (e.g. the model exists
            # on a different git branch and we haven't rolled back migrations before
            # switching branches); if so, the best we can do is return the shelf
            # unchanged.
            return self
        elif isinstance(self, model_class):
            # self is already an instance of the most specific class
            return self
        else:
            return content_type.get_object_for_this_type(id=self.id)

    @cached_property
    def specific_class(self):
        """
        Return the class that this page would be if instantiated in its
        most specific form
        """
        content_type = ContentType.objects.get_for_id(self.content_type_id)
        return content_type.model_class()

    def serializable_data(self):
        return get_serializable_data_for_fields(self)


class SharedContentRevision(models.Model):
    shelf = models.ForeignKey('SharedContent', verbose_name='shelf', related_name='revisions',
                              on_delete=models.CASCADE)
    created_at = models.DateTimeField(db_index=True, verbose_name='created at')
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, verbose_name='user', null=True, blank=True,
        on_delete=models.SET_NULL
    )
    content_json = models.TextField(verbose_name='content JSON')

    def save(self, *args, **kwargs):
        # Set default value for created_at to now
        # We cannot use auto_now_add as that will override
        # any value that is set before saving
        if self.created_at is None:
            self.created_at = timezone.localtime(timezone.now(), timezone.get_current_timezone())

        super(SharedContentRevision, self).save(*args, **kwargs)

    def is_latest_revision(self):
        if self.id is None:
            # special case: a revision without an ID is presumed to be newly-created and is thus
            # newer than any revision that might exist in the database
            return True
        latest_revision = SharedContentRevision.objects.filter(shelf_id=self.shelf_id).order_by('-created_at', '-id').first()
        return (latest_revision == self)

    def get_previous(self):
        return self.get_previous_by_created_at(shelf=self.shelf)

    def get_next(self):
        return self.get_next_by_created_at(shelf=self.shelf)

    def as_shelf_object(self):
        return self.shelf.specific_class.from_dict(self.content_json)

    def publish(self):
        shelf = self.as_shelf_object()
        shelf.save()

    def __str__(self):
        return '"' + str(self.shelf) + '" at ' + str(self.created_at)