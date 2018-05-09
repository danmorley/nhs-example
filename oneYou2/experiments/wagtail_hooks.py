from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register

from .models import Experiment


class AccessAttemptAdmin(ModelAdmin):
    model = Experiment
    menu_label = 'Experiments'
    menu_icon = 'group'
    menu_order = 910
    add_to_settings_menu = False


modeladmin_register(AccessAttemptAdmin)
