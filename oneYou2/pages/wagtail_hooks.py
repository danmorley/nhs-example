from django.urls import reverse
from wagtail.contrib.modeladmin.helpers import ButtonHelper
from wagtail.contrib.modeladmin.options import (
    ModelAdmin, modeladmin_register)
from django.utils.translation import ugettext as _

from .models import Menu


class MenuButtonHelper(ButtonHelper):
    def __init__(self, view, request):
        super().__init__(view, request)

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
        btns.insert(1,
                    self.copy_button(pk, ['button'], classnames_exclude)
                    )
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


modeladmin_register(MenuAdmin)
