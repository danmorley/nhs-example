import json

import re
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.template.response import TemplateResponse
from django.views.decorators.http import require_safe

from oneYou2.serializers import SiteSerializer

from release.utils import get_latest_live_release, get_release_object, populate_release_if_required

from pages.serializers import OneYouPageListSerializer, OneYouPageSerializer

from wagtail.core.models import Page, Site

from experiments.models import ExperimentsContent
from .utils import get_site_or_404


# Release is basically implicit, menus/footers etc should be attached to something else
# TODO: Refactor (release and site are realistically the wrong way round)


# TODO: Detect content type
# TODO: Test HTTP methods
@require_safe
def site_view(request, site_identifier):
    site = get_site_or_404(site_identifier)

    current_release = get_latest_live_release(site.site.pk)
    if not current_release:
        return JsonResponse({'message': "The current site has no live releases"}, status=404)

    populate_release_if_required(current_release)

    json_response = JsonResponse(current_release.get_content_for('site_json'))
    if current_release.content_status == 1:
        json_response['Cache-Control'] = 'max-age=900'
    return json_response


@require_safe
def release_view(request, site_identifier, release_uuid):
    site = get_site_or_404(site_identifier)

    if release_uuid == "current":
        release_object = get_latest_live_release(site.site.pk)
        if not release_object:
            return JsonResponse({'message': "The current site has no live releases"}, status=404)
        release_uuid = release_object.uuid
    else:
        # Request is asking for a specific release
        release_object = get_release_object(release_uuid)
        if not release_object:
            return JsonResponse({'message': "Release not found"}, status=404)
        else:
            return JsonResponse(release_object.get_content_for("site_json"))

    serialized_site_data = SiteSerializer(site).data
    json_response = JsonResponse(serialized_site_data)
    if release_object.content_status == 1:
        json_response['Cache-Control'] = 'max-age=3600'
    return json_response


@require_safe
def page_list(request, site_identifier, release_uuid):
    """The frontend shouldn't call this, iterating through release pages is not optimal"""
    # Ideally the react client would never need to use this endpoint
    get_site_or_404(site_identifier)
    release = get_release_object(release_uuid)
    if not release:
        return JsonResponse({'message': "Release not found"}, status=404)
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
    json_response = JsonResponse(page_data)
    return json_response


@require_safe
def full_page_list(request, site_identifier):
    """The frontend shouldn't call this, iterating through release pages is not optimal"""
    # Ideally the react client would never need to use this endpoint
    get_site_or_404(site_identifier)

    pages = Page.objects.all()
    serialized_page_data = []
    for page in pages:
        serialized_page_data.append(json.loads(page.to_json()))
    page_data = {
        "meta": {
            "total_count": len(pages)
        },
        "items": serialized_page_data
    }
    return JsonResponse(page_data)


@require_safe
def page_detail(request, site_identifier, release_uuid, page_pk=None, page_slug=None):
    """RETURN PAGE DETAILS IN API"""
    # Match variants, a variant's slug should end with -v and then a truncated hash of 6 characters
    variant_regex = re.compile(r"-v[a-zA-Z0-9]{6}$")

    if page_slug:
        if variant_regex.search(page_slug):
            variant = True
            not_found_msg = "Variant Not Found"
        else:
            variant = False
            not_found_msg = "Page Not Found"

        try:
            # This somewhat defeats the point of freezing content
            # TODO: Fix this, you can do this by freezing content with slug keys
            # You would then only need to get the page object for variants
            page = Page.objects.get(slug=page_slug)
            page_pk = page.pk
        except ObjectDoesNotExist:
            try:
                if variant:  # Try and get parent page
                    page = Page.objects.get(slug=page_slug[:-8])
                    page_pk = page.pk
                    variant = False
                else:
                    return JsonResponse({'message': not_found_msg}, status=404)
            except ObjectDoesNotExist:
                return JsonResponse({'message': not_found_msg}, status=404)
    else:  # If there is no slug it cannot be a variant
        variant = False
        not_found_msg = "Page Not Found"

    get_site_or_404(site_identifier)
    release = get_release_object(release_uuid)
    if not release:
        return JsonResponse({'message': "Release not found"}, status=404)
    populate_release_if_required(release)

    if variant:
        try:
            experiments_content = ExperimentsContent.objects.first()
            if experiments_content:
                if page.specific.is_live:
                    page_content = experiments_content.get_content_for(page_pk)
                else:
                    # Get parent page content
                    print("scenario 2")
                    page_content = release.get_content_for(page.get_parent().id)
            else:
                return JsonResponse({'message': "No content for any experiment found"}, status=500)
        except KeyError:
            return JsonResponse({'message': not_found_msg}, status=404)

    else:
        try:
            page_content = release.get_content_for(page_pk)
        except KeyError:
            return JsonResponse({'message': not_found_msg}, status=404)

    json_response = JsonResponse(page_content)
    if release.content_status == 1:
        json_response['Cache-Control'] = 'max-age=3600'
    return json_response


@require_safe
def home_page_detail(request, site_identifier, release_uuid):
    """Because the home page lives on a hardcoded / url"""
    # NOT SURE THIS IS USED ANYMORE
    return page_detail(request, site_identifier, release_uuid, page_slug="home")


@require_safe
def page_preview(request, site_identifier, page_slug):
    site = Site.objects.get(site_name=site_identifier)
    pages = Page.objects.filter(slug=page_slug)
    page = [p for p in pages if p.get_site().pk == site.id][0]
    serialized_page = OneYouPageSerializer(instance=page.specific.get_latest_revision_as_page())
    return JsonResponse(serialized_page.data)


@require_safe
def robots(request):
    if "service" in request.get_host():
        return TemplateResponse(request, 'robots-disallow.txt',)
    else:
        return TemplateResponse(request, 'robots-allow.txt', )
