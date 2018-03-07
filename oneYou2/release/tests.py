import uuid
from datetime import datetime, timedelta

from oneYou2.tests.utils import OneYouTests

from pages.factories import create_test_page, create_test_theme
from pages.models import OneYou2Page, Theme

from release.factories import create_test_release
from release.models import Release



class ReleaseModelTests(OneYouTests):

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
    self.assertIsFalse('release_time' in release_dict)


  def test_on_create_release_is_linked_to_all_current_pages(self):
    """
    when a new release is created it should be linked to the latest revisions of all live pages.
    """
    page = create_test_page()

    release = create_test_release()

    count_of_pages = OneYou2Page.objects.count()

    self.assertEqual(count_of_pages, release.revisions.count())
    self.assertEqual(page.get_latest_revision().id, release.revisions.first().revision.id)

  def test_release_doesnt_lock_content_if_no_release_time_set(self):
    """
    when a release is requested with no release date, it should not save the content into json.
    """
    create_test_page()

    release_name = "Unset release"

    create_test_release(release_name)

    loaded_release = Release.objects.get(release_name=release_name)

    self.assertEqual(loaded_release.content.count(), 0)


  def test_release_doesnt_lock_content_before_its_release_time(self):

    """
    when a release is requested before its release date, it should not save the content into json.
    """
    create_test_page()

    release_name = "Future release"
    release_date = datetime.now() + timedelta(days=1)

    create_test_release(release_name, release_date)

    loaded_release = Release.objects.get(release_name=release_name)

    self.assertEqual(loaded_release.content.count(), 0)


  def test_release_locks_content_after_its_release_time(self):

    """
    when a release is requested after its release date, it should save the content into json.
    """
    create_test_page()

    release_name = "Past release"
    release_date = datetime.now() + timedelta(days=-1)

    create_test_release(release_name, release_date)

    loaded_release = Release.objects.get(release_name=release_name)

    self.assertEqual(loaded_release.content.count(), 1)

  def test_release_initialised_from_a_base_release_gets_revisions_from_base(self):
    """
    when a release is initialised from an existing release as a base it gets linked to the same pages the base release
    is linked to at that point.
    """
    page = create_test_page()

    release_name = "Base release"

    base_release = create_test_release(release_name)

    page.save_revision().publish()

    self.assertEquals(base_release.revisions. count(), 1)

    new_release = create_test_release(base_release=base_release)

    self.assertEquals(new_release.revisions.count(), 1)
    self.assertEquals(base_release.revisions.first().revision.id, new_release.revisions.first().revision.id)


