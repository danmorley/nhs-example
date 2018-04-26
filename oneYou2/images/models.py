import operator

from django.db import models
from django.db.models import Q
from django.db.models.signals import post_delete
from django.dispatch import receiver

from functools import reduce

from wagtail.wagtailcore.models import PageRevision
from wagtail.wagtailimages.models import Image, AbstractImage, AbstractRendition

from pages.models import OneYou2Page

ONEYOU_RENDITIONS = {
    "mobile-landscape": "375x231",
    "mobile-portrait": "104x168",
    "mobile-square": "250x250",
    "desktop-landscape": "1440x384",
    "desktop-portrait": "246x338",
    "desktop-square": "500x500",
}


class PHEImage(AbstractImage):
    def get_usage(self):
        search_strings = ['"type": "image", "value": ' + str(self.id),
                          'image": ' + str(self.id),
                          'image\\": ' + str(self.id)]
        query = reduce(operator.or_, (Q(content_json__contains=string) for string in search_strings))
        page_ids = PageRevision.objects.filter(query).values('page_id')
        pages = OneYou2Page.objects.filter(id__in=page_ids).order_by('id')
        return pages

    admin_form_fields = Image.admin_form_fields + ()

    @property
    def link(self):
        if self.file:
            return self.file.url
        else:
            return ""

    def generate_or_get_all_renditions(self):
        if self.file:
            renditions_dict = {}
            for k, v in ONEYOU_RENDITIONS.items():
                renditions_dict[k] = self.get_rendition('fill-{}'.format(v)).url
            return renditions_dict
        else:
            return {}

    def save(self, *args, **kwargs):
        super(PHEImage, self).save(*args, **kwargs)
        self.generate_or_get_all_renditions()


class PHERendition(AbstractRendition):
    image = models.ForeignKey(PHEImage, related_name='renditions')

    class Meta:
        unique_together = (
            ('image', 'filter_spec', 'focal_point_key'),
        )


# Delete the source image file when an image is deleted
@receiver(post_delete, sender=PHEImage)
def image_delete(sender, instance, **kwargs):
    instance.file.delete(False)


# Delete the rendition image file when a rendition is deleted
@receiver(post_delete, sender=PHERendition)
def rendition_delete(sender, instance, **kwargs):
    instance.file.delete(False)
