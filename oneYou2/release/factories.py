from .models import Release


def create_test_release(release_name="Test release"):
  release = Release(release_name=release_name)
  release.save()
  return release