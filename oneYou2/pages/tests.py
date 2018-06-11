import json
from unittest.mock import patch

from django.core.handlers.wsgi import WSGIRequest
from django.http import HttpRequest

from wagtail.contrib.modeladmin.views import IndexView
from wagtail.wagtailcore.blocks.stream_block import StreamValue
from wagtail.wagtailcore.blocks.struct_block import StructValue
from wagtail.wagtailcore.models import Site

from home.models import SiteSettings

from images.models import PHEImage

from oneYou2.factories import create_test_user
from oneYou2.test.utils import OneYouTests

from pages.factories import create_test_page, create_test_theme, create_test_menu, create_test_footer,\
    create_test_header, create_test_recipe_page
from pages.models import OneYou2Page, Theme
from pages.utils import get_serializable_data_for_fields, process_inlines
from pages.wagtail_hooks import MenuAdmin, MenuButtonHelper

from release.factories import create_test_release

from shelves.factories import create_test_promo_shelf


class OneYou2PageModelTests(OneYouTests):

    def test_page_theme_property(self):
        """
        page_theme property should return the theme as a dict
        """
        test_label = "Test theme"
        test_class_name = "test-class"
        theme = create_test_theme(test_label, test_class_name)
        page = OneYou2Page(theme=theme)
        self.assertIs(page.theme.label, test_label)
        self.assertIs(page.page_theme['label'], test_label)
        self.assertIs(page.page_theme['class_name'], test_class_name)

    def test_page_link_url_property(self):
        page = create_test_page()
        site = Site.objects.first()
        site_name = SiteSettings.objects.get(site_id=site.id).uid
        expected_url = '/' + site_name + page.url_path
        self.assertEqual(page.link_url, expected_url)

    def test_from_dict_page_builder(self):
        """
        create_from_dict method should produce an instance of the class based on the dictonary
        """
        obj_dict = {'title': 'Page title', 'path': '00001', 'depth': '0', 'numchild': '0',
                    'body': '', 'page_theme': {'id': 1}, 'live': True,
                    'meta': {'slug': 'page-path', 'seo_title': 'page-name',
                             'show_in_menus': True, 'search_description': 'page-description',
                             'first_published_at': 'today'}
                    }
        page = OneYou2Page.create_from_dict(obj_dict)
        self.assertIs(page.title, obj_dict['title'])
        self.assertIs(page.path, obj_dict['path'])
        self.assertIs(page.depth, obj_dict['depth'])
        self.assertIs(page.numchild, obj_dict['numchild'])
        self.assertIs(page.theme_id, obj_dict['page_theme']['id'])
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
        theme = Theme(id=1, label="Test theme", class_name="test-class")
        page = OneYou2Page(title='Page title', path='00001', depth='0', numchild='0',
                           theme=theme, live=True, slug='page-path', seo_title='page-name',
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
        page = create_test_page()

        initial_revision = page.get_latest_revision()

        release = create_test_release()

        page.release = release
        page.title = 'Updated page'
        page.save_revision().publish()
        page.save()

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
        page = create_test_page()

        release = create_test_release()

        page_count = OneYou2Page.objects.count()
        live_page_count = OneYou2Page.objects.live().count()

        release_content = release.content.first()
        release_content_dict = json.loads(release_content.content)

        self.assertEquals(page_count, len(release_content_dict))
        self.assertEquals(live_page_count, len(release_content_dict))

        revision_in_release = False
        if str(page.id) in release_content_dict:
            revision_in_release = True

        self.assertTrue(revision_in_release)

        page.release = release
        page.unpublish()

        page_count = OneYou2Page.objects.count()
        live_page_count = OneYou2Page.objects.live().count()

        release_content = release.content.first()
        release_content_dict = json.loads(release_content.content)

        self.assertNotEquals(page_count, len(release_content_dict))
        self.assertEquals(live_page_count, len(release_content_dict))

        revision_in_release = False
        if str(page.id) in release_content_dict:
            revision_in_release = True

        self.assertIsFalse(revision_in_release)

    def test_page_serializable_data_function_returns_the_full_content_of_shared_shelves(self):
        """
        serializable_data is used in the saving of a revision,
        so to check its working correctly we check the content of the revision.
        """
        shelf = create_test_promo_shelf()
        body_content_string = '[{"type": "simple_page_heading_shelf", "value": {"heading": "Heading", "shelf_id":' \
                              ' "1"}, "id": "b2d5e2e8-ae9d-46ef-92e6-27745a85df8c"},{"type": "promo_shelf", "value": ' \
                              + str(shelf.id) + ', "id": "14dd05e9-1d75-4831-a969-01f5c2c82b55"}]'
        page = create_test_page()
        page.body = page._meta.fields[24].to_python(body_content_string)

        page.save_revision()
        body_dict = json.loads(json.loads(page.get_latest_revision().content_json)['body'])

        self.assertEqual(len(body_dict), 2)
        self.assertIsTrue('content' in body_dict[1])
        self.assertIsTrue('shelf_id' in body_dict[1]['content'])
        self.assertEqual(body_dict[1]['content']['shelf_id'], shelf.shelf_id)

    def test_page_preview_modes_function_returns_the_correct_options(self):
        page = create_test_page()
        self.assertEquals(page.preview_modes, OneYou2Page.DEFAULT_PREVIEW_MODES)

    def test_page_default_preview_mode_returns_the_correct_option(self):
        page = create_test_page()
        default_preview_mode = 'react'
        self.assertEquals(page.default_preview_mode, default_preview_mode)


class RecipePageModelTests(OneYouTests):
    def test_page_can_be_created(self):
        page = create_test_recipe_page()
        expected_title = 'Test Recipe page'
        self.assertEquals(page.title, expected_title)
        self.assertNotEquals(page.id, None)

    @patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
    def test_publishing_recipe_page_to_release_links_new_revision_to_release(self, mock_file_service):
        page = create_test_recipe_page()

        initial_revision = page.get_latest_revision()

        release = create_test_release()

        page.release = release
        page.title = 'Updated page'
        page.save_revision().publish()
        page.save()

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


class ThemeModelTests(OneYouTests):
    def test_theme_string_method(self):
        label = 'test_theme_label'
        theme = create_test_theme(label=label)
        self.assertEqual(theme.__str__(), label)

    def test_to_dict(self):
        """
        to_dict method should return a dictionary representing the object
        """
        test_label = "Test theme"
        test_class_name = "test-class"
        theme = Theme(label=test_label, class_name=test_class_name)
        theme_dict = theme.to_dict()
        self.assertIs(theme_dict['label'], test_label)
        self.assertIs(theme_dict['class_name'], test_class_name)


class MenuModelTests(OneYouTests):
    def test_menu_string_method(self):
        label = 'test_menu_label'
        menu = create_test_menu(label=label)
        self.assertEqual(menu.__str__(), label)


class FooterModelTests(OneYouTests):
    def test_footer_string_method(self):
        label = 'test_footer_label'
        footer = create_test_footer(label=label)
        self.assertEqual(footer.__str__(), label)


class HeaderModelTests(OneYouTests):
    def test_header_string_method(self):
        label = 'test_header_label'
        header = create_test_header(label=label)
        self.assertEqual(header.__str__(), label)


class PagesUtilsTests(OneYouTests):
    def test_get_serializable_data_for_fields_correctly_serialises_the_page(self):
        page = create_test_page()
        field = OneYou2Page._meta.get_field('body')
        page.body = StreamValue(field.stream_block,
                                [('section_heading_shelf',
                                  StructValue([('heading', 'This is a section heading'), ('shelf_id', 'shelf1')]))])
        serialized_data = get_serializable_data_for_fields(page)

        self.assertEqual(type(serialized_data), dict)

    def test_replace_embeds_with_links_correctly_turns_embeds_into_img_tags(self):
        image = PHEImage(width=100, height=100)
        image.save()
        image_id = image.id
        rich_text_source = '<p><embed alt="one_you_logo.png" embedtype="image" format="right" id="'\
                           + str(image_id) + '"/><br/></p>'
        processed_content = process_inlines(rich_text_source)
        self.assertNotEquals(rich_text_source, processed_content)
        self.assertIsFalse('<embed' in processed_content)
        self.assertIsTrue('<img' in processed_content)

    def test_replace_internal_links_correctly_returns_a_tag_with_hrf(self):
        page = create_test_page()
        rich_text_source = '<p><a id="{}" linktype="page">link 1</a></p>'.format(page.id)
        processed_content = process_inlines(rich_text_source)
        self.assertNotEquals(rich_text_source, processed_content)
        self.assertIsTrue('<a' in processed_content)
        self.assertIsTrue('href="' in processed_content)


class PagesMenuAdminWagtailHooksTests(OneYouTests):
    def test_menu_admin_button_helper_class_is_correct(self):
        menu_admin = MenuAdmin()

        menu_button_helper = menu_admin.get_button_helper_class()

        self.assertEqual(type(menu_button_helper), type(MenuButtonHelper))


class PagesButtonHelperWagTailHooksTests(OneYouTests):
    def test_copy_button_returns_a_link_to_copy_the_menu(self):
        menu = create_test_menu()
        menu_admin = MenuAdmin()
        view = IndexView(menu_admin)
        request = HttpRequest()

        menu_button_helper = MenuButtonHelper(view, request)
        copy_button = menu_button_helper.copy_button(menu.id)

        self.assertEqual(copy_button['label'], 'copy')

    def test_get_btns_for_obj_returns_a_list_containing_a_copy_button(self):
        menu = create_test_menu()
        menu_admin = MenuAdmin()
        view = IndexView(menu_admin)
        request = WSGIRequest({'REQUEST_METHOD': "GET", 'wsgi.input': ''})
        request.user = create_test_user()

        menu_button_helper = MenuButtonHelper(view, request)
        buttons = menu_button_helper.get_buttons_for_obj(menu)

        copy_in_buttons = False
        for btn in buttons:
            if btn['label'] == 'copy':
                copy_in_buttons = True

        self.assertIsTrue(copy_in_buttons)
