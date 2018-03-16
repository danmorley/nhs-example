from collections import OrderedDict

from django.conf.urls import include, url
from django.urls import reverse
from rest_framework.exceptions import NotFound
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.fields import Field, CharField
from rest_framework.utils.serializer_helpers import ReturnList
from wagtail.api.v2.endpoints import PagesAPIEndpoint
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.api.v2.serializers import BaseSerializer
from wagtail.utils.urlpatterns import decorate_urlpatterns
from wagtail.wagtailcore.models import Site, Page
from wagtail.wagtaildocs.models import get_document_model
from wagtail.wagtailimages.api.v2.endpoints import ImagesAPIEndpoint
from wagtail.wagtaildocs.api.v2.endpoints import DocumentsAPIEndpoint
from wagtail.api.v2.endpoints import BaseAPIEndpoint
from wagtail.api.v2.filters import FieldsFilter, OrderingFilter, SearchFilter
from wagtail.wagtailredirects.models import Redirect
from wagtail.wagtailcore.models import Page

from home.models import SiteSettings
from release.utils import get_latest_release, get_release_object
from release.exceptions import NoReleasesFound

from pages.models import OneYou2Page


class MenuField(Field):
    """
    Serializes the "download_url" field for documents.

    Example:
    "download_url": "http://api.example.com/documents/1/my_document.pdf"
    """
    def get_attribute(self, instance):
        return instance

    def to_representation(self, document):
        try:
            settings = SiteSettings.objects.get(site=document)
        except SiteSettings.DoesNotExist:
            return {}
        if settings.menu:
            pages_meta = {}
            for d in OneYou2Page.objects.all():
                pages_meta[d.id] = (d.slug, d.link_url)
            json_menu = settings.menu.menu_items.stream_data

            for menu_item in json_menu:
                multimenu = menu_item['value'].get('menu_items')
                if multimenu:
                    for multimenu_item in multimenu:
                        page_id = multimenu_item['value'].get('link_page')
                        if page_id:
                            multimenu_item['value']['link_slug'] = pages_meta[page_id][0]
                            multimenu_item['value']['link_path'] = pages_meta[page_id][1].replace('/home', '')
                        else:
                            multimenu_item['value']['link_slug'] = None
                            multimenu_item['value']['link_path'] = None
                else:
                    # simple_menu_item
                    page_id = menu_item['value'].get('link_page')
                    if page_id:
                        menu_item['value']['link_slug'] = pages_meta[page_id][0]
                        menu_item['value']['link_path'] = pages_meta[page_id][1].replace('/home', '')
                    else:
                        menu_item['value']['link_slug'] = None
                        menu_item['value']['link_path'] = None

            return json_menu
        else:
            return {}


class RedirectField(Field):
    def get_attribute(self, instance):
        return instance

    def to_representation(self, document):
        redirects = Redirect.get_for_site(site=document)
        redirects_dict = {}
        for redirect in redirects:
            redirects_dict[redirect.old_path] = redirect.link.replace('http://localhost', '')

        return redirects_dict


class FooterField(Field):
    def get_attribute(self, instance):
        return instance

    def to_representation(self, document):
        # TODO: image paths
        try:
            settings = SiteSettings.objects.get(site=document)
        except SiteSettings.DoesNotExist:
            return {}
        footer = settings.footer
        if footer:
            footer_image = footer.image
            footer_links = footer.menu_items.stream_data
            footer_social_media = footer.follow_us.stream_data

            pages_meta = {}
            for d in OneYou2Page.objects.all():
                pages_meta[d.id] = (d.slug, d.link_url)

            for menu_item in footer_links:
                page_id = menu_item['value'].get('link_page')
                if page_id:
                    menu_item['value']['link_slug'] = pages_meta[page_id][0]
                    menu_item['value']['link_path'] = pages_meta[page_id][1].replace('/home', '')
                else:
                    menu_item['value']['link_slug'] = None
                    menu_item['value']['link_path'] = None

            footer_data = {
                "links": footer_links,
                "social_media": footer_social_media
            }
            if footer_image:
                footer_data['image'] = {
                    'title': footer_image.title,
                    'image': footer_image.file.url
                }
            return footer_data
        else:
            return {}


class HeaderField(Field):
    def get_attribute(self, instance):
        return instance

    def to_representation(self, document):
        try:
            settings = SiteSettings.objects.get(site=document)
        except SiteSettings.DoesNotExist:
            return {}
        header = settings.header
        if header:
            if header.image:
                return {
                    "image": {
                        "title": header.image.title,
                        "image": header.image.file.url
                    }
                }
        return {}


class PagesField(Field):
    def get_attribute(self, instance):
        return instance

    def to_representation(self, document):
        pages = Page.objects.in_site(site=document).values('id', 'url_path')

        return {p['url_path'].replace('/home', ''): p['id'] for p in pages}


class SiteUIDField(Field):
    def get_attribute(self, instance):
        return instance

    def to_representation(self, document):
        try:
            settings = SiteSettings.objects.get(site=document)
        except SiteSettings.DoesNotExist:
            return ""
        return settings.uid


class SiteSerializer(BaseSerializer):
    menu = MenuField(read_only=True)
    redirects = RedirectField(read_only=True)
    footer = FooterField(read_only=True)
    header = HeaderField(read_only=True)
    pages = PagesField(read_only=True)
    release_id = CharField(read_only=True)
    site_uid = SiteUIDField(read_only=True)


# There is no default sites endpoint
class SitesAPIEndpoint(BaseAPIEndpoint):
    def __init__(self, *args, **kwargs):
        super(BaseAPIEndpoint, self).__init__(*args, **kwargs)
        self.model = Site
        self.seen_types = OrderedDict()

    base_serializer_class = SiteSerializer
    filter_backends = [FieldsFilter, OrderingFilter, SearchFilter]
    body_fields = BaseAPIEndpoint.body_fields + ['hostname', 'port', 'site_name', 'root_page', 'is_default_site',
                                                 'menu', 'header', 'footer', 'redirects', 'pages', 'release_id',
                                                 'site_uid']
    meta_fields = BaseAPIEndpoint.meta_fields + ['hostname', 'release_id', 'site_uid']
    listing_default_fields = BaseAPIEndpoint.listing_default_fields + ['hostname', 'port', 'site_name', 'root_page',
                                                                       'is_default_site', 'menu', 'header', 'footer',
                                                                       'redirects', 'pages', 'release_id', 'site_uid']
    nested_default_fields = BaseAPIEndpoint.nested_default_fields + ['hostname']
    name = 'sites'
    model = get_document_model()

    def get_queryset(self):
        return self.model.objects.all().order_by('id')

    def dispatch(self, request, *args, **kwargs):
        """
        `.dispatch()` is pretty much the same as Django's regular dispatch,
        but with extra hooks for startup, finalize, and exception handling.

        This is overridden to allow it to look up the site by pk or uid (set in sitesettings)
        If you try and do this anywhere else it won't work.
        """
        pk = kwargs.get('pk')
        if pk:
            try:
                int(pk)
            except ValueError:
                site_settings_obj = get_object_or_404(SiteSettings.objects.all(), **{"uid": pk})
                pk = str(site_settings_obj.site.pk)
            kwargs['pk'] = pk
        self.response = super(BaseAPIEndpoint, self).dispatch(request, *args, **kwargs)
        return self.response

    def detail_view(self, request, pk, release_uuid=None):
        instance = self.get_object()
        # TODO: Currently no site data is associated with a release, so this doesn't really do anything
        if not release_uuid or release_uuid == "current":
            current_release = get_latest_release(instance.pk)
            if not current_release:
                raise NoReleasesFound("The current site has no live releases")
            setattr(instance, 'release_id', current_release.uuid)
        else:
            # Request is asking for a specific release
            # TODO: If this release is not current maybe it should be protected
            release_object = get_release_object(release_uuid)
            if not release_object:
                raise NotFound()

            setattr(instance, 'release_id', release_uuid)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def listing_view(self, request):
        queryset = self.get_queryset()
        self.check_query_parameters(queryset)
        queryset = self.filter_queryset(queryset)
        queryset = self.paginate_queryset(queryset)
        # TODO: this is pretty inefficent
        # Show all the latest releases
        for instance in queryset:
            current_release = get_latest_release(site_id=instance.pk)
            if not current_release:
                setattr(instance, 'release_id', "")
            else:
                setattr(instance, 'release_id', current_release.uuid)

        serializer = self.get_serializer(queryset, many=True)
        return self.get_paginated_response(serializer.data)


    @classmethod
    def get_object_detail_urlpath(cls, model, pk, namespace=''):
        if namespace:
            url_name = namespace + ':detail'
        else:
            url_name = 'detail'

        return reverse(url_name, args=(pk, ))


class ReleasePagesAPIEndpoint(PagesAPIEndpoint):
    def dispatch(self, request, *args, **kwargs):
        """
        `.dispatch()` is pretty much the same as Django's regular dispatch,
        but with extra hooks for startup, finalize, and exception handling.

        This is overridden to allow it to look up the site by pk or uid (set in sitesettings)
        If you try and do this anywhere else it won't work.
        """
        site_uid = kwargs.get('site_uid')
        if site_uid:
            try:
                int(site_uid)
            except ValueError:
                site_settings_obj = get_object_or_404(SiteSettings.objects.all(), **{"uid": site_uid})
                site_uid = str(site_settings_obj.site.pk)
            kwargs['site_uid'] = site_uid
        self.response = super(BaseAPIEndpoint, self).dispatch(request, *args, **kwargs)
        return self.response

    @classmethod
    def get_field_serializer_overrides(cls, model):
        overides = {field.name: field.serializer
                    for field in cls.get_body_fields(model) + cls.get_meta_fields(model)
                    if field.serializer is not None}
        return overides

    def get_object(self):
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        page_id = self.kwargs[lookup_url_kwarg]
        base = Page.objects.get(id=page_id)
        return base.specific

    def get_serializer(self, *args, **kwargs):
        """
        Return the serializer instance that should be used for validating and
        deserializing input, and for serializing output.
        """
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    def detail_view(self, request, pk, site_uid, release_uuid):
        release = get_release_object(release_uuid)
        if not release:
            raise NotFound()
        page_content = release.get_content_for(pk)
        return Response(page_content)

    def listing_view(self, request, site_uid, release_uuid):
        release = get_release_object(release_uuid)
        pages = []
        if not release:
            raise NotFound()
        for revision in release.revisions.all():
            pages.append(release.get_content_for(revision.revision.page.id))
        return Response({"meta": {"total_count": len(pages)}, "items": pages})


class AltPagesEndpoint(PagesAPIEndpoint):
  def get_object(self):
    lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
    page_id = self.kwargs[lookup_url_kwarg]
    base = Page.objects.get(id=page_id)
    return base.specific


class OneYouAPIRouter(WagtailAPIRouter):
    """This is the default WagtailAPI router with some of our own endpoints pre-registered"""

    def get_urlpatterns(self):
        urlpatterns = [
            url(r'^sites/$',
                view=SitesAPIEndpoint.as_view({'get': 'listing_view'}),
                name='site_listings'),

            url(r'^sites/(?P<pk>[\w\-]+)/$',
                view=SitesAPIEndpoint.as_view({'get': 'detail_view'}),
                name='site_detail'),

            url(r'^sites/(?P<pk>[\w\-]+)/(?P<release_uuid>[\w\-]+)/$',
                view=SitesAPIEndpoint.as_view({'get': 'detail_view'}),
                name='site_release_detail'),

            url(r'^sites/(?P<site_uid>[\w\-]+)/(?P<release_uuid>[\w\-]+)/pages/$',
                view=ReleasePagesAPIEndpoint.as_view({'get': 'listing_view'}),
                name='s'),

            url(r'^sites/(?P<site_uid>[\w\-]+)/(?P<release_uuid>[\w\-]+)/pages/(?P<pk>\d+)/$',
                view=ReleasePagesAPIEndpoint.as_view({'get': 'detail_view'}),
                name='detail'),
        ]

        for name, class_ in self._endpoints.items():
            pattern = url(
                r'^{}/'.format(name),
                include(class_.get_urlpatterns(), namespace=name)
            )
            urlpatterns.append(pattern)

        decorate_urlpatterns(urlpatterns, self.wrap_view)

        return urlpatterns


# Create the router. "wagtailapi" is the URL namespace
api_router = OneYouAPIRouter('wagtailapi')

# Add the four endpoints using the "register_endpoint" method.
# The first parameter is the name of the endpoint (eg. pages, images). This
# is used in the URL of the endpoint
# The second parameter is the endpoint class that handles the requests


# This is for internal use only
api_router.register_endpoint('release_pages', AltPagesEndpoint)

api_router.register_endpoint('images', ImagesAPIEndpoint)
api_router.register_endpoint('documents', DocumentsAPIEndpoint)
