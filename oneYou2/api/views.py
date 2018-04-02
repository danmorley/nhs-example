import json

from django.http import HttpResponse, Http404
from django.views.decorators.http import require_safe

from oneYou2.serializers import SiteSerializer
from release.utils import get_latest_release, get_release_object, populate_release_if_required
from release.exceptions import NoReleasesFound
from pages.serializers import OneYouPageListSerializer

from .utils import get_site_or_404

# Release is basically implicit, menus/footers etc should be attached to something else
# TODO: Refactor (release and site are realistically the wrong way round)


# TODO: Detect content type
# TODO: Test HTTP methods
@require_safe
def site_view(request, site_identifier):
    site = get_site_or_404(site_identifier)

    current_release = get_latest_release(site.site.pk)
    if not current_release:
        raise NoReleasesFound("The current site has no live releases")
    setattr(site, 'release_uuid', current_release.uuid)

    serialized_site_data = SiteSerializer(site).data
    return HttpResponse(json.dumps(serialized_site_data), content_type="application/json")


@require_safe
def release_view(request, site_identifier, release_uuid):
    site = get_site_or_404(site_identifier)

    if release_uuid == "current":
        current_release = get_latest_release(site.site.pk)
        if not current_release:
            raise NoReleasesFound("The current site has no live releases")
        release_uuid = current_release.uuid

    else:
        # Request is asking for a specific release
        release_object = get_release_object(release_uuid)
        if not release_object:
            raise Http404("Release Not Found")

    setattr(site, 'release_uuid', release_uuid)

    serialized_site_data = SiteSerializer(site).data
    return HttpResponse(json.dumps(serialized_site_data), content_type="application/json")


@require_safe
def page_list(request, site_identifier, release_uuid):
    # Ideally the react client would never need to use this endpoint
    get_site_or_404(site_identifier)
    release = get_release_object(release_uuid)
    populate_release_if_required(release)
    if not release:
        raise Http404("Release Not Found")

    pages = release.revisions.all()
    serialized_page_data = OneYouPageListSerializer(pages, many=True).data
    page_data = {
        "meta": {
            "total_count": len(pages)
        },
        "items": serialized_page_data
    }
    return HttpResponse(json.dumps(page_data), content_type="application/json")


@require_safe
def page_detail(request, site_identifier, release_uuid, page_pk):
    get_site_or_404(site_identifier)
    release = get_release_object(release_uuid)
    if not release:
        raise Http404("Release Not Found")

    try:
        page_content = release.get_content_for(page_pk)
    except KeyError:
        raise Http404("Page Not Found In Release")

    return HttpResponse(json.dumps(page_content), content_type="application/json")
