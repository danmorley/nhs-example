from django.contrib.staticfiles.templatetags.staticfiles import static
from django.utils.html import format_html

from wagtail.wagtailcore import hooks

@hooks.register('insert_editor_css')
def editor_css():
    return format_html(
        '<link rel="stylesheet" href="{}">',
        static('dct-admin-interface/css/dct-admin-interface.css')
    )
