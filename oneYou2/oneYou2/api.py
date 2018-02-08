from collections import OrderedDict

from wagtail.api.v2.endpoints import PagesAPIEndpoint
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.api.v2.serializers import BaseSerializer
from wagtail.wagtailcore.models import Site
from wagtail.wagtaildocs.models import get_document_model
from wagtail.wagtailimages.api.v2.endpoints import ImagesAPIEndpoint
from wagtail.wagtaildocs.api.v2.endpoints import DocumentsAPIEndpoint
from wagtail.api.v2.endpoints import BaseAPIEndpoint
from wagtail.api.v2.filters import FieldsFilter, OrderingFilter, SearchFilter
from rest_framework.fields import Field


class DocumentDownloadUrlField(Field):
    """
    Serializes the "download_url" field for documents.

    Example:
    "download_url": "http://api.example.com/documents/1/my_document.pdf"
    """
    def get_attribute(self, instance):
        return instance

    def to_representation(self, document):
        return "x"


class SiteSerializer(BaseSerializer):
    hostname = DocumentDownloadUrlField(read_only=True)


# There is no default sites endpoint
class SitesAPIEndpoint(BaseAPIEndpoint):
    def __init__(self, *args, **kwargs):
        super(BaseAPIEndpoint, self).__init__(*args, **kwargs)
        self.model = Site
        self.seen_types = OrderedDict()

    base_serializer_class = SiteSerializer
    filter_backends = [FieldsFilter, OrderingFilter, SearchFilter]
    body_fields = BaseAPIEndpoint.body_fields + ['hostname', 'port', 'site_name', 'root_page', 'is_default_site']
    meta_fields = BaseAPIEndpoint.meta_fields + ['hostname']
    listing_default_fields = BaseAPIEndpoint.listing_default_fields + ['hostname', 'port', 'site_name', 'root_page',
                                                                       'is_default_site']
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
