from .models import Release, ReleaseContent, ReleasePage


def create_test_release(release_name="Test release", release_date=None, base_release=None):
  release = Release(release_name=release_name, release_time=release_date, base_release=base_release)
  release.save()
  return release

def create_test_release_content(release, content):
  release_content = ReleaseContent(release=release, content=content)
  release_content.save()
  return release_content

def create_test_release_page(release, page):
  release_page = ReleasePage(release=release, revision=page)
  release_page.save()
  return release_page