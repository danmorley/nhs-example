import json
import uuid

from datetime import datetime, timedelta
from unittest.mock import patch

from django.utils import timezone

from oneYou2.tests.utils import OneYouTests

from pages.factories import create_test_page
from pages.models import OneYou2Page

from release.factories import create_test_release, create_test_release_content, create_test_release_page
from release.models import Release
from release.utils import get_release_object, get_latest_release


@patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
class ReleaseModelTests(OneYouTests):

    def test_save_doesnt_update_page_ref_if_exists(self, mock_file_service):
        release = Release(release_name="Test release", site_id=2)
        original_uuid = str(uuid.uuid4())
        release.uuid = original_uuid

        self.assertIsNotNone(release.uuid)
        self.assertIsNot(release.uuid, '')

        release.save()

        loadedRelease = Release.objects.get(release_name="Test release")

        self.assertEqual(loadedRelease.uuid, original_uuid)

    def test_save_creates_page_ref_if_doesnt_exists(self, mock_file_service):
        release = Release(release_name="Test release", site_id=2)

        self.assertIs(release.uuid, '')

        release.save()

        loadedRelease = Release.objects.get(release_name="Test release")

        self.assertIsNot(loadedRelease.uuid, None)

    def test_to_dict(self, mock_file_service):
        """
        to_dict method should return a dictionary representing the object
        """
        test_name = "Test release"
        test_date = datetime.now()
        release = create_test_release(test_name, test_date)
        release_dict = release.dict()
        self.assertIs(release_dict['release_name'], test_name)
        self.assertEqual(release_dict['release_time'], test_date.timestamp())

    def test_to_dict_removes_empty_fields(self, mock_file_service):
        """
        to_dict method should return a dictionary representing the object
        """
        test_name = "Test release"
        release = create_test_release(test_name)
        release_dict = release.dict()
        self.assertIs(release_dict['release_name'], test_name)
        self.assertIsFalse('release_time' in release_dict)

    def test_on_create_release_is_linked_to_all_current_pages(self, mock_file_service):
        """
        when a new release is created it should be linked to the latest revisions of all live pages.
        """
        page = create_test_page()

        release = create_test_release()

        count_of_pages = OneYou2Page.objects.count()

        self.assertEqual(count_of_pages, release.revisions.count())
        self.assertEqual(page.get_latest_revision().id, release.revisions.first().revision.id)

    def test_release_doesnt_lock_content_if_no_release_time_set(self, mock_file_service):
        """
        when a release is requested with no release date, it should not save the content into json.
        """
        create_test_page()

        release_name = "Unset release"

        create_test_release(release_name)

        loaded_release = Release.objects.get(release_name=release_name)

        self.assertEqual(loaded_release.content.count(), 0)

    def test_release_doesnt_lock_content_before_its_release_time(self, mock_file_service):

        """
        when a release is requested before its release date, it should not save the content into json.
        """
        create_test_page()

        release_name = "Future release"
        release_date = datetime.now() + timedelta(days=1)

        create_test_release(release_name, release_date)

        loaded_release = Release.objects.get(release_name=release_name)

        self.assertEqual(loaded_release.content.count(), 0)

    def test_release_locks_content_after_its_release_time(self, mock_file_service):

        """
        when a release is requested after its release date, it should save the content into json.
        """
        create_test_page()

        release_name = "Past release"
        release_date = datetime.now() + timedelta(days=-1)

        create_test_release(release_name, release_date)

        loaded_release = Release.objects.get(release_name=release_name)

        self.assertEqual(loaded_release.content.count(), 1)

    def test_release_initialised_from_a_base_release_gets_revisions_from_base(self, mock_file_service):
        """
        when a release is initialised from an existing release as a base it gets linked to the same pages the base
        release is linked to at that point.
        """
        page = create_test_page()

        release_name = "Base release"

        base_release = create_test_release(release_name)

        page.save_revision().publish()

        self.assertEquals(base_release.revisions.count(), 1)

        new_release = create_test_release(base_release=base_release)

        self.assertEquals(new_release.revisions.count(), 1)
        self.assertEquals(base_release.revisions.first().revision.id, new_release.revisions.first().revision.id)

    def test_is_released_returns_false_if_now_date_set(self, mock_file_service):
        """
        the is released function should return false if the release date hasn't been set.
        """
        release = create_test_release()

        self.assertIsFalse(release.is_released())

    def test_is_released_returns_false_if_date_is_in_the_future(self, mock_file_service):
        """
        the is released function should return false if the release date is in the future.
        """
        release = create_test_release()
        release.release_time = timezone.now() + timedelta(days=1)

        self.assertIsFalse(release.is_released())

    def test_is_released_returns_true_if_date_is_in_the_past(self, mock_file_service):
        """
        the is released function should return true if the release date is in the past.
        """
        release = create_test_release()
        release.release_time = timezone.now() + timedelta(days=-1)

        self.assertIsTrue(release.is_released())

    def test_remove_page_removes_the_linked_revision_of_the_page_from_the_release(self, mock_file_service):
        """
        the remove page function should remove any linked revisions of that page from the release.
        """
        page1 = create_test_page(title="Page 1")
        page2 = create_test_page(title="Page 2", path='1112')

        release = create_test_release()

        page1_in_release = False
        page2_in_release = False

        for revision in release.revisions.all():
            if revision.revision.page_id == page1.id:
                page1_in_release = True
            if revision.revision.page_id == page2.id:
                page2_in_release = True

        self.assertIsTrue(page1_in_release)
        self.assertIsTrue(page2_in_release)

        release.remove_page(page2.id)

        page1_in_release = False
        page2_in_release = False

        for revision in release.revisions.all():
            if revision.revision.page_id == page1.id:
                page1_in_release = True
            if revision.revision.page_id == page2.id:
                page2_in_release = True

        self.assertIsTrue(page1_in_release)
        self.assertIsFalse(page2_in_release)

    def test_remove_page_does_nothing_if_the_page_is_not_in_the_release(self, mock_file_service):
        """
        the remove page function should not remove anything if the page is not in the release.
        """
        page1 = create_test_page(title="Page 1")
        page2 = create_test_page(title="Page 2", path='1112')

        release = create_test_release()

        page3 = create_test_page(title="Page 3", path='1113')

        page1_in_release = False
        page2_in_release = False
        page3_in_release = False

        for revision in release.revisions.all():
            if revision.revision.page_id == page1.id:
                page1_in_release = True
            if revision.revision.page_id == page2.id:
                page2_in_release = True
            if revision.revision.page_id == page3.id:
                page3_in_release = True

        self.assertIsTrue(page1_in_release)
        self.assertIsTrue(page2_in_release)
        self.assertIsFalse(page3_in_release)

        release.remove_page(page3.id)

        page1_in_release = False
        page2_in_release = False
        page3_in_release = False

        for revision in release.revisions.all():
            if revision.revision.page_id == page1.id:
                page1_in_release = True
            if revision.revision.page_id == page2.id:
                page2_in_release = True
            if revision.revision.page_id == page3.id:
                page3_in_release = True

        self.assertIsTrue(page1_in_release)
        self.assertIsTrue(page2_in_release)
        self.assertIsFalse(page3_in_release)

    def test_add_revision_replaces_the_linked_revision_of_a_page_with_the_new_revision(self, mock_file_service):
        """
        when a revision is added to a release it replaces the existing revision linked to the release.
        """
        page = create_test_page()
        initial_revision = page.get_latest_revision()

        self.assertIsNotNone(initial_revision)

        release = create_test_release()

        initial_revision_in_release = False
        for revision in release.revisions.all():
            if revision.revision.id == initial_revision.id:
                initial_revision_in_release = True

        self.assertIsTrue(initial_revision_in_release)

        page.save_revision().publish()
        second_revision = page.get_latest_revision()

        self.assertNotEqual(initial_revision.id, second_revision.id)

        release.add_revision(second_revision)

        initial_revision_in_release = False
        second_revision_in_release = False
        for revision in release.revisions.all():
            if revision.revision.id == initial_revision.id:
                initial_revision_in_release = True
            if revision.revision.id == second_revision.id:
                second_revision_in_release = True

        self.assertIsFalse(initial_revision_in_release)
        self.assertIsTrue(second_revision_in_release)

    def test_add_revision_creates_a_new_link_if_the_page_not_already_in_the_release(self, mock_file_service):
        """
        when a revision is added to a release it creates a new link if the page not already linked to the release.
        """
        page = create_test_page()
        initial_revision = page.get_latest_revision()

        self.assertIsNotNone(initial_revision)

        release = create_test_release()

        initial_revision_in_release = False
        for revision in release.revisions.all():
            if revision.revision.id == initial_revision.id:
                initial_revision_in_release = True

        self.assertIsTrue(initial_revision_in_release)
        self.assertEqual(release.revisions.count(), 1)

        page2 = create_test_page(title='Page 2', path='1112')
        second_revision = page2.get_latest_revision()

        release.add_revision(second_revision)

        initial_revision_in_release = False
        second_revision_in_release = False
        for revision in release.revisions.all():
            if revision.revision.id == initial_revision.id:
                initial_revision_in_release = True
            if revision.revision.id == second_revision.id:
                second_revision_in_release = True

        self.assertEqual(release.revisions.count(), 2)
        self.assertIsTrue(initial_revision_in_release)
        self.assertIsTrue(second_revision_in_release)

    def test_release_loads_none_object_if_the_requested_page_isnt_in_release(self, mock_file_service):
        """
        When content is requested for a release that isn't included in the release a None object should be returned.
        """
        release = create_test_release()

        release_page_content = release.get_content_for(0)

        self.assertIsNone(release_page_content)

    def test_release_loads_content_from_tables_if_not_yet_released(self, mock_file_service):
        """
        When content is requested for a release before it is released it should load the content from the related tables
        not from locked content. Tested by checking that before it is released it returns any content, because before
        its released there is not locked content to load from.
        """
        page = create_test_page()
        revision = page.get_latest_revision()

        release_time = timezone.now() + timedelta(days=1)
        release = create_test_release(release_date=release_time)

        release_page_content = release.get_content_for(page.id)

        self.assertIsNotNone(release_page_content)
        self.assertEqual(release_page_content['title'], json.loads(revision.content_json)['title'])

    def test_release_loads_content_from_locked_content_if_released(self, mock_file_service):
        """
        When content is requested for a release after it is released it should load the content from the locked content
        not from the releated tables.
        """
        initial_title = "Test page"
        page = create_test_page(initial_title)
        revision = page.get_latest_revision()

        release_time = timezone.now() + timedelta(days=-1)
        release = create_test_release(release_date=release_time)

        loaded_release = Release.objects.get(id=release.id)

        second_title = "Altered page"
        page.title = second_title
        revision.content_json = page.to_json()
        revision.save()

        release_page_content = loaded_release.get_content_for(page.id)

        self.assertIsNotNone(release_page_content)
        self.assertNotEqual(json.loads(revision.content_json)['title'], initial_title)
        self.assertEqual(release_page_content['title'], initial_title)


@patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
class ReleaseContentModelTests(OneYouTests):
    def test_release_content_can_return_a_requested_page(self, mock_file_service):
        """
        When a specific page is requested from the locked content it should be retrievable.
        """
        page = create_test_page(title="First Page")
        self.assertIsNotNone(page.get_latest_revision())

        release = create_test_release()

        release_content = create_test_release_content(release, json.dumps(release.generate_fixed_content()))
        loaded_page_content = release_content.get_content_for(str(page.id))

        self.assertEqual(page.title, loaded_page_content['title'])

    def test_release_content_returns_none_if_the_requested_page_not_in_release(self, mock_file_service):
        """
        When a page is requested that isn't included in a release a None object should be returned.
        """
        release = create_test_release()

        release_content = create_test_release_content(release, json.dumps(release.generate_fixed_content()))
        loaded_page_content = release_content.get_content_for('0')

        self.assertIsNone(loaded_page_content)


@patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
class ReleasePageModelTests(OneYouTests):
    def test_a_release_page_object_returns_associated_release(self, mock_file_service):
        release = create_test_release()

        page = create_test_page()
        revision = page.get_latest_revision()

        release_page = create_test_release_page(release, revision)

        self.assertEqual(type(revision), type(release_page.revision))
        self.assertEqual(type(release), type(release_page.release))


@patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
class ReleaseUtilsTests(OneYouTests):
    def test_get_release_object_returns_the_correct_release(self, mock_file_service):
        release = create_test_release()

        release_uuid = release.uuid

        loaded_release = get_release_object(release_uuid)

        self.assertEqual(release.id, loaded_release.id)
        self.assertEqual(release.release_name, loaded_release.release_name)

    def test_get_latest_release_returns_the_newest_published_release(self, mock_file_service):
        """
        A published release is one whose release_time is in the past.
        """
        release1_name = "Old release"
        release1_date = datetime.now() + timedelta(days=-10)
        release1 = create_test_release(release_name=release1_name, release_date=release1_date)

        release2_name = "Current release"
        release2_date = datetime.now() + timedelta(days=-1)
        release2 = create_test_release(release_name=release2_name, release_date=release2_date)

        release3_name = "Future release"
        release3_date = datetime.now() + timedelta(days=+10)
        release3 = create_test_release(release_name=release3_name, release_date=release3_date)

        current_release = get_latest_release(release1.site_id)

        self.assertIsTrue(release1.is_released())
        self.assertIsTrue(release2.is_released())
        self.assertIsFalsee(release3.is_released())

        self.assertEqual(current_release.id, release2.id)
