from django.forms import CheckboxSelectMultiple
from modelcluster.models import ClusterableModel
from django.db import models

from pages.models import OneYou2Page
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
