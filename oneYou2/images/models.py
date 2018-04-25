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
    "blog-cards-mobile": "344x184",  # widthxheight
    "blog-cards-desktop": "550x294",
    "inline-stories-mobile": "344x168",
    "inline-stories-desktop": "1154x294",
    "carousel-mobile": "104x168",
    "carousel-desktop": "246x338",
    "banner-promo-mobile": "375x136",
    "banner-promo-desktop": "1153x168",
    "page-header-carousel-mobile": "375x231",
    "page-header-carousel-desktop": "1440x384",
    "drop-down-mobile": "344x120",
    "drop-down-desktop": "553x216",
    "page-header-mobile": "375x143",
    "page-header-desktop": "1440x240",
    "variant-mobile": "344x120",
    "variant-desktop": "480x336",

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

    def save(self, *args, **kwargs):
        print(args)
        print(kwargs)
        rendition = 1
        super(PHEImage, self).save(*args, **kwargs)


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
