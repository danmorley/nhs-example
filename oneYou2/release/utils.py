from datetime import datetime

from release.models import Release


def get_latest_release():
    """Helper function to return the latest release by date"""
    # TODO: test this
    released = Release.objects.order_by('-release_time').filter(release_time__lte=datetime.now())
    latest_release = released.first()
    return latest_release
