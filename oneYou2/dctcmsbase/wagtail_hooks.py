from django.conf import settings
from django.urls import reverse

from wagtail.admin.rich_text.converters.html_to_contentstate import BlockElementHandler
from wagtail.admin.rich_text.editors.draftail import features as draftail_features
from wagtail.contrib.modeladmin.helpers import ButtonHelper
from wagtail.contrib.modeladmin.options import ModelAdmin, ModelAdminGroup, modeladmin_register
from wagtail.core import hooks

from .sharedcontent import AppTeaser, Banner
from .pagecomponents import Footer, Header, Menu, Theme


try:
    from axes.models import AccessAttempt

    class AccessAttemptAdmin(ModelAdmin):
        model = AccessAttempt
        menu_label = 'Access'
        menu_icon = 'code'
        menu_order = 5
        add_to_settings_menu = True

    modeladmin_register(AccessAttemptAdmin)
except:
    pass


@hooks.register('register_rich_text_features')
def register_strikethrough_feature(features):
    feature_name = 'div'
    type_ = 'div'
    tag = 'div'

    control = {
        'type': type_,
        'label': 'Toggle',
        'description': 'Expansion Toggle',
        'element': 'div'
    }

    features.register_editor_plugin(
        'draftail', feature_name, draftail_features.BlockFeature(control)
    )

    db_conversion = {
        'from_database_format': {tag: BlockElementHandler(type_)},
        'to_database_format': {'block_map': {type_: tag}},
    }

    features.register_converter_rule('contentstate', feature_name, db_conversion)

    features.default_features.append('div')


class MenuButtonHelper(ButtonHelper):
    def __init__(self, view, request):
        super(MenuButtonHelper, self).__init__(view, request)

    def copy_button(self, pk, classnames_add=None, classnames_exclude=None):
        if classnames_add is None:
            classnames_add = []
        if classnames_exclude is None:
            classnames_exclude = []
        classnames = self.edit_button_classnames + classnames_add
        cn = self.finalise_classname(classnames, classnames_exclude)
        return {
            'url': reverse('wagtailsnippetscopy_copy', args=['pages', 'menu', pk]),
            'label': _('copy'),
            'classname': cn,
            'title': _('copy this %s') % self.verbose_name,
        }

    def get_buttons_for_obj(self, obj, exclude=None, classnames_add=None,
                            classnames_exclude=None):
        btns = ButtonHelper.get_buttons_for_obj(self, obj, exclude=None, classnames_add=None, classnames_exclude=None)
        pk = getattr(obj, self.opts.pk.attname)
        btns.insert(1, self.copy_button(pk, ['button'], classnames_exclude))
        return btns


class AppTeaserAdmin(ModelAdmin):
    model = AppTeaser
    menu_label = 'App teasers'
    menu_icon = 'form'
    menu_order = 200
    add_to_settings_menu = False  # or True to add your model to the Settings sub-menu
    exclude_from_explorer = False  # or True to exclude pages of this type from Wagtail's explorer view
    list_display = ('shelf_id',)
    list_filter = ('shelf_id',)
    search_fields = ('shelf_id',)


class BannerAdmin(ModelAdmin):
    model = Banner
    menu_label = 'Banners'
    menu_icon = 'form'
    menu_order = 300
    add_to_settings_menu = False  # or True to add your model to the Settings sub-menu
    exclude_from_explorer = False  # or True to exclude pages of this type from Wagtail's explorer view
    list_display = ('shelf_id',)
    list_filter = ('shelf_id',)
    search_fields = ('shelf_id',)


class SharedAdminGroup(ModelAdminGroup):
    menu_label = 'Shared'
    menu_icon = 'folder-open-inverse'  # change as required
    menu_order = 200  # will put in 3rd place (000 being 1st, 100 2nd)
    items = (AppTeaserAdmin, BannerAdmin)


class FooterAdmin(ModelAdmin):
    model = Footer
    menu_label = 'Footers'
    menu_icon = 'form'
    menu_order = 100
    add_to_settings_menu = False  # or True to add your model to the Settings sub-menu
    exclude_from_explorer = False  # or True to exclude pages of this type from Wagtail's explorer view
    list_display = ('label',)
    list_filter = ('label',)
    search_fields = ('label',)


class HeaderAdmin(ModelAdmin):
    model = Header
    menu_label = 'Headers'
    menu_icon = 'form'
    menu_order = 200
    add_to_settings_menu = False  # or True to add your model to the Settings sub-menu
    exclude_from_explorer = False  # or True to exclude pages of this type from Wagtail's explorer view
    list_display = ('label',)
    list_filter = ('label',)
    search_fields = ('label',)


class MenuAdmin(ModelAdmin):
    model = Menu
    menu_label = 'Menus'
    menu_icon = 'form'
    menu_order = 300
    add_to_settings_menu = False  # or True to add your model to the Settings sub-menu
    exclude_from_explorer = False  # or True to exclude pages of this type from Wagtail's explorer view
    list_display = ('label',)
    list_filter = ('label',)
    search_fields = ('label',)


class ThemeAdmin(ModelAdmin):
    model = Theme
    menu_label = 'Themes'
    menu_icon = 'form'
    menu_order = 400
    add_to_settings_menu = False  # or True to add your model to the Settings sub-menu
    exclude_from_explorer = False  # or True to exclude pages of this type from Wagtail's explorer view
    list_display = ('label',)
    list_filter = ('label',)
    search_fields = ('label',)


class PageComponentAdminGroup(ModelAdminGroup):
    menu_label = 'Component'
    menu_icon = 'folder-open-inverse'  # change as required
    menu_order = 200  # will put in 3rd place (000 being 1st, 100 2nd)
    items = (FooterAdmin, HeaderAdmin, MenuAdmin, ThemeAdmin)


@hooks.register('construct_main_menu')
def hide_snippets_menu_item(request, menu_items):
    menu_items[:] = [item for item in menu_items if item.name not in ['snippets']]


if not hasattr(settings, 'OVERRIDE_PAGECOMPONENTADMINGROUP_MENU') or not settings.OVERRIDE_PAGECOMPONENTADMINGROUP_MENU:
    modeladmin_register(PageComponentAdminGroup)

if not hasattr(settings, 'OVERRIDE_SHAREDADMINGROUP_MENU') or not settings.OVERRIDE_SHAREDADMINGROUP_MENU:
    modeladmin_register(SharedAdminGroup)