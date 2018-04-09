from django.utils.html import format_html
from django.contrib.staticfiles.templatetags.staticfiles import static

from wagtail.wagtailcore import hooks


@hooks.register('insert_global_admin_css')
def global_admin_css():
    return format_html('<link rel="stylesheet" href="{}">', static('css/admin.css'))