from collections import OrderedDict
from datetime import datetime

from release.models import Release


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

