from wagtail.contrib.modeladmin.options import (
    ModelAdmin, ModelAdminGroup, modeladmin_register)

from .models import PromoShelf, BannerShelf, AppTeaser, RecipeTeaser, ActionShelf


class PromoshelfAdmin(ModelAdmin):
    model = PromoShelf
    menu_label = 'Promo shelves'
    menu_icon = 'form'
    menu_order = 200
    add_to_settings_menu = False  # or True to add your model to the Settings sub-menu
    exclude_from_explorer = False  # or True to exclude pages of this type from Wagtail's explorer view
    list_display = ('shelf_id',)
    list_filter = ('shelf_id',)
    search_fields = ('shelf_id',)


class BannershelfAdmin(ModelAdmin):
    model = BannerShelf
    menu_label = 'Banner shelves'
    menu_icon = 'form'
    menu_order = 300
    add_to_settings_menu = False  # or True to add your model to the Settings sub-menu
    exclude_from_explorer = False  # or True to exclude pages of this type from Wagtail's explorer view
    list_display = ('shelf_id',)
    list_filter = ('shelf_id',)
    search_fields = ('shelf_id',)


class AppshelfAdmin(ModelAdmin):
    model = AppTeaser
    menu_label = 'App teasers'
    menu_icon = 'form'
    menu_order = 400
    add_to_settings_menu = False  # or True to add your model to the Settings sub-menu
    exclude_from_explorer = False  # or True to exclude pages of this type from Wagtail's explorer view
    list_display = ('shelf_id',)
    list_filter = ('shelf_id',)
    search_fields = ('shelf_id',)


class RecipeshelfAdmin(ModelAdmin):
    model = RecipeTeaser
    menu_label = 'Recipe teasers'
    menu_icon = 'form'
    menu_order = 500
    add_to_settings_menu = False  # or True to add your model to the Settings sub-menu
    exclude_from_explorer = False  # or True to exclude pages of this type from Wagtail's explorer view
    list_display = ('shelf_id',)
    list_filter = ('shelf_id',)
    search_fields = ('shelf_id',)


class ActionshelfAdmin(ModelAdmin):
    model = ActionShelf
    menu_label = 'Actions'
    menu_icon = 'form'
    menu_order = 600
    add_to_settings_menu = False  # or True to add your model to the Settings sub-menu
    exclude_from_explorer = False  # or True to exclude pages of this type from Wagtail's explorer view
    list_display = ('paragon_id', 'title', 'category', 'position', 'active')
    list_filter = ('cta_type',)
    search_fields = ('title',)


class ShelfAdminGroup(ModelAdminGroup):
    menu_label = 'Shared'
    menu_icon = 'folder-open-inverse'  # change as required
    menu_order = 200  # will put in 3rd place (000 being 1st, 100 2nd)
    items = (PromoshelfAdmin, BannershelfAdmin, AppshelfAdmin, RecipeshelfAdmin, ActionshelfAdmin)


modeladmin_register(ShelfAdminGroup)
