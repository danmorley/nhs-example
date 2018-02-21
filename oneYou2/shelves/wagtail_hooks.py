from wagtail.contrib.modeladmin.options import (
    ModelAdmin, ModelAdminGroup, modeladmin_register)

from .models import PromoShelf


class PromoshelfAdmin(ModelAdmin):
    model = PromoShelf
    menu_label = 'Promo shelves'
    menu_icon = 'form'
    menu_order = 200
    add_to_settings_menu = False  # or True to add your model to the Settings sub-menu
    exclude_from_explorer = False # or True to exclude pages of this type from Wagtail's explorer view
    list_display = ('label',)
    list_filter = ('label',)
    search_fields = ('label',)


class ShelfAdminGroup(ModelAdminGroup):
    menu_label = 'Shelves'
    menu_icon = 'folder-open-inverse'  # change as required
    menu_order = 200  # will put in 3rd place (000 being 1st, 100 2nd)
    items = (PromoshelfAdmin,)


modeladmin_register(ShelfAdminGroup)

