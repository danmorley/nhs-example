from wagtail.contrib.modeladmin.options import modeladmin_register, ModelAdmin
from wagtailsnippetscopy.admin import SnippetCopyModelAdminMixin

from pages.models import Menu


class MenuAdmin(SnippetCopyModelAdminMixin, ModelAdmin):
    model = Menu


modeladmin_register(MenuAdmin)
