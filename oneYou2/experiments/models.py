from modelcluster.models import ClusterableModel
from django.db import models
from wagtail.wagtailcore.models import Page


class Experiment(ClusterableModel):
    STATUS_CHOICES = [
        ('draft', "Draft"),
        ('live', "Live"),
        ('completed', "Completed"),
    ]
    name = models.CharField(max_length=255)
    control_page = models.ForeignKey('wagtailcore.Page', related_name='+', on_delete=models.CASCADE)


class Variant(Page):
    pass