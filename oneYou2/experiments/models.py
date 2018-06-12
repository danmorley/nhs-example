import json

from django.db.models.signals import pre_delete, post_save
from django.dispatch import receiver
from django.forms import CheckboxSelectMultiple
from django.utils import timezone
from modelcluster.models import ClusterableModel
from django.db import models

from pages.models import OneYou2Page
from release.models import Release
from wagtail.wagtailadmin.edit_handlers import FieldPanel


class Experiment(ClusterableModel):
    STATUS_CHOICES = [
        ('draft', "Draft"),
        ('live', "Live"),
        ('completed', "Completed"),
    ]
    name = models.CharField(max_length=255)
    variants = models.ManyToManyField('experiments.OneYouVariant', blank=True)
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
