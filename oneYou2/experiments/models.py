import json

from django.db import models
from django.db.models import Q
from django.db.models.signals import pre_delete, post_save
from django.dispatch import receiver
from django.forms import CheckboxSelectMultiple
from django.utils import timezone
from django.utils.html import format_html

from modelcluster.models import ClusterableModel

from wagtail.admin.edit_handlers import FieldPanel

from pages.models import OneYou2Page, RecipePage

from release.models import Release

ONEYOU_VARIANT_TYPE = 50
RECIPE_VARIANT_TYPE = 52


class Experiment(ClusterableModel):
    STATUS_CHOICES = [
        ('draft', "Draft"),
        ('live', "Live"),
        ('completed', "Completed"),
    ]

    name = models.CharField(max_length=255)
    variants = models.ManyToManyField('wagtailcore.Page',
                                      blank=True,
                                      limit_choices_to=Q(content_type_id=ONEYOU_VARIANT_TYPE) |
                                      Q(content_type_id=RECIPE_VARIANT_TYPE))
    start_date = models.DateTimeField(blank=True, null=True)
    end_date = models.DateTimeField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    panels = [
        FieldPanel('name'),
        FieldPanel('description'),
        FieldPanel('start_date'),
        FieldPanel('end_date'),
        FieldPanel('variants', widget=CheckboxSelectMultiple)
    ]


class OneYouVariant(OneYou2Page):

    @classmethod
    def allowed_parent_page_models(cls):
        """
        Returns the list of page types that this page type can be a subpage of,
        as a list of model classes
        """
        return [
            OneYou2Page
        ]

    @classmethod
    def from_page(cls, page):
        return cls(
            page.x
        )

    @property
    def part_of_experiments(self):
        appears_in = self.experiment_set.all().values_list('name', flat=True).distinct()
        return ",".join(appears_in)

    @property
    def live_experiments(self):
        now = timezone.now()
        appears_in = self.experiment_set.filter(start_date__lte=now,
                                                end_date__gte=now
                                                ).values_list('name', flat=True).distinct()
        return ",".join(appears_in)

    @property
    def is_live(self):
        now = timezone.now()
        if self.experiment_set.filter(start_date__lte=now, end_date__gte=now).count():
            return True
        else:
            return False

    def html_parent_page_title(self):
        return format_html(
            '<a href="/admin/pages/{}/edit/">{}</span>',
            self.get_parent().id,
            self.get_parent().title
        )

    html_parent_page_title.short_description = 'Parent'

    def html_clickable_variant_link(self):
        if self.is_live:
            return format_html(
                '<a href="/oneyou{}">{}</span>',
                self.url,
                self.url
            )
        else:
            return self.url

    html_clickable_variant_link.short_description = 'URL'


class RecipeVariant(RecipePage):

    @classmethod
    def from_page(cls, page):
        return cls(
            page.x
        )

    @property
    def part_of_experiments(self):
        appears_in = self.experiment_set.all().values_list('name', flat=True).distinct()
        return ",".join(appears_in)

    @property
    def live_experiments(self):
        now = timezone.now()
        appears_in = self.experiment_set.filter(start_date__lte=now,
                                                end_date__gte=now
                                                ).values_list('name', flat=True).distinct()
        return ",".join(appears_in)

    @property
    def is_live(self):
        now = timezone.now()
        if self.experiment_set.filter(start_date__lte=now, end_date__gte=now).count():
            return True
        else:
            return False

    def html_parent_page_title(self):
        return format_html(
            '<a href="/admin/pages/{}/edit/">{}</span>',
            self.get_parent().id,
            self.get_parent().title
        )

    html_parent_page_title.short_description = 'Parent'

    def html_clickable_variant_link(self):
        if self.is_live:
            return format_html(
                '<a href="/oneyou{}">{}</span>',
                self.url,
                self.url
            )
        else:
            return self.url

    html_clickable_variant_link.short_description = 'URL'


class ExperimentsContent(ClusterableModel):
    content = models.TextField(null=True, blank=True)

    def get_content_for(self, key):
        content_dict = json.loads(self.content)
        return content_dict[str(key)]


@receiver(post_save, sender=OneYouVariant, dispatch_uid='variant post save signal')
def update_frozen_experiments_content(sender, instance, using, **kwargs):
    newest_revision = instance.get_latest_revision()
    if newest_revision:
        experiments_content = ExperimentsContent.objects.all().first()
        if not experiments_content:
            experiments_content = ExperimentsContent(content=json.dumps({}))
        content = json.loads(getattr(experiments_content, "content", json.dumps({})))
        content[str(newest_revision.page_id)] = Release.generate_fixed_content(newest_revision)
        experiments_content.content = json.dumps(content)
        experiments_content.save()


@receiver(pre_delete, sender=OneYouVariant, dispatch_uid='variant delete signal')
def delete_from_frozen_experiments_content(sender, instance, using, **kwargs):
    experiments_content = ExperimentsContent.objects.all().first()
    if experiments_content:
        content = json.loads(experiments_content.content)
        if str(instance.id) in content.keys():
            del content[str(instance.id)]
    print("deleting...")
