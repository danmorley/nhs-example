from django.utils.translation import ugettext as _
from django.urls import reverse

from wagtail.contrib.modeladmin.helpers import ButtonHelper
from wagtail.contrib.modeladmin.options import (
    ModelAdmin, modeladmin_register)
from .models import Release
from oneYou2.utils import get_protocol


class ReleaseButtonHelper(ButtonHelper):
    def __init__(self, view, request):
        super(ReleaseButtonHelper, self).__init__(view, request)

    def create_button(self, pk, label, title, url, classnames_add=None, classnames_exclude=None):
        if classnames_add is None:
            classnames_add = []
        if classnames_exclude is None:
            classnames_exclude = []
        classnames = self.edit_button_classnames + classnames_add
        cn = self.finalise_classname(classnames, classnames_exclude)

        return {
            'url': url,
            'label': _(label),
            'classname': cn,
            'title': _(title),
        }

    def preview_button(self, pk, classnames_add=None, classnames_exclude=None):
        release = Release.objects.get(id=pk)

        # Build preview URL
        preview_url = '/{}/?id={}'.format(release.site.sitesettings.uid, release.uuid)
        api_host = self.request.META.get('HTTP_HOST')
        if api_host:
            preview_url += '&cms={0}{1}/api'.format(get_protocol(), api_host)

        return self.create_button(pk, 'preview', 'Preview this release', preview_url, classnames_add, classnames_exclude)

    def detail_revision_button(self, pk, classnames_add=None, classnames_exclude=None):
        preview_url = reverse('release_view', kwargs={'release_id': pk})
        return self.create_button(pk, 'detail', 'Detail updated pages for this release', preview_url, classnames_add, classnames_exclude)

    def get_buttons_for_obj(self, obj, exclude=None, classnames_add=None,
                            classnames_exclude=None):
        btns = ButtonHelper.get_buttons_for_obj(self, obj, exclude=None, classnames_add=None, classnames_exclude=None)
        pk = getattr(obj, self.opts.pk.attname)
        btns.insert(1, self.preview_button(pk, ['button'], classnames_exclude))
        btns.insert(2, self.detail_revision_button(pk, ['button'], classnames_exclude))
        return btns


class ReleaseAdmin(ModelAdmin):
    def get_button_helper_class(self):
        """
        Returns a ButtonHelper class to help generate buttons for the given
        model.
        """
        return ReleaseButtonHelper

    model = Release
    menu_label = 'Release'  # ditch this to use verbose_name_plural from model
    menu_icon = 'date'  # change as required
    menu_order = 900  # will put in 10th place (000 being 1st, 100 2nd)
    add_to_settings_menu = False  # or True to add your model to the Settings sub-menu
    exclude_from_explorer = False  # or True to exclude pages of this type from Wagtail's explorer view
    list_display = ('release_name', 'uuid', 'content_status', 'release_time')
    list_filter = ('content_status', 'site',)
    search_fields = ('release_name',)
    index_view_extra_css = ('css/admin_index.css',)

    def get_queryset(self, request):
        """
        Returns a QuerySet of all model instances that can be edited by the
        admin site.
        """
        qs = Release.objects.all()
        return qs

    def index_view(self, request):
        # set pending as default filter
        if 'HTTP_REFERER' in request.META:
            http_referer = request.META['HTTP_REFERER'].split(request.META['PATH_INFO'])
            if http_referer[-1] and not http_referer[-1].startswith('?'):
                if 'content_status__exact' not in request.GET:
                    q = request.GET.copy()
                    q['content_status__exact'] = '0'
                    request.GET = q
                    request.META['QUERY_STRING'] = request.GET.urlencode()
        return super(ReleaseAdmin,self).index_view(request)


# Now you just need to register your customised ModelAdmin class with Wagtail
modeladmin_register(ReleaseAdmin)
