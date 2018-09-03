import json

from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.forms.models import model_to_dict
from django.utils import timezone
from django.utils.functional import cached_property
from django.utils.translation import ugettext_lazy as _
from modelcluster.fields import ParentalKey

from wagtail.admin.edit_handlers import FieldPanel, PageChooserPanel
from wagtail.core.fields import RichTextField
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.models import register_snippet
from modelcluster.models import get_serializable_data_for_fields


def get_default_shelf_content_type():
    """
    Returns the content type to use as a default for shelves whose content type
    has been deleted.
    """
    return ContentType.objects.get_for_model(ShelfAbstract)


class ShelfAbstract(models.Model):
    live_revision = models.ForeignKey('ShelfRevision',
                                      related_name='+',
                                      verbose_name='live revision',
                                      on_delete=models.SET_NULL,
                                      null=True,
                                      blank=True,
                                      editable=False)

    shelf_id = models.CharField(max_length=255,
                                blank=True,
                                null=True,
                                verbose_name="ID")

    content_type = models.ForeignKey(
        'contenttypes.ContentType',
        verbose_name=_('content type'),
        related_name='shelves',
        on_delete=models.SET(get_default_shelf_content_type),
        editable=False)

    is_creatable = False

    content_panels = []
    promote_panels = []
    settings_panels = []

    def __init__(self, *args, **kwargs):
        super(ShelfAbstract, self).__init__(*args, **kwargs)
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
        if 'shelfabstract_ptr' in obj_dict:
            del obj_dict['shelfabstract_ptr']
            obj_dict['shelfabstract_ptr_id'] = self.shelfabstract_ptr.id
        return obj_dict

    @classmethod
    def from_dict(cls, obj_dict):
        if isinstance(obj_dict, str):
            obj_dict = json.loads(obj_dict.replace("'", "\""))
        newObj = cls()
        for key in obj_dict:
            newObj.__setattr__(key, obj_dict[key])
        return newObj

    def save(self, *args, **kwargs):
        self.live_revision = None
        super(ShelfAbstract, self).save(*args, **kwargs)
        revision = ShelfRevision(shelf_id=self.id, content_json=self.to_dict())
        revision.save()
        self.live_revision = revision
        super(ShelfAbstract, self).save()

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


class ShelfRevision(models.Model):
    shelf = models.ForeignKey('ShelfAbstract', verbose_name=_('shelf'), related_name='revisions',
                              on_delete=models.CASCADE)
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
            self.created_at = timezone.localtime(timezone.now(), timezone.get_current_timezone())

        super(ShelfRevision, self).save(*args, **kwargs)

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

    def as_shelf_object(self):
        return self.shelf.specific_class.from_dict(self.content_json)

    def publish(self):
        shelf = self.as_shelf_object()
        shelf.save()

    def __str__(self):
        return '"' + str(self.shelf) + '" at ' + str(self.created_at)

    class Meta:
        verbose_name = _('shelf revision')
        verbose_name_plural = _('shelf revisions')


@register_snippet
class PromoShelf(ShelfAbstract):
    heading = models.CharField(max_length=255, null=True, blank=True)
    cta_text = models.CharField(max_length=255, null=True, blank=True)
    cta_link = models.CharField(max_length=255, null=True, blank=True)
    cta_page = ParentalKey('wagtailcore.Page',
                           on_delete=models.SET_NULL,
                           related_name='promo_shelf_links',
                           null=True,
                           blank=True)

    panels = ShelfAbstract.content_panels + [
        FieldPanel('shelf_id'),
        FieldPanel('heading', classname='heading', ),
        FieldPanel('cta_text', classname='button_text', ),
        FieldPanel('cta_link', classname='button_link', ),
        PageChooserPanel('cta_page'),
    ]

    @property
    def meta_layout(self):
        return "cta_on_right"

    @property
    def meta_variant(self):
        return "how-are-you"


@register_snippet
class BannerShelf(ShelfAbstract):
    heading = models.CharField(max_length=255, null=True, blank=True)
    body = RichTextField(blank=True, null=True)
    background_image = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    meta_gradient = models.BooleanField(default=False, verbose_name="Green gradient")
    cta_text = models.CharField(max_length=255, null=True, blank=True)
    cta_link = models.CharField(max_length=255, null=True, blank=True)
    cta_page = ParentalKey('wagtailcore.Page',
                           on_delete=models.SET_NULL,
                           related_name='banner_shelf_links',
                           null=True,
                           blank=True)

    @property
    def meta_layout(self):
        return "full_width"

    @property
    def meta_variant(self):
        return "main-banner"

    api_fields = ['heading', 'body', 'image', 'cta_text', 'cta_link', 'cta_page', 'meta_gradient']

    panels = [
        FieldPanel('shelf_id'),
        FieldPanel('heading'),
        FieldPanel('body'),
        ImageChooserPanel('background_image'),
        FieldPanel('meta_gradient'),
        FieldPanel('cta_text'),
        FieldPanel('cta_link'),
        PageChooserPanel('cta_page'),
    ]


@register_snippet
class AppTeaser(ShelfAbstract):
    heading = models.CharField(max_length=255, null=True, blank=True)
    body = RichTextField(blank=True, null=True)
    image = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    cta_text = models.CharField(max_length=255, null=True, blank=True)
    cta_link = models.CharField(max_length=255, null=True, blank=True)
    cta_page = ParentalKey('wagtailcore.Page',
                           on_delete=models.SET_NULL,
                           related_name='app_teaser_links',
                           null=True,
                           blank=True)
    cta_googleplay = models.CharField(max_length=255, null=True, blank=True)
    cta_appstore = models.CharField(max_length=255, null=True, blank=True)

    panels = [
        FieldPanel('shelf_id'),
        FieldPanel('heading'),
        FieldPanel('body'),
        ImageChooserPanel('image'),
        FieldPanel('cta_text'),
        FieldPanel('cta_link'),
        PageChooserPanel('cta_page'),
        FieldPanel('cta_googleplay'),
        FieldPanel('cta_appstore'),
    ]


@register_snippet
class ActionPanel(ShelfAbstract):
    action_code = models.CharField(max_length=255, null=False, blank=False, unique=True)
    title = models.CharField(max_length=255, null=False, blank=False)
    rich_text_body = RichTextField(blank=True, null=True)
    cta = models.CharField(max_length=255, null=True, blank=True)
    cta_googleplay = models.CharField(max_length=255, null=True, blank=True)
    cta_appstore = models.CharField(max_length=255, null=True, blank=True)

    panels = [
        FieldPanel('shelf_id'),
        FieldPanel('action_code'),
        FieldPanel('title'),
        FieldPanel('rich_text_body'),
        FieldPanel('cta'),
        FieldPanel('cta_googleplay'),
        FieldPanel('cta_appstore'),
    ]

    def __str__(self):
        return self.title


@register_snippet
class RecipeTeaser(ShelfAbstract):
    heading = models.CharField(max_length=255, null=True, blank=True)
    background_image = models.ForeignKey(
        'images.PHEImage',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    page_link = ParentalKey('wagtailcore.Page',
                            on_delete=models.SET_NULL,
                            related_name='recipe_teaser_links',
                            null=True,
                            blank=True)

    panels = [
        FieldPanel('shelf_id'),
        FieldPanel('heading'),
        ImageChooserPanel('background_image'),
        PageChooserPanel('page_link'),
    ]
