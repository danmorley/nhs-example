from .models import Release


def create_test_release(release_name="Test release", release_date=None):
  release = Release(release_name=release_name, release_time=release_date)
  release.save()
  return release