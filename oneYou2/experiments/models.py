from modelcluster.models import ClusterableModel
from django.db import models

from pages.models import OneYou2Page


class Experiment(ClusterableModel):
    STATUS_CHOICES = [
        ('draft', "Draft"),
        ('live', "Live"),
        ('completed', "Completed"),
    ]
    name = models.CharField(max_length=255)
    control_page = models.ForeignKey('wagtailcore.Page', related_name='+', on_delete=models.CASCADE)


class OneYouVariant(OneYou2Page):

    @classmethod
    def from_page(cls, page):
        return cls(
            page.x
        )
