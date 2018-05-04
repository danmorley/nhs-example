import json
from datetime import datetime

from release.models import Release, ReleaseContent


def get_latest_release(site_id):
    """Helper function to return the latest release by date"""
    # TODO: test this
    released = Release.objects.order_by('-release_time').filter(release_time__lte=datetime.now(), site__id=site_id)
    latest_release = released.first()
    return latest_release


def get_release_object(uuid):
    """Helper function to get a specific release by uuid"""
    release = Release.objects.filter(uuid=uuid).first()
    return release


def populate_release_if_required(release):
    # This could be a class method
    if release.release_date_has_passed() and release.content_status == 0:
        release_content = release.content.first()
        content = json.loads(release_content.content)
        content['site_json'] = release.generate_fixed_site_meta()
        release_content.content = json.dumps(content)
        release_content.save()
        release.content_status = 1
        release.save()

    return release
