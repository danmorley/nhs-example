import uuid
from datetime import datetime, timedelta

from wagtail.tests.utils import WagtailPageTests

from pages.factories import create_test_page, create_test_theme
from pages.models import OneYou2Page, Theme

from release.factories import create_test_release
from release.models import Release

class ReleaseModelTests(WagtailPageTests):

  def test_save_doesnt_update_page_ref_if_exists(self):
    release = Release(release_name="Test release")
    original_uuid = str(uuid.uuid4())
    release.uuid = original_uuid

    self.assertIsNotNone(release.uuid)
    self.assertIsNot(release.uuid, '')

    release.save()

    loadedRelease = Release.objects.get(release_name="Test release")

    self.assertEqual(loadedRelease.uuid, original_uuid)


  def test_save_creates_page_ref_if_doesnt_exists(self):
    release = Release(release_name="Test release")
    
    self.assertIs(release.uuid, '')

    release.save()

    loadedRelease = Release.objects.get(release_name="Test release")

    self.assertIsNot(loadedRelease.uuid, None)


  def test_to_dict(self):
    """
    to_dict method should return a dictionary representing the object
    """
    test_name = "Test release"
    test_date = datetime.now()
    release = create_test_release(test_name, test_date)
    release_dict = release.dict()
    self.assertIs(release_dict['release_name'], test_name)
    self.assertEqual(release_dict['release_time'], test_date.timestamp())

  def test_to_dict_removes_empty_fields(self):
    """
    to_dict method should return a dictionary representing the object
    """
    test_name = "Test release"
    release = create_test_release(test_name)
    release_dict = release.dict()
    self.assertIs(release_dict['release_name'], test_name)
    self.assertFalse('release_time' in release_dict)


  def test_on_create_release_is_linked_to_all_current_pages(self):
    """
    when a new release is created it should be linked to the latest revisions of all live pages.
    """
    page = create_test_page()

    release = create_test_release()

    count_of_pages = OneYou2Page.objects.count()

    self.assertEqual(count_of_pages, release.revisions.count())
    self.assertEqual(page.get_latest_revision().id, release.revisions.first().revision.id)
