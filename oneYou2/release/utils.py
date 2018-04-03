import json
from datetime import datetime

from release.models import Release, ReleaseContent
from rest_framework.response import Response


def get_latest_release(site_id):
    """Helper function to return the latest release by date"""
    # TODO: test this
    released = Release.objects.order_by('-release_time').filter(release_time__lte=datetime.now(), site_id=site_id)
    latest_release = released.first()
    return latest_release


def get_release_object(uuid):
    """Helper function to get a specific release by uuid"""
    release = Release.objects.filter(uuid=uuid).first()
    return release


def populate_release_if_required(release):
    # This could be a class method
    if release.release_date_has_passed() and release.content_status == 0:
        pages = release.generate_fixed_content()
        rc = ReleaseContent(release=release, content=json.dumps(pages))
        rc.save()
        release.content_status = 1
        release.save()

    return release


def cached_response(content, should_cache):
    response = Response(content)
    if should_cache:
        response['Cache-Control'] = 'max-age=3600'  # Cache for 1 hour

    return response
