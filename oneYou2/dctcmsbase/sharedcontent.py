from django.db import models

from wagtail.snippets.models import register_snippet
from wagtail.admin.edit_handlers import FieldPanel, PageChooserPanel
from wagtail.core.fields import RichTextField
from wagtail.images.edit_handlers import ImageChooserPanel

from modelcluster.fields import ParentalKey

from dctsharedcontent.models import SharedContent


@register_snippet
class BannerPanel(SharedContent):
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
                           related_name='base_banner_shelf_links',
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