import json

from datetime import timedelta

from django.core.exceptions import ValidationError
from django.core.handlers.wsgi import WSGIRequest
from django.http import HttpRequest
from django.test import Client, override_settings
from django.urls import reverse
from django.utils import timezone

from unittest.mock import patch

from wagtail.contrib.modeladmin.views import IndexView

from home.factories import create_test_site_settings
from home.models import SiteSettings

from oneYou2.factories import create_test_user, create_test_admin_user
from oneYou2.test.utils import OneYouTests

from dctcmsbase.factories import create_test_page
from oneyou.models import OneYouPage

from release.factories import create_test_release, create_test_release_page

from release.models import Release, ReleasePage, validate_in_future, query_set_to_dict
from release.utils import get_release_object, get_latest_live_release, get_latest_release, populate_release_if_required
from release.views import release_html
from release.wagtail_hooks import ReleaseButtonHelper, ReleaseAdmin


index_file = '<head><body>' \
             '<div id="root" data-content-store-endpoint="{{ api_url }}" data-site="{{ site_setting.uid }}" data-release="{{ release_id }}">' \
             '</div></body>'


@patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
class ReleaseModelTests(OneYouTests):

    def test_to_dict(self, mock_file_service):
        """
        to_dict method should return a dictionary representing the object
        """
        test_name = 'Test release'
        test_date = timezone.now()
        release = create_test_release(test_name, test_date)
        release_dict = release.dict()
        self.assertIs(release_dict['release_name'], test_name)
        self.assertEqual(release_dict['release_time'], test_date.timestamp())

    def test_to_dict_removes_empty_fields(self, mock_file_service):
        """
        to_dict method should return a dictionary representing the object
        """
        test_name = 'Test release'
        release = create_test_release(test_name)
        release_dict = release.dict()
        self.assertIs(release_dict['release_name'], test_name)
        self.assertIsFalse('release_time' in release_dict)

    def test_on_create_release_is_linked_to_all_current_pages(self, mock_file_service):
        """
        when a new release is created it should be linked to the latest revisions of all live pages.
        """
        page = create_test_page(OneYouPage)

        release = create_test_release()

        page.release = release
        page.save_revision()

        count_of_pages = OneYouPage.objects.count()

        release_content = release.content.first()
        release_content_dict = json.loads(release_content.content)

        self.assertEqual(count_of_pages, len(release_content_dict))
        self.assertEqual(str(page.id), list(release_content_dict.keys())[0])

    def test_release_doesnt_lock_content_if_no_release_time_set(self, mock_file_service):
        """
        when a release is requested with no release date, it should not save the content into json.
        """
        create_test_page(OneYouPage)

        release_name = 'Unset release'

        create_test_release(release_name)

        loaded_release = Release.objects.get(release_name=release_name)

        self.assertEqual(loaded_release.content_status, 0)

    def test_release_doesnt_lock_content_before_its_release_time(self, mock_file_service):

        """
        when a release is requested before its release date, it should not save the content into json.
        """
        create_test_page(OneYouPage)

        release_name = 'Future release'
        release_date = timezone.now() + timedelta(days=1)

        create_test_release(release_name, release_date)

        loaded_release = Release.objects.get(release_name=release_name)

        self.assertEqual(loaded_release.content_status, 0)

    def test_release_locks_content_after_its_release_time(self, mock_file_service):

        """
        when a release is requested after its release date, it should save the content into json.
        """
        create_test_page(OneYouPage)

        release_name = 'Past release'
        release_date = timezone.now() + timedelta(days=-1)

        release = create_test_release(release_name, release_date)
        populate_release_if_required(release)

        loaded_release = Release.objects.get(release_name=release_name)

        self.assertEqual(loaded_release.content.count(), 1)
        self.assertEqual(loaded_release.content_status, 1)

    def test_release_initialised_from_a_base_release_gets_revisions_from_base(self, mock_file_service):
        """
        when a release is initialised from an existing release as a base it gets linked to the same pages the base
        release is linked to at that point.
        """
        page = create_test_page(OneYouPage)

        release_name = 'Base release'

        base_release = create_test_release(release_name)

        page.release = base_release
        page.save_revision().publish()

        base_release_content = base_release.content.first()
        base_release_content_dict = json.loads(base_release_content.content)

        self.assertEquals(len(base_release_content_dict), 1)

        new_release = create_test_release(base_release=base_release)

        new_release_content = new_release.content.first()
        new_release_content_dict = json.loads(new_release_content.content)

        self.assertEquals(len(new_release_content_dict), 1)
        self.assertEquals(list(base_release_content_dict.keys())[0], list(new_release_content_dict.keys())[0])

    def test_is_released_returns_false_if_now_date_set(self, mock_file_service):
        """
        the is released function should return false if the release date hasn't been set.
        """
        release = create_test_release()

        self.assertIsFalse(release.release_date_has_passed())

    def test_is_released_returns_false_if_date_is_in_the_future(self, mock_file_service):
        """
        the is released function should return false if the release date is in the future.
        """
        release = create_test_release()
        release.release_time = timezone.now() + timedelta(days=1)

        self.assertIsFalse(release.release_date_has_passed())

    def test_is_released_returns_true_if_date_is_in_the_past(self, mock_file_service):
        """
        the is released function should return true if the release date is in the past.
        """
        release = create_test_release()
        release.release_time = timezone.now() + timedelta(days=-1)

        self.assertIsTrue(release.release_date_has_passed())

    def test_remove_page_removes_the_linked_revision_of_the_page_from_the_release(self, mock_file_service):
        """
        the remove page function should remove any linked revisions of that page from the release.
        """
        release = create_test_release()

        page1 = create_test_page(OneYouPage, None, title='Page 1')
        page1.release = release
        page1.save_revision()
        
        page2 = create_test_page(OneYouPage, None, title='Page 2', path='1112')
        page2.release = release
        page2.save_revision()

        page1_in_release = False
        page2_in_release = False

        content = json.loads(release.content.first().content)
        if str(page1.id) in content:
            page1_in_release = True
        if str(page2.id) in content:
            page2_in_release = True

        self.assertIsTrue(page1_in_release)
        self.assertIsTrue(page2_in_release)

        release.remove_page(page2.id)

        page1_in_release = False
        page2_in_release = False

        content = json.loads(release.content.first().content)
        if str(page1.id) in content:
            page1_in_release = True
        if str(page2.id) in content:
            page2_in_release = True

        self.assertIsTrue(page1_in_release)
        self.assertIsFalse(page2_in_release)

    def test_remove_page_does_nothing_if_the_page_is_not_in_the_release(self, mock_file_service):
        """
        the remove page function should not remove anything if the page is not in the release.
        """
        release = create_test_release()

        page1 = create_test_page(OneYouPage, None, title='Page 1')
        page1.release = release
        page1.save_revision()
        
        page2 = create_test_page(OneYouPage, None, title='Page 2', path='1112')
        page2.release = release
        page2.save_revision()

        page3 = create_test_page(OneYouPage, None, title='Page 3', path='1113')

        page1_in_release = False
        page2_in_release = False
        page3_in_release = False

        content = json.loads(release.content.first().content)
        if str(page1.id) in content:
            page1_in_release = True
        if str(page2.id) in content:
            page2_in_release = True
        if str(page3.id) in content:
            page3_in_release = True

        self.assertIsTrue(page1_in_release)
        self.assertIsTrue(page2_in_release)
        self.assertIsFalse(page3_in_release)

        release.remove_page(page3.id)

        page1_in_release = False
        page2_in_release = False
        page3_in_release = False

        content = json.loads(release.content.first().content)
        if str(page1.id) in content:
            page1_in_release = True
        if str(page2.id) in content:
            page2_in_release = True
        if str(page3.id) in content:
            page3_in_release = True

        self.assertIsTrue(page1_in_release)
        self.assertIsTrue(page2_in_release)
        self.assertIsFalse(page3_in_release)

    def test_add_revision_replaces_the_linked_revision_of_a_page_with_the_new_revision(self, mock_file_service):
        """
        when a revision is added to a release it replaces the existing revision linked to the release.
        """
        page = create_test_page(OneYouPage)
        initial_revision = page.get_latest_revision()

        self.assertIsNotNone(initial_revision)

        release = create_test_release()

        page.release = release
        page.save_revision()

        initial_revision_in_release = False

        content = json.loads(release.content.first().content)
        if content[str(page.id)]['title'] == initial_revision.as_page_object().title:
            initial_revision_in_release = True

        self.assertIsTrue(initial_revision_in_release)

        page.title = 'Updated page'
        page.save_revision().publish()
        second_revision = page.get_latest_revision()

        self.assertNotEqual(initial_revision.id, second_revision.id)

        release.add_revision(second_revision)

        initial_revision_in_release = False
        second_revision_in_release = False

        content = json.loads(release.content.first().content)
        if content[str(page.id)]['title'] == initial_revision.as_page_object().title:
            initial_revision_in_release = True
        if content[str(page.id)]['title'] == second_revision.as_page_object().title:
            second_revision_in_release = True

        self.assertIsFalse(initial_revision_in_release)
        self.assertIsTrue(second_revision_in_release)

    def test_add_revision_creates_a_new_link_if_the_page_not_already_in_the_release(self, mock_file_service):
        """
        when a revision is added to a release it creates a new link if the page not already linked to the release.
        """
        page = create_test_page(OneYouPage)
        initial_revision = page.get_latest_revision()

        self.assertIsNotNone(initial_revision)

        release = create_test_release()
        
        page.release = release
        page.save_revision()

        initial_revision_in_release = False\

        content = json.loads(release.content.first().content)
        if str(initial_revision.page_id) in content:
            initial_revision_in_release = True

        self.assertIsTrue(initial_revision_in_release)

        release_content = release.content.first()
        release_content_dict = json.loads(release_content.content)

        self.assertEquals(len(release_content_dict), 1)

        page2 = create_test_page(OneYouPage, None, title='Page 2', path='1112')
        second_revision = page2.get_latest_revision()

        release.add_revision(second_revision)

        initial_revision_in_release = False
        second_revision_in_release = False

        content = json.loads(release.content.first().content)
        if str(initial_revision.page_id) in content:
            initial_revision_in_release = True
        if str(second_revision.page_id) in content:
            second_revision_in_release = True

        release_content = release.content.first()
        release_content_dict = json.loads(release_content.content)

        self.assertEquals(len(release_content_dict), 2)
        self.assertIsTrue(initial_revision_in_release)
        self.assertIsTrue(second_revision_in_release)

    def test_release_loads_none_object_if_the_requested_page_isnt_in_release(self, mock_file_service):
        """
        When content is requested for a release that isn't included in the release a None object should be returned.
        """
        release = create_test_release()

        with self.assertRaises(KeyError):
            release.get_content_for(0)

    def test_release_loads_content_from_tables_if_not_yet_released(self, mock_file_service):
        """
        When content is requested for a release before it is released it should load the content from the related tables
        not from locked content. Tested by checking that before it is released it returns any content, because before
        its released there is not locked content to load from.
        """
        page = create_test_page(OneYouPage)
        revision = page.get_latest_revision()

        release_time = timezone.now() + timedelta(days=1)
        release = create_test_release(release_date=release_time)

        page.release = release
        page.save_revision()

        release_page_content = release.get_content_for(page.id)

        self.assertIsNotNone(release_page_content)
        self.assertEqual(release_page_content['title'], json.loads(revision.content_json)['title'])

    def test_release_loads_content_from_locked_content_if_released(self, mock_file_service):
        """
        When content is requested for a release after it is released it should load the content from the locked content
        not from the releated tables.
        """
        initial_title = 'Test page'
        page = create_test_page(OneYouPage, None, initial_title)
        revision = page.get_latest_revision()

        release_time = timezone.now() + timedelta(days=-1)
        release = create_test_release(release_date=release_time)
        populate_release_if_required(release)

        loaded_release = Release.objects.get(id=release.id)

        page.release = release
        page.save_revision()

        second_title = 'Altered page'
        page.title = second_title
        page.save_revision()
        revision.content_json = page.to_json()
        revision.save()

        release_page_content = loaded_release.get_content_for(page.id)

        self.assertIsNotNone(release.content_status, 1)
        self.assertIsNotNone(release_page_content)
        self.assertNotEqual(json.loads(revision.content_json)['title'], initial_title)
        self.assertEqual(release_page_content['title'], initial_title)


@patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
class ReleaseContentModelTests(OneYouTests):
    def test_release_content_can_return_a_requested_page(self, mock_file_service):
        """
        When a specific page is requested from the locked content it should be retrievable.
        """
        page = create_test_page(OneYouPage, None, title='First Page')
        self.assertIsNotNone(page.get_latest_revision())

        release = create_test_release()

        page.release = release
        page.save_revision()

        # release_content = create_test_release_content(release, json.dumps(release.generate_fixed_content()))
        release_content = release.content.first()
        loaded_page_content = release_content.get_content_for(str(page.id))

        self.assertEqual(page.title, loaded_page_content['title'])

    def test_release_content_returns_none_if_the_requested_page_not_in_release(self, mock_file_service):
        """
        When a page is requested that isn't included in a release a None object should be returned.
        """
        release = create_test_release()
        site_name = 'oneyou'
        SiteSettings(site_id=release.site_id, uid=site_name).save()
        release_content = release.content.first()
        # release_content = create_test_release_content(release, json.dumps(release.generate_fixed_content()))

        self.assertRaises(KeyError, release_content.get_content_for, '0')


@patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
class ReleasePageModelTests(OneYouTests):
    def test_a_release_page_object_returns_associated_release(self, mock_file_service):
        release = create_test_release()

        page = create_test_page(OneYouPage)
        revision = page.get_latest_revision()

        release_page = create_test_release_page(release, revision)

        self.assertEqual(type(revision), type(release_page.revision))
        self.assertEqual(type(release), type(release_page.release))


@patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
class ReleaseModelUtilFunctionsTests(OneYouTests):
    def test_validate_in_future_returns_nothing_for_dates_in_the_future(self, mock_file_service):
        response = validate_in_future(timezone.now() + timezone.timedelta(days=1))
        self.assertEqual(response, None)

    def test_validate_in_future_returns_validation_error_for_dates_in_the_past(self, mock_file_service):
        error_thrown = False
        try:
            validate_in_future(timezone.now() + timezone.timedelta(days=-1))
        except ValidationError:
            error_thrown = True
        self.assertIsTrue(error_thrown)

    def test_query_set_to_dict_returns_an_array_of_dicts_for_objects(self, mock_file_service):
        create_test_release()
        create_test_release(release_name='Test release 2')
        releases = Release.objects.all()
        dicts = query_set_to_dict(releases)
        self.assertEqual(len(releases), len(dicts))
        self.assertEqual(type(dicts[0]), dict)


@patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
class ReleaseUtilsTests(OneYouTests):
    def test_get_release_object_returns_the_correct_release(self, mock_file_service):
        release = create_test_release()

        release_uuid = release.uuid

        loaded_release = get_release_object(release_uuid)

        self.assertEqual(release.id, loaded_release.id)
        self.assertEqual(release.release_name, loaded_release.release_name)

    def test_get_latest_live_release_returns_the_newest_published_release(self, mock_file_service):
        """
        A published release is one whose release_time is in the past.
        """
        release1_name = 'Old release'
        release1_date = timezone.now() + timedelta(days=-10)
        release1 = create_test_release(release_name=release1_name, release_date=release1_date)

        release2_name = 'Current release'
        release2_date = timezone.now() + timedelta(days=-1)
        release2 = create_test_release(release_name=release2_name, release_date=release2_date)

        release3_name = 'Future release'
        release3_date = timezone.now() + timedelta(days=+10)
        release3 = create_test_release(release_name=release3_name, release_date=release3_date)

        current_release = get_latest_live_release(release1.site_id)

        self.assertIsTrue(release1.release_date_has_passed())
        self.assertIsTrue(release2.release_date_has_passed())
        self.assertIsFalse(release3.release_date_has_passed())

        self.assertEqual(current_release.id, release2.id)

    def test_get_latest_release_returns_the_newest_release_with_date(self, mock_file_service):
        """
        A published release is one whose release_time is in the past.
        """
        release1_name = 'Next release'
        release1_date = None
        release1 = create_test_release(release_name=release1_name, release_date=release1_date)

        release2_name = 'Future release 1'
        release2_date = None
        release2 = create_test_release(release_name=release2_name, release_date=release2_date)

        release3_name = 'Future release 2'
        release3_date = timezone.now() + timedelta(days=+2)
        release3 = create_test_release(release_name=release3_name, release_date=release3_date)

        latest_release = get_latest_release(release1.site_id)

        self.assertIsFalse(release1.release_date_has_passed())
        self.assertIsFalse(release2.release_date_has_passed())
        self.assertIsFalse(release3.release_date_has_passed())

        self.assertEqual(latest_release.id, release3.id)

    def test_get_latest_release_returns_the_newest_release_with_no_date(self, mock_file_service):
        """
        A published release is one whose release_time is in the past.
        """
        release1_name = 'Future release 1'
        release1_date = None
        release1 = create_test_release(release_name=release1_name, release_date=release1_date)

        release2_name = 'Future release 2'
        release2_date = None
        release2 = create_test_release(release_name=release2_name, release_date=release2_date)

        latest_release = get_latest_release(release1.site_id)

        self.assertIsFalse(release1.release_date_has_passed())
        self.assertIsFalse(release2.release_date_has_passed())

        self.assertEqual(latest_release.id, release2.id)


@patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
@patch('frontendHandler.models.FrontendVersion.get_html_for_version', return_value=index_file)
class ReleaseViewsTests(OneYouTests):
    def test_release_html_endpoint_returns_an_index_with_substituted_values(self, mock_file_service, mock_index_file):
        release_date = timezone.now() + timedelta(days=-1)
        release = create_test_release(release_date=release_date)
        site_name = 'oneyou'
        SiteSettings(site_id=release.site_id, uid=site_name).save()
        http_host = 'phe.nhs.uk'
        request = HttpRequest()
        request.META['HTTP_HOST'] = http_host

        response = release_html(request, site_name)
        response_content_string = response.content.decode('utf-8')

        self.assertIsFalse('{{ api_url }}' in response_content_string)
        self.assertIsFalse('{{ site_setting.uid }}' in response_content_string)
        self.assertIsFalse('{{ release_id }}' in response_content_string)
        self.assertIsTrue(release.uuid in response_content_string)

    def test_release_html_function_returns_404_for_unknown_site_names(self, mock_file_service, mock_index_file):
        response = release_html(HttpRequest(), 'testsitename')
        self.assertEqual(response.status_code, 404)

    # def test_release_html_function_doesnt_redirect_if_no_redirects_for_path_given(self, mock_file_service,
    #                                                                               mock_index_file):
    #     site_settings = create_test_site_settings()
    #     site_name = site_settings.uid
    #     http_host = 'phe.nhs.uk.com'
    #     request = HttpRequest()
    #     request.META['HTTP_HOST'] = http_host
    #     request.path = 'test'

    #     response = release_html(request, site_name)
    #     self.assertEquals(response.status_code, 200)

    def test_release_html_sets_cache_timeout_to_15_seconds(self, mock_file_service, mock_index_file):
        site_settings = create_test_site_settings()
        site_name = site_settings.uid
        http_host = 'phe.nhs.uk.com'
        request = HttpRequest()
        request.META['HTTP_HOST'] = http_host
        request.path = 'test'
        release = create_test_release(release_date=(timezone.now() + timezone.timedelta(days=-1)))
        release.content_status = 1
        release.save()

        response = release_html(request, site_name)
        self.assertEquals(response['Cache-Control'], 'max-age=900')

    def test_release_html_sets_api_url_to_local_if_local_in_host_name(self, mock_file_service, mock_index_file):
        site_settings = create_test_site_settings()
        site_name = site_settings.uid
        http_host = 'localhost:3000'
        request = HttpRequest()
        request.META['HTTP_HOST'] = http_host
        request.path = 'test'
        release = create_test_release(release_date=(timezone.now() + timezone.timedelta(days=-1)))
        release.content_status = 1
        release.save()

        response = release_html(request, site_name)
        response_content_string = response.content.decode('utf-8')
        self.assertIsTrue(http_host + '/api' in response_content_string)

    def test_release_view_incorrect_release_id(self, mock_file_service, mock_index_file):
        c = Client()
        response = c.get('/admin/release/release/view/1/')

        self.assertIsTrue(response.context.get('release') is None)
        self.assertIsTrue(response.context.get('pages') == {})
        self.assertIsTrue(response.context.get('error_msg') == 'This release id 1 doesn\'t exist')

    def test_release_view_no_live_release(self, mock_file_service, mock_index_file):
        release = create_test_release()
        c = Client()
        response = c.get('/admin/release/release/view/{}/'.format(release.id))

        self.assertIsTrue(response.context.get('error_msg') == 'No live release')

    def test_release_view_compare_to_live_release(self, mock_file_service, mock_index_file):
        # Create a live release with 2 pages
        live_release = create_test_release('Live release', release_date=(timezone.now() + timezone.timedelta(days=-1)))
        test_live_page1 = create_test_page(OneYouPage)
        test_live_page1.release = live_release
        test_live_page1.live_revision = test_live_page1.save_revision()
        
        test_live_page2 = create_test_page(OneYouPage)
        test_live_page2.release = live_release
        test_live_page2.live_revision = test_live_page2.save_revision()

        # Create current release edit page1 from live release, remove a page2 live release
        # and create a new page3
        current_release = create_test_release()
        test_live_page1.release = current_release
        test_live_page1.live_revision = test_live_page1.save_revision()

        current_release.remove_page(test_live_page2.id)

        test_live_page3 = create_test_page(OneYouPage)
        test_live_page3.release = current_release
        test_live_page3.live_revision = test_live_page3.save_revision()
        test_live_page3.save()

        c = Client()
        response = c.get('/admin/release/release/view/{}/'.format(current_release.id))

        self.assertIsTrue(response.context.get('release') == current_release)
        self.assertIsTrue(response.context.get('error_msg') == '')
        self.assertIsTrue(response.context.get('pages')[test_live_page1.id]['status'] == 'updated')
        self.assertIsTrue(response.context.get('pages')[test_live_page2.id]['status'] == 'removed')
        self.assertIsTrue(response.context.get('pages')[test_live_page3.id]['status'] == 'new')


@patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
class ReleaseButtonHelperWagTailHooksTests(OneYouTests):
    def test_preview_button_returns_a_link_to_view_the_releases_content(self, mock_file_service):
        create_test_site_settings()
        release = create_test_release()
        release_admin = ReleaseAdmin()
        view = IndexView(release_admin)
        request = HttpRequest()

        release_button_helper = ReleaseButtonHelper(view, request)
        preview_button = release_button_helper.preview_button(release.id)

        expected_release_url = '/' + release.site.sitesettings.uid + '/?id=' + release.uuid

        self.assertEqual(preview_button['url'], expected_release_url)

    def test_get_btns_for_obj_returns_a_list_containing_preview_button(self, mock_file_service):
        create_test_site_settings()
        release = create_test_release()
        release_admin = ReleaseAdmin()
        view = IndexView(release_admin)
        request = WSGIRequest({'REQUEST_METHOD': 'GET', 'wsgi.input': ''})
        request.user = create_test_user()

        release_button_helper = ReleaseButtonHelper(view, request)
        buttons = release_button_helper.get_buttons_for_obj(release)

        preview_in_buttons = False
        for btn in buttons:
            if btn['label'] == 'preview':
                preview_in_buttons = True

        self.assertIsTrue(preview_in_buttons)


@patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
class ReleaseAdminWagTailHooksTests(OneYouTests):
    def test_release_admin_button_helper_class_is_correct(self, mock_file_service):
        release_admin = ReleaseAdmin()

        release_button_helper = release_admin.get_button_helper_class()

        self.assertEqual(type(release_button_helper), type(ReleaseButtonHelper))

    def test_get_queryset_returns_all_the_releases_in_the_db(self, mock_file_service):
        create_test_release()
        release_admin = ReleaseAdmin()
        request = HttpRequest()

        admin_release_list = release_admin.get_queryset(request)

        expected_release_count = Release.objects.count()

        self.assertEqual(expected_release_count, admin_release_list.count())


@patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
class ReleaseModerationModelTests(OneYouTests):

    def setUp(self):
        self.release = create_test_release()
        self.page = create_test_page(OneYouPage)
        self.user = create_test_user()

    def test_submitformoderation_then_publish(self, mock_file_service):
        # submit for moderation
        self.page.release = self.release
        self.page.save_revision(self.user, True)

        release_page = ReleasePage.objects.filter(release=self.release, revision__page=self.page)
        release_content = self.release.content.first()
        release_content_dict = json.loads(release_content.content)

        self.assertEqual(release_page.count(), 1)
        self.assertEqual(release_page.filter(submitted_for_moderation=True).count(), 1)
        self.assertEqual(len(release_content_dict), 0)

        # publish
        self.page.release = self.release
        self.page.save_revision(self.user)

        release_content = self.release.content.first()
        release_content_dict = json.loads(release_content.content)

        self.assertEqual(release_page.count(), 1)
        self.assertEqual(release_page.filter(submitted_for_moderation=False).count(), 1)
        self.assertEqual(len(release_content_dict), 1)
        self.assertEqual(str(self.page.id), list(release_content_dict.keys())[0])

    def test_publish_then_submitformoderation(self, mock_file_service):
        # publish
        self.page.release = self.release
        self.page.title = 'Published'
        self.page.save_revision(self.user)

        release_page = ReleasePage.objects.filter(release=self.release, revision__page=self.page)
        release_content = self.release.content.first()
        release_content_dict = json.loads(release_content.content)

        self.assertEqual(release_page.count(), 1)
        self.assertEqual(release_page.filter(submitted_for_moderation=False).count(), 1)
        self.assertEqual(len(release_content_dict), 1)
        self.assertEqual(str(self.page.id), list(release_content_dict.keys())[0])

        # submit for moderation
        self.page.release = self.release
        self.page.title = 'Submitted for moderation'
        self.page.save_revision(self.user, True)

        release_content = self.release.content.first()
        release_content_dict = json.loads(release_content.content)

        self.assertEqual(release_page.count(), 2)
        self.assertEqual(release_page.filter(submitted_for_moderation=True).count(), 1)
        self.assertEqual(release_page.filter(submitted_for_moderation=False).count(), 1)
        self.assertEqual(len(release_content_dict), 1)
        self.assertEqual(str(self.page.id), list(release_content_dict.keys())[0])
        self.assertEqual(release_content_dict[str(self.page.id)]['title'], 'Published')
    
    def test_reject_submitformoderation(self, mock_file_service):
        # publish
        self.page.release = self.release
        self.page.title = 'Published'
        self.page.save_revision(self.user)

        # submit for moderation
        self.page.release = self.release
        self.page.title = 'Submitted for moderation'
        revision= self.page.save_revision(self.user, True)

        release_page = ReleasePage.objects.filter(release=self.release, revision__page=self.page)
        release_content = self.release.content.first()
        release_content_dict = json.loads(release_content.content)

        self.assertEqual(release_page.count(), 2)
        self.assertEqual(release_page.filter(submitted_for_moderation=True).count(), 1)
        self.assertEqual(release_page.filter(submitted_for_moderation=False).count(), 1)
        self.assertEqual(len(release_content_dict), 1)
        self.assertEqual(str(self.page.id), list(release_content_dict.keys())[0])
        self.assertEqual(release_content_dict[str(self.page.id)]['title'], 'Published')

        # reject
        admin_user = create_test_admin_user()
        c = Client()
        c.force_login(admin_user)
        response = c.get(reverse('oneyou_pages:reject_moderation', kwargs={'revision_id': revision.id}))

        release_content = self.release.content.first()
        release_content_dict = json.loads(release_content.content)

        self.assertEqual(release_page.count(), 1)
        self.assertEqual(release_page.filter(submitted_for_moderation=False).count(), 1)
        self.assertEqual(len(release_content_dict), 1)
        self.assertEqual(str(self.page.id), list(release_content_dict.keys())[0])
        self.assertEqual(release_content_dict[str(self.page.id)]['title'], 'Published')

    
    def test_accept_submitformoderation(self, mock_file_service):
        # publish
        self.page.release = self.release
        self.page.title = 'Published'
        self.page.save_revision(self.user)

        # submit for moderation
        self.page.release = self.release
        self.page.title = 'Submitted for moderation'
        revision = self.page.save_revision(self.user, True)

        release_page = ReleasePage.objects.filter(release=self.release, revision__page=self.page)
        release_content = self.release.content.first()
        release_content_dict = json.loads(release_content.content)

        self.assertEqual(release_page.count(), 2)
        self.assertEqual(release_page.filter(submitted_for_moderation=True).count(), 1)
        self.assertEqual(release_page.filter(submitted_for_moderation=False).count(), 1)
        self.assertEqual(len(release_content_dict), 1)
        self.assertEqual(str(self.page.id), list(release_content_dict.keys())[0])
        self.assertEqual(release_content_dict[str(self.page.id)]['title'], 'Published')

        # accept
        admin_user = create_test_admin_user()
        c = Client()
        c.force_login(admin_user)
        response = c.get(reverse('oneyou_pages:approve_moderation', kwargs={'revision_id': revision.id}))

        release_content = self.release.content.first()
        release_content_dict = json.loads(release_content.content)

        self.assertEqual(release_page.count(), 1)
        self.assertEqual(release_page.filter(submitted_for_moderation=False).count(), 1)
        self.assertEqual(len(release_content_dict), 1)
        self.assertEqual(str(self.page.id), list(release_content_dict.keys())[0])
        self.assertEqual(release_content_dict[str(self.page.id)]['title'], 'Submitted for moderation')


    def test_submitformoderation_freezerelease(self, mock_file_service):
        # publish
        self.page.release = self.release
        self.page.title = 'Published'
        self.page.save_revision(self.user)

        # submit for moderation
        self.page.release = self.release
        self.page.title = 'Submitted for moderation'
        revision = self.page.save_revision(self.user, True)

        release_page = ReleasePage.objects.filter(release=self.release, revision__page=self.page)
        release_content = self.release.content.first()
        release_content_dict = json.loads(release_content.content)

        self.assertEqual(release_page.count(), 2)
        self.assertEqual(release_page.filter(submitted_for_moderation=True).count(), 1)
        self.assertEqual(release_page.filter(submitted_for_moderation=False).count(), 1)
        self.assertEqual(len(release_content_dict), 1)
        self.assertEqual(str(self.page.id), list(release_content_dict.keys())[0])
        self.assertEqual(release_content_dict[str(self.page.id)]['title'], 'Published')

        #freeze release
        release_date = timezone.now() - timedelta(days=1)
        self.release.release_time = release_date
        self.release.save()
        populate_release_if_required(self.release)

        release_content = self.release.content.first()
        release_content_dict = json.loads(release_content.content)
        release_content_dict.pop('site_json')

        self.assertEqual(release_page.count(), 1)
        self.assertEqual(release_page.filter(submitted_for_moderation=False).count(), 1)
        self.assertEqual(len(release_content_dict), 1)
        self.assertEqual(str(self.page.id), list(release_content_dict.keys())[0])
        self.assertEqual(release_content_dict[str(self.page.id)]['title'], 'Published')
