import json
import requests

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models

from wagtail.admin.edit_handlers import FieldPanel
from wagtail.snippets.models import register_snippet

from dctsharedcontent.models import SharedContent


CTA_TYPES = (
    ('direct_app', 'PHE App'),
    ('other_app', 'Other App'),
    ('one_link', 'One Link'),
    ('two_link', 'Two Links'),
    ('info_only', 'Info only'),
)

ACTION_CATEGORY = (
    ('Be more active', 'Be more active'),
    ('Stay connected', 'Stay connected'),
    ('Reframing unhelpful thoughts', 'Reframing unhelpful thoughts'),
    ('Being in the present', 'Being in the present'),
    ('Get good sleep', 'Get good sleep'),
    ('Take control', 'Take control'),
    ('Healthy living', 'Healthy living'),
    ('Take action on my worries', 'Take action on my worries'),
    ('Do something for myself', 'Do something for myself'),
    ('Get help and support', 'Get help and support'),
)


@register_snippet
class Action(SharedContent):
    paragon_id = models.IntegerField(null=False, blank=False, unique=True, help_text='Matches with the UID at paragon')
    paragon_action_code = models.CharField(max_length=255, null=False, blank=False, unique=True,
                                           help_text='Must be unique, used by paragon. Designed to be a slug of title')
    category = models.CharField(max_length=255, null=False, blank=False, choices=ACTION_CATEGORY)
    position = models.IntegerField(null=False, blank=False, help_text='Must be unique, this determines the'
                                                                      'order paragon will return actions'
                                                                      'in the email.')
    action_code = models.CharField(max_length=255, help_text='Wirewax action code')
    title = models.CharField(max_length=255, null=False, blank=False)
    rich_text_body = models.TextField(blank=True, null=True)
    cta_type = models.CharField(max_length=255, null=True, blank=True, choices=CTA_TYPES, default='direct_app')
    cta1_text = models.CharField(max_length=255, null=True, blank=True)
    cta1_link = models.CharField(max_length=255, null=True, blank=True)
    cta2_text = models.CharField(max_length=255, null=True, blank=True)
    cta2_link = models.CharField(max_length=255, null=True, blank=True)
    cta_googleplay = models.CharField(max_length=255, null=True, blank=True)
    cta_appstore = models.CharField(max_length=255, null=True, blank=True)
    active = models.BooleanField(max_length=255, default=True)

    panels = [
        FieldPanel('paragon_id'),
        FieldPanel('title'),
        FieldPanel('rich_text_body'),
        FieldPanel('position'),
        FieldPanel('paragon_action_code'),
        FieldPanel('action_code'),
        FieldPanel('category'),
        FieldPanel('cta_type'),
        FieldPanel('cta1_text'),
        FieldPanel('cta1_link'),
        FieldPanel('cta2_text'),
        FieldPanel('cta2_link'),
        FieldPanel('cta_googleplay'),
        FieldPanel('cta_appstore'),
        FieldPanel('active'),
    ]

    def clean(self):
        super(SharedContent, self).clean()
        validation_errors = {}
        if self.cta1_text:
            if self.cta_googleplay:
                validation_errors['cta_googleplay'] = _('Cannot have google play link and CTA button')
            if self.cta_googleplay:
                validation_errors['cta_appstore'] = _('Cannot have app store link and CTA button')
            if not self.cta1_link:
                validation_errors['cta1_link'] = _('CTA link cannot be blank if CTA button text is set')

        if self.cta1_link and not self.cta1_text:
            validation_errors['cta1_link'] = _('CTA link cannot be blank if CTA button text is set')

        if self.cta2_text:
            if not self.cta1_text:
                validation_errors['cta2_text'] = _('CTA 2 cannot be populated before CTA 1')

            if not self.cta2_link:
                validation_errors['cta2_link'] = _('CTA link cannot be blank if CTA button text is set')

        if self.cta2_link:
            if not self.cta1_text:
                validation_errors['cta2_link'] = _('CTA 2 cannot be populated before CTA 1')

            if not self.cta2_text:
                validation_errors['cta2_link'] = _('CTA link cannot be blank if CTA button text is set')

        if validation_errors:
            raise ValidationError(validation_errors)

    def save(self, *args, **kwargs):
        super(Action, self).save(*args, **kwargs)

        headers = {
            'Authorization': settings.PARAGON_ACTION_API_AUTH_HEADER,
            'Content-Type': 'application/json',
        }
        data = {
            'ProductToken': settings.PARAGON_ACTION_API_PRODUCT_TOKEN,
            'ActionId': self.paragon_id,
            'ActionCategory': self.category,
            'ActionPosition': self.position,
            'ActionCode': self.paragon_action_code,
            'ActionTitle': self.title,
            'ActionTextBody': self.rich_text_body,
            'ActionCTAType': self.cta_type,
            'ActionButton1Text': self.cta1_text,
            'ActionButton1Link': self.cta1_link,
            'ActionButto2Text': self.cta2_text,
            'ActionButton2Link': self.cta2_link,
            'ActionGooglePlayLink': self.cta_googleplay,
            'ActionAppStoreLink': self.cta_appstore,
            'ActionActive': self.active,
            'ActionSource': 'webInput',
        }
        r = requests.post(settings.PARAGON_ACTION_API_URL, headers=headers, data=json.dumps(data))
        if r.status_code != 200:
            print(r.status_code, r.content)
            print(data)
            raise ConnectionError('Could not push action to paragon')

    class Meta:
        verbose_name = 'Action'
        verbose_name_plural = 'Actions'
        unique_together = (('category', 'position'),)

    def __str__(self):
        return self.title