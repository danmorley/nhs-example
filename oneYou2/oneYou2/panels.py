from django.forms.utils import pretty_name
from django.utils.html import format_html
from django.utils.translation import ugettext_lazy as _
from wagtail.admin.edit_handlers import EditHandler


class BaseReadOnlyPanel(EditHandler):
    def render(self):
        value = getattr(self.instance, self.attr)
        if callable(value):
            value = value()
        return format_html('<div style="padding-top: 1.2em;">{}</div>', value)

    def render_as_object(self):
        return format_html(
            '<fieldset><legend>{}</legend>'
            '<ul class="fields"><li><div class="field">{}</div></li></ul>'
            '</fieldset>',
            self.heading, self.render())

    def render_as_field(self):
        return format_html(
            '<div class="field">'
            '<label>{}{}</label>'
            '<div class="field-content">{}</div>'
            '</div>',
            self.heading, _(':'), self.render())

    def required_fields(self):
        fields = []
        return fields


class ReadOnlyPanel:
    def __init__(self, attr, heading=None, classname='', help_text=''):
        self.attr = attr
        self.heading = pretty_name(self.attr) if heading is None else heading
        self.classname = classname
        self.help_text = help_text

        def required_fields(self):
            raise AttributeError

    def bind_to_model(self, model):
        return type(str(_('ReadOnlyPanel')), (BaseReadOnlyPanel,),
                    {'attr': self.attr, 'heading': self.heading,
                     'classname': self.classname})(heading=self.heading,
                                                   classname=self.classname,
                                                   help_text=self.help_text)
