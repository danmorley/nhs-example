import json

from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django.views.decorators.http import require_safe

from oneYou2.serializers import SiteSerializer

from release.utils import get_latest_release, get_release_object, populate_release_if_required

from pages.serializers import OneYouPageListSerializer, OneYouPageSerializer

from wagtail.wagtailcore.models import Page, Site

from .utils import get_site_or_404, set_cache_headers


# Release is basically implicit, menus/footers etc should be attached to something else
# TODO: Refactor (release and site are realistically the wrong way round)


# TODO: Detect content type
# TODO: Test HTTP methods
@require_safe
def site_view(request, site_identifier):
    site = get_site_or_404(site_identifier)

    current_release = get_latest_release(site.site.pk)
    if not current_release:
        return HttpResponse("The current site has no live releases", status=404)
    setattr(site, 'release_uuid', current_release.uuid)

    serialized_site_data = SiteSerializer(site).data
    return HttpResponse(json.dumps(serialized_site_data), content_type="application/json")


@require_safe
@set_cache_headers
def release_view(request, site_identifier, release_uuid):
    site = get_site_or_404(site_identifier)

    if release_uuid == "current":
        current_release = get_latest_release(site.site.pk)
        if not current_release:
            return HttpResponse("The current site has no live releases", status=404)
        release_uuid = current_release.uuid

    else:
        # Request is asking for a specific release
        release_object = get_release_object(release_uuid)
        if not release_object:
            return HttpResponse("Release not found", status=404)

    setattr(site, 'release_uuid', release_uuid)

    serialized_site_data = SiteSerializer(site).data
    return HttpResponse(json.dumps(serialized_site_data), content_type="application/json")


@require_safe
@set_cache_headers
def page_list(request, site_identifier, release_uuid):
    """The frontend shouldn't call this, iterating through release pages is not optimal"""
    # Ideally the react client would never need to use this endpoint
    get_site_or_404(site_identifier)
    release = get_release_object(release_uuid)
    if not release:
        return HttpResponse("Release not found", status=404)
    populate_release_if_required(release)

    release_pages = release.revisions.all()
    pages = [p.revision.as_page_object() for p in release_pages]
    serialized_page_data = OneYouPageListSerializer(pages, many=True).data
    page_data = {
        "meta": {
            "total_count": len(pages)
        },
        "items": serialized_page_data
    }
    return HttpResponse(json.dumps(page_data), content_type="application/json")


@require_safe
@set_cache_headers
def full_page_list(request, site_identifier):
    """The frontend shouldn't call this, iterating through release pages is not optimal"""
    # Ideally the react client would never need to use this endpoint
    get_site_or_404(site_identifier)

    pages = Page.objects.all()
    serialized_page_data = []
    for page in pages:
        serialized_page_data.append(json.loads(page.to_json()))
    return HttpResponse(json.dumps(serialized_page_data), content_type="application/json")


@require_safe
@set_cache_headers
def page_detail(request, site_identifier, release_uuid, page_pk=None, page_slug=None):
    print("loading page - " + page_slug)
    if page_slug:
        try:
            page_pk = Page.objects.get(slug=page_slug).pk
        except ObjectDoesNotExist:
            return HttpResponse("Page Not Found", status=404)

    get_site_or_404(site_identifier)
    release = get_release_object(release_uuid)
    if not release:
        return HttpResponse("Release not found", status=404)
    populate_release_if_required(release)

    try:
        page_content = release.get_content_for(page_pk)
    except KeyError:
        return HttpResponse("Page Not Found", status=404)

    return HttpResponse(json.dumps(page_content), content_type="application/json")


@require_safe
def home_page_detail(request, site_identifier, release_uuid):
    """Because the home page lives on a hardcoded / url"""
    return page_detail(request, site_identifier, release_uuid, page_slug="home")


@require_safe
def page_preview(request, site_identifier, page_slug):
    site = Site.objects.get(site_name=site_identifier)
    pages = Page.objects.filter(slug=page_slug)
    page = [p for p in pages if p.get_site().pk == site.id][0]
    serialized_page = OneYouPageSerializer(instance=page.specific.get_latest_revision_as_page())
    return HttpResponse(json.dumps(serialized_page.data), content_type="application/json")
