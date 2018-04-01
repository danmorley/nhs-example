from wagtail.api.v2.endpoints import PagesAPIEndpoint
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.wagtailcore.models import Page
from wagtail.wagtailimages.api.v2.endpoints import ImagesAPIEndpoint
from wagtail.wagtaildocs.api.v2.endpoints import DocumentsAPIEndpoint


class AltPagesEndpoint(PagesAPIEndpoint):
    """Originally for wagtail internal use, may no longer be required"""
    def get_object(self):
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        page_id = self.kwargs[lookup_url_kwarg]
        base = Page.objects.get(id=page_id)
        return base.specific


# Create the router. "wagtailapi" is the URL namespace
api_router = WagtailAPIRouter('wagtailapi')

api_router.register_endpoint('release_pages', AltPagesEndpoint)

api_router.register_endpoint('images', ImagesAPIEndpoint)
api_router.register_endpoint('documents', DocumentsAPIEndpoint)
