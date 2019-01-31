import json

from unittest.mock import patch

from dctcmsbase.factories import create_test_page, create_test_theme
from dctcmsbase.pagecomponents import Theme
from oneYou2.test.utils import OneYouTests
from release.factories import create_test_release

from .models import SexHealthPage



class SexHealthPageModelTests(OneYouTests):

    def test_page_theme_property(self):
        """
        page_theme property should return the theme as a dict
        """
        test_label = 'Test theme'
        test_class_name = 'test-class'
        theme = create_test_theme(test_label, test_class_name)
        page = SexHealthPage(page_theme=theme)
        self.assertIs(page.page_theme.label, test_label)
        self.assertIs(page.page_theme.class_name, test_class_name)

    def test_breadcrumbs_property(self):
        parent_page = create_test_page(SexHealthPage)
        child_page1 = create_test_page(SexHealthPage, parent_page)

        self.assertEquals(len(child_page1.breadcrumbs), 2)
        self.assertEquals(child_page1.breadcrumbs[-1]['name'], parent_page.title)
        self.assertEquals(child_page1.breadcrumbs[-1]['url'], parent_page.link_url)

    def test_from_dict_page_builder(self):
        """
        create_from_dict method should produce an instance of the class based on the dictonary
        """
        obj_dict = {'title': 'Page title', 'path': '00001', 'depth': '0', 'numchild': '0',
                    'body': '', 'theme': {'id': 1}, 'live': True,
                    'meta': {'slug': 'page-path', 'seo_title': 'page-name',
                             'show_in_menus': True, 'search_description': 'page-description',
                             'first_published_at': 'today'}
                    }
        page = SexHealthPage.create_from_dict(obj_dict)
        self.assertIs(page.title, obj_dict['title'])
        self.assertIs(page.path, obj_dict['path'])
        self.assertIs(page.depth, obj_dict['depth'])
        self.assertIs(page.numchild, obj_dict['numchild'])
        self.assertIs(page.page_theme_id, obj_dict['theme']['id'])
        self.assertIs(page.live, obj_dict['live'])
        self.assertIs(page.slug, obj_dict['meta']['slug'])
        self.assertIs(page.seo_title, obj_dict['meta']['seo_title'])
        self.assertIs(page.show_in_menus, obj_dict['meta']['show_in_menus'])
        self.assertIs(page.search_description, obj_dict['meta']['search_description'])
        self.assertIs(page.first_published_at, obj_dict['meta']['first_published_at'])


    def test_from_dict_page_updater(self):
        """
        create_from_dict method should produce an instance of the class based on the dictonary
        """
        theme = Theme(id=1, label='Test theme', class_name='test-class')
        page = SexHealthPage(title='Page title', path='00001', depth='0', numchild='0',
                           page_theme=theme, live=True, slug='page-path', seo_title='page-name',
                           show_in_menus=True, search_description='page-description', first_published_at='yesterday')

        obj_dict = {'title': 'Page title 2', 'path': '00002', 'depth': '1', 'numchild': '1',
                    'body': '', 'live': True,
                    'slug': 'page-path2', 'seo_title': 'page-name2',
                    'show_in_menus': True, 'search_description': 'page-description2',
                    'first_published_at': 'today'
                    }

        default_excludes = ['id', 'content_type_id', 'live_revision_id',
                            'page_ptr_id', 'oneyou2page_ptr_id', 'release_id', 'live', 'locked']

        page = page.update_from_dict(obj_dict, default_excludes=default_excludes)

        self.assertIs(page.title, obj_dict['title'])
        self.assertIs(page.path, obj_dict['path'])
        self.assertIs(page.depth, obj_dict['depth'])
        self.assertIs(page.numchild, obj_dict['numchild'])
        self.assertIs(page.live, obj_dict['live'])
        self.assertIs(page.slug, obj_dict['slug'])
        self.assertIs(page.seo_title, obj_dict['seo_title'])
        self.assertIs(page.show_in_menus, obj_dict['show_in_menus'])
        self.assertIs(page.search_description, obj_dict['search_description'])
        self.assertIs(page.first_published_at, obj_dict['first_published_at'])

    @patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
    def test_publishing_page_to_release_links_new_revision_to_release(self, mock_file_service):
        page = create_test_page(SexHealthPage)

        initial_revision = page.get_latest_revision()

        release = create_test_release(SexHealthPage)

        page.release = release
        page.title = 'Updated page'
        page.save_revision().publish()

        second_revision = page.get_latest_revision()

        initial_revision_in_release = False
        second_revision_in_release = False

        content = json.loads(release.content.first().content)
        if content[str(page.id)]['title'] == initial_revision.as_page_object().title:
            initial_revision_in_release = True
        if content[str(page.id)]['title'] == second_revision.as_page_object().title:
            second_revision_in_release = True

        self.assertTrue(second_revision_in_release)
        self.assertIsFalse(initial_revision_in_release)

    @patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
    def test_unpublishing_a_page_removes_the_revision_for_that_page_from_the_release(self, mock_file_service):
        page = create_test_page(SexHealthPage)

        release = create_test_release()

        page.release = release
        page.save_revision()

        page_count = SexHealthPage.objects.count()
        live_page_count = SexHealthPage.objects.live().count()

        release_content = release.content.first()
        release_content_dict = json.loads(release_content.content)

        self.assertEquals(page_count, len(release_content_dict))
        self.assertEquals(live_page_count, len(release_content_dict))

        revision_in_release = False
        if str(page.id) in release_content_dict:
            revision_in_release = True

        self.assertTrue(revision_in_release)

        page.release = release
        page.unpublish(release.id)

        page_count = SexHealthPage.objects.count()
        # live_page_count = SexHealthPage.objects.live().count()

        release_content = release.content.first()
        release_content_dict = json.loads(release_content.content)

        self.assertNotEquals(page_count, len(release_content_dict))
        # self.assertEquals(live_page_count, len(release_content_dict))

        revision_in_release = False
        if str(page.id) in release_content_dict:
            revision_in_release = True

        self.assertIsFalse(revision_in_release)

    # def test_page_serializable_data_function_returns_the_full_content_of_shared_shelves(self):
    #     """
    #     serializable_data is used in the saving of a revision,
    #     so to check its working correctly we check the content of the revision.
    #     """
    #     shelf = create_test_promo_shelf()
    #     body_content_string = '[{"type": "simple_page_heading_shelf", "value": {"heading": "Heading", "shelf_id":' \
    #                           ' "1"}, "id": "b2d5e2e8-ae9d-46ef-92e6-27745a85df8c"},{"type": "promo_shelf", "value": ' \
    #                           + str(shelf.id) + ', "id": "14dd05e9-1d75-4831-a969-01f5c2c82b55"}]'
    #     page = create_test_page(SexHealthPage)
    #     body_field = [field for field in page._meta.fields if field.name == 'body'][0]
    #     page.body = body_field.to_python(body_content_string)

    #     page.save_revision()
    #     body_dict = json.loads(json.loads(page.get_latest_revision().content_json)['body'])

    #     self.assertEqual(len(body_dict), 2)
    #     self.assertIsTrue('content' in body_dict[1])
    #     self.assertIsTrue('shelf_id' in body_dict[1]['content'])
    #     self.assertEqual(body_dict[1]['content']['shelf_id'], shelf.shelf_id)

    def test_page_preview_modes_function_returns_the_correct_options(self):
        page = create_test_page(SexHealthPage)
        self.assertEquals(page.preview_modes, SexHealthPage.DEFAULT_PREVIEW_MODES)

    def test_page_default_preview_mode_returns_the_correct_option(self):
        page = create_test_page(SexHealthPage)
        default_preview_mode = 'react'
        self.assertEquals(page.default_preview_mode, default_preview_mode)
