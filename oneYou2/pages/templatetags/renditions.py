from django import template
from django.template.defaultfilters import stringfilter

from wagtail.core.models import Page
from home.models import SiteSettings


register = template.Library()

@register.filter
@stringfilter
def get_rendtion(page_id):
    try:
        page = Page.objects.get(id=int(page_id))
        return(SiteSettings.objects.get(site=page.get_site()).rendition)
    except:
        return None