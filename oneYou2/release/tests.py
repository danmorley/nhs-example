import uuid
from datetime import datetime

from wagtail.tests.utils import WagtailPageTests
from wagtail.wagtailcore.models import Page

from pages.models import OneYou2Page, Theme

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
    release = Release(release_name=test_name, release_time=test_date)
    release_dict = release.dict()
    self.assertIs(release_dict['release_name'], test_name)
    self.assertEqual(release_dict['release_time'], test_date.timestamp())

  def test_to_dict_removes_empty_fields(self):
    """
    to_dict method should return a dictionary representing the object
    """
    test_name = "Test release"
    release = Release(release_name=test_name)
    release_dict = release.dict()
    self.assertIs(release_dict['release_name'], test_name)
    self.assertFalse('release_time' in release_dict)


  def test_on_create_release_is_linked_to_all_current_pages(self):
    """
    when a new release is created it should be linked to the latest revisions of all live pages.
    """
    theme = Theme(label='Theme name', class_name='theme-class')
    theme.save()

    root_page = Page.get_root_nodes()[0]

    page = OneYou2Page(title="Test page", path='1111', depth=0, theme=theme)
    root_page.add_child(instance=page)
    page.save_revision().publish()
    page.save()

    release = Release(release_name="Test name")
    release.save()

    count_of_pages = OneYou2Page.objects.count()

    self.assertEqual(count_of_pages, release.pages.count())
    self.assertEqual(page.get_latest_revision().id, release.revisions.first().id)
