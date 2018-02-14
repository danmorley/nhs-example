from collections import OrderedDict

from wagtail.api.v2.endpoints import PagesAPIEndpoint
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.api.v2.serializers import BaseSerializer
from wagtail.wagtailcore.models import Site, Page
from wagtail.wagtaildocs.models import get_document_model
from wagtail.wagtailimages.api.v2.endpoints import ImagesAPIEndpoint
from wagtail.wagtaildocs.api.v2.endpoints import DocumentsAPIEndpoint
from wagtail.api.v2.endpoints import BaseAPIEndpoint
from wagtail.api.v2.filters import FieldsFilter, OrderingFilter, SearchFilter
from rest_framework.fields import Field

from home.models import SiteSettings
from wagtail.wagtailredirects.models import Redirect


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
            for d in Page.objects.values('id', 'slug', 'url_path'):
                pages_meta[d['id']] = (d['slug'], d['url_path'])
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
            for d in Page.objects.values('id', 'slug', 'url_path'):
                pages_meta[d['id']] = (d['slug'], d['url_path'])

            for menu_item in footer_links:
                page_id = menu_item['value'].get('link_page')
                if page_id:
                    menu_item['value']['link_slug'] = pages_meta[page_id][0]
                    menu_item['value']['link_path'] = pages_meta[page_id][1].replace('/home', '')
                else:
                    menu_item['value']['link_slug'] = None
                    menu_item['value']['link_path'] = None

            return {
                "image": {
                    'title': footer_image.title,
                    'image': footer_image.file.path
                },
                "links": footer_links,
                "social_media": footer_social_media
            }
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
            return {
                "image": {
                    "title": header.image.title,
                    "image": header.image.file.path
                }
            }
        else:
            return {}


class PagesField(Field):
    def get_attribute(self, instance):
        return instance

    def to_representation(self, document):
        pages = Page.objects.in_site(site=document).values('id', 'url_path')

        return {p['url_path'].replace('/home', ''): p['id'] for p in pages}


class SiteSerializer(BaseSerializer):
    menu = MenuField(read_only=True)
    redirects = RedirectField(read_only=True)
    footer = FooterField(read_only=True)
    header = HeaderField(read_only=True)
    pages = PagesField(read_only=True)


# There is no default sites endpoint
class SitesAPIEndpoint(BaseAPIEndpoint):
    def __init__(self, *args, **kwargs):
        super(BaseAPIEndpoint, self).__init__(*args, **kwargs)
        self.model = Site
        self.seen_types = OrderedDict()

    base_serializer_class = SiteSerializer
    filter_backends = [FieldsFilter, OrderingFilter, SearchFilter]
    body_fields = BaseAPIEndpoint.body_fields + ['hostname', 'port', 'site_name', 'root_page', 'is_default_site',
                                                 'menu', 'header', 'footer', 'redirects', 'pages']
    meta_fields = BaseAPIEndpoint.meta_fields + ['hostname']
    listing_default_fields = BaseAPIEndpoint.listing_default_fields + ['hostname', 'port', 'site_name', 'root_page',
                                                                       'is_default_site', 'menu', 'header', 'footer',
                                                                       'redirects', 'pages']
    nested_default_fields = BaseAPIEndpoint.nested_default_fields + ['hostname']
    name = 'sites'
    model = get_document_model()

    def get_queryset(self):
        return self.model.objects.all().order_by('id')


from wagtail.wagtailcore.models import Page

# Create the router. "wagtailapi" is the URL namespace
api_router = WagtailAPIRouter('wagtailapi')

# Add the three endpoints using the "register_endpoint" method.
# The first parameter is the name of the endpoint (eg. pages, images). This
# is used in the URL of the endpoint
# The second parameter is the endpoint class that handles the requests

class OneYouPagesAPIEndpoint(PagesAPIEndpoint):
  def get_object(self):
    lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
    page_id = self.kwargs[lookup_url_kwarg]

    base = Page.objects.get(id=page_id)
    return base.specific

api_router.register_endpoint('pages', OneYouPagesAPIEndpoint)
api_router.register_endpoint('images', ImagesAPIEndpoint)
api_router.register_endpoint('documents', DocumentsAPIEndpoint)
api_router.register_endpoint('sites', SitesAPIEndpoint)
