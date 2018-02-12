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
        menu_settings = SiteSettings.objects.get(site=document)
        # TODO: You originally did one query for all pages, now you are doing one query for all pages and
        # then a query for each page, so queries is n+1, FIX IT!
        page_ids_slugs = {}
        for d in Page.objects.values('id', 'slug'):
            page_ids_slugs[d['id']] = d['slug']
        json_menu = menu_settings.menu.menu_items.stream_data

        for menu_item in json_menu:
            multimenu = menu_item['value'].get('menu_items')
            if multimenu:
                for multimenu_item in multimenu:
                    page_id = multimenu_item['value'].get('link_page')
                    if page_id:
                        page = Page.objects.get(id=page_id)
                        multimenu_item['value']['link_slug'] = page_ids_slugs[page_id]
                        multimenu_item['value']['link_path'] = page.url_path.replace('/home', '')
                    else:
                        multimenu_item['value']['link_slug'] = None
            else:
                # simple_menu_item
                page_id = menu_item['value'].get('link_page')

                if page_id:
                    page = Page.objects.get(id=page_id)
                    menu_item['value']['link_slug'] = page_ids_slugs[page_id]
                    menu_item['value']['link_path'] = page.url_path.replace('/home', '')
                else:
                    menu_item['value']['link_slug'] = None

        return json_menu


class RedirectField(Field):
    def get_attribute(self, instance):
        return instance

    def to_representation(self, document):
        redirects = Redirect.get_for_site(site=document)
        redirects_dict = {}
        for redirect in redirects:
            redirects_dict[redirect.old_path] = redirect.link.replace('http://localhost', '')

        return redirects_dict


class SiteSerializer(BaseSerializer):
    menu = MenuField(read_only=True)
    redirects = RedirectField(read_only=True)


# There is no default sites endpoint
class SitesAPIEndpoint(BaseAPIEndpoint):
    def __init__(self, *args, **kwargs):
        super(BaseAPIEndpoint, self).__init__(*args, **kwargs)
        self.model = Site
        self.seen_types = OrderedDict()

    base_serializer_class = SiteSerializer
    filter_backends = [FieldsFilter, OrderingFilter, SearchFilter]
    body_fields = BaseAPIEndpoint.body_fields + ['hostname', 'port', 'site_name', 'root_page', 'is_default_site',
                                                 'menu', 'redirects']
    meta_fields = BaseAPIEndpoint.meta_fields + ['hostname']
    listing_default_fields = BaseAPIEndpoint.listing_default_fields + ['hostname', 'port', 'site_name', 'root_page',
                                                                       'is_default_site', 'menu', 'redirects']
    nested_default_fields = BaseAPIEndpoint.nested_default_fields + ['hostname']
    name = 'sites'
    model = get_document_model()

    def get_queryset(self):
        return self.model.objects.all().order_by('id')


# Create the router. "wagtailapi" is the URL namespace
api_router = WagtailAPIRouter('wagtailapi')

# Add the three endpoints using the "register_endpoint" method.
# The first parameter is the name of the endpoint (eg. pages, images). This
# is used in the URL of the endpoint
# The second parameter is the endpoint class that handles the requests


api_router.register_endpoint('pages', PagesAPIEndpoint)
api_router.register_endpoint('images', ImagesAPIEndpoint)
api_router.register_endpoint('documents', DocumentsAPIEndpoint)
api_router.register_endpoint('sites', SitesAPIEndpoint)
