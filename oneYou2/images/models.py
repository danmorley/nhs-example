import operator
from functools import reduce

from django.db import models
from django.db.models import Q
from django.db.models.signals import post_delete
from django.dispatch import receiver

from wagtail.core.models import PageRevision
from wagtail.images.models import Image, AbstractImage, AbstractRendition

from images.renditions import ONEYOU_RENDITIONS


class PHEImage(AbstractImage):
    # def get_usage(self):
    #     search_strings = ['"type": "image", "value": ' + str(self.id),
    #                       'image": ' + str(self.id),
    #                       'image\\": ' + str(self.id)]
    #     query = reduce(operator.or_, (Q(content_json__contains=string) for string in search_strings))
    #     page_ids = PageRevision.objects.filter(query).values('page_id')
    #     pages = OneYou2Page.objects.filter(id__in=page_ids).order_by('id')
    #     return pages

    admin_form_fields = Image.admin_form_fields + ()

    @property
    def link(self):
        if self.file:
            return self.file.url
        else:
            return ''

    def generate_or_get_all_renditions(self):
        if self.file:
            renditions_dict = {
                'original': self.file.url
            }
            for rendition in ONEYOU_RENDITIONS:
                for device, size in rendition[3].items():
                    renditions_dict[
                        '{}/{}/{}/{}'.format(rendition[0],
                                             rendition[1],
                                             rendition[2],
                                             device)
                    ] = self.get_rendition('fill-{}'.format(size)).url
                    # renditions_dict[size] = self.get_rendition('fill-{}'.format(size)).url
            return renditions_dict
        else:
            return {}
    
    def generate_and_get_rendition(self, rendition_size):
        if not self.file or rendition_size == 'none':
            return self.file.url
        else:
            return self.get_rendition('fill-{}'.format(rendition_size)).url

    def save(self, *args, **kwargs):
        super(PHEImage, self).save(*args, **kwargs)


class PHERendition(AbstractRendition):
    image = models.ForeignKey(
        PHEImage,
        related_name='renditions',
        on_delete=models.CASCADE,
    )

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
