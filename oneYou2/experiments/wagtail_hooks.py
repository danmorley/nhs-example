from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register, ModelAdminGroup

from .views import VarientAdminURLHelper
from .models import Experiment, OneYouVariant


class ExperimentAdmin(ModelAdmin):
    model = Experiment
    menu_label = 'Experiments'
    menu_icon = 'group'
    menu_order = 910
    add_to_settings_menu = False


class OneYouVariantAdmin(ModelAdmin):
    model = OneYouVariant
    menu_label = 'Variants'
    menu_icon = 'form'
    menu_order = 911
    add_to_settings_menu = False
    url_helper_class = VarientAdminURLHelper
    list_display = ('title', 'url', 'part_of_experiments')


class ExperimentAdminGroup(ModelAdminGroup):
    menu_label = 'Experiments'
    menu_icon = 'group'  # change as required
    menu_order = 200  # will put in 3rd place (000 being 1st, 100 2nd)
    items = (ExperimentAdmin, OneYouVariantAdmin)


modeladmin_register(ExperimentAdminGroup)
