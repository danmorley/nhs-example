from axes.models import AccessAttempt
from django.urls import reverse
from wagtail.contrib.modeladmin.helpers import ButtonHelper
from wagtail.contrib.modeladmin.options import (
    ModelAdmin, modeladmin_register)
from django.utils.translation import ugettext as _

from .models import Menu, Theme

import wagtail.admin.rich_text.editors.draftail.features as draftail_features
from wagtail.admin.rich_text.converters.html_to_contentstate import BlockElementHandler
from wagtail.core import hooks


@hooks.register('register_rich_text_features')
def register_strikethrough_feature(features):
    feature_name = 'seemore'
    type_ = 'SEEMORE'
    tag = 'seemore'

    control = {
        'type': type_,
        'label': 'Toggle',
        'description': 'Expansion Toggle',
    }

    features.register_editor_plugin(
        'draftail', feature_name, draftail_features.BlockFeature(control)
    )

    db_conversion = {
        'from_database_format': {tag: BlockElementHandler(type_)},
        'to_database_format': {'style_map': {type_: tag}},
    }

    features.register_converter_rule('contentstate', feature_name, db_conversion)

    features.default_features.append('seemore')


class AccessAttemptAdmin(ModelAdmin):
    model = AccessAttempt
    menu_label = 'Access'
    menu_icon = 'code'
    menu_order = 5
    add_to_settings_menu = True


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


class MenuAdmin(ModelAdmin):
    def get_button_helper_class(self):
        """
        Returns a ButtonHelper class to help generate buttons for the given
        model.
        """
        return MenuButtonHelper

    model = Menu
    menu_label = 'Menu'  # ditch this to use verbose_name_plural from model
    menu_icon = 'form'  # change as required
    menu_order = 200  # will put in 3rd place (000 being 1st, 100 2nd)


class ThemeAdmin(ModelAdmin):
    model = Theme
    menu_label = 'Themes'
    menu_icon = 'code'
    menu_order = 900
    add_to_settings_menu = True  # or True to add your model to the Settings sub-menu
    exclude_from_explorer = False  # or True to exclude pages of this type from Wagtail's explorer view
    list_display = ('label',)
    list_filter = ('label',)
    search_fields = ('label',)


modeladmin_register(ThemeAdmin)
modeladmin_register(MenuAdmin)
modeladmin_register(AccessAttemptAdmin)
