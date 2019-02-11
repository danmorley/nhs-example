import operator

from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register
from wagtail.core import hooks

from dctcmsbase.wagtail_hooks import SharedAdminGroup, AppTeaserAdmin, BannerAdmin

from .sharedcontent import Action


class ActionAdmin(ModelAdmin):
    model = Action
    menu_label = 'Actions'
    menu_icon = 'form'
    menu_order = 100
    add_to_settings_menu = False  # or True to add your model to the Settings sub-menu
    exclude_from_explorer = False  # or True to exclude pages of this type from Wagtail's explorer view
    list_display = ('paragon_id', 'title', 'category', 'position', 'active')
    list_filter = ('cta_type',)
    search_fields = ('title',)


sharedadmingroup_items = list(SharedAdminGroup.items)
sharedadmingroup_items.append(ActionAdmin)
sharedadmingroup_items.sort(key=operator.attrgetter('menu_label'))
SharedAdminGroup.items = tuple(sharedadmingroup_items)

modeladmin_register(SharedAdminGroup)