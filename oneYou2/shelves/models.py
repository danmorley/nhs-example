from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.forms.models import model_to_dict
from django.utils import timezone
from django.utils.functional import cached_property
from django.utils.translation import ugettext_lazy as _

from wagtail.wagtailadmin.edit_handlers import FieldPanel


def get_default_shelf_content_type():
  """
  Returns the content type to use as a default for shelves whose content type
  has been deleted.
  """
  return ContentType.objects.get_for_model(ShelfAbstract)


class ShelfAbstract(models.Model):
  label = models.CharField(max_length=255,
    help_text=_("A name to use in the CMS"))

  live_revision = models.ForeignKey('ShelfRevision',
    related_name='+',
    verbose_name='live revision',
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    editable=False)

  content_type = models.ForeignKey(
    'contenttypes.ContentType',
    verbose_name=_('content type'),
    related_name='shelves',
    on_delete=models.SET(get_default_shelf_content_type)
  )

  is_creatable = False

  content_panels = []
  promote_panels = []
  settings_panels = []


  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    if not self.id:
      # this model is being newly created
      # rather than retrieved from the db;
      if not self.content_type_id:
        # set content type to correctly represent the model class
        # that this was created as
        self.content_type = ContentType.objects.get_for_model(self)


  def __str__(self):
    return self.label


  def to_dict(self):
    return model_to_dict(self)


  def save(self, *args, **kwargs):
    super().save(*args, **kwargs)
    revision = ShelfRevision(shelf_id = self.id, content_json = self.to_dict())
    revision.save()
    self.live_revision = revision
    super().save()


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


class ShelfRevision(models.Model):
  shelf = models.ForeignKey('ShelfAbstract', verbose_name=_('shelf'), related_name='revisions', on_delete=models.CASCADE)
  created_at = models.DateTimeField(db_index=True, verbose_name=_('created at'))
  user = models.ForeignKey(
    settings.AUTH_USER_MODEL, verbose_name=_('user'), null=True, blank=True,
    on_delete=models.SET_NULL
  )
  content_json = models.TextField(verbose_name=_('content JSON'))

  def save(self, *args, **kwargs):
    # Set default value for created_at to now
    # We cannot use auto_now_add as that will override
    # any value that is set before saving
    if self.created_at is None:
      self.created_at = timezone.now()

    super().save(*args, **kwargs)

  def is_latest_revision(self):
    if self.id is None:
      # special case: a revision without an ID is presumed to be newly-created and is thus
      # newer than any revision that might exist in the database
      return True
    latest_revision = ShelfRevision.objects.filter(shelf_id=self.shelf_id).order_by('-created_at', '-id').first()
    return (latest_revision == self)

  def get_previous(self):
    return self.get_previous_by_created_at(shelf=self.shelf)

  def get_next(self):
    return self.get_next_by_created_at(shelf=self.shelf)

  def __str__(self):
    return '"' + str(self.shelf) + '" at ' + str(self.created_at)

  class Meta:
    verbose_name = _('shelf revision')
    verbose_name_plural = _('shelf revisions')


class PromoShelf(ShelfAbstract):
  heading = models.CharField(max_length=255)

  content_panels = ShelfAbstract.content_panels + [
    FieldPanel('heading', classname='heading',),
  ]

