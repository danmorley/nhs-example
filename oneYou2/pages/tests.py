import json
from unittest.mock import patch

from wagtail.wagtailcore.blocks.stream_block import StreamValue
from wagtail.wagtailcore.blocks.struct_block import StructValue

from images.models import PHEImage

from oneYou2.test.utils import OneYouTests

from pages.factories import create_test_page, create_test_theme
from pages.models import OneYou2Page, Theme, SectionHeading
from pages.utils import get_serializable_data_for_fields, replace_embeds_with_links

from release.factories import create_test_release

from shelves.factories import create_test_promo_shelf


class OneYou2PageModelTests(OneYouTests):

    def test_initialisation_generates_ref(self):
        """
        init generates a unique reference for a page
        """
        page = OneYou2Page()
        self.assertIsNotNone(page.page_ref)
        self.assertIsNot(page.page_ref, '')

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

    def test_from_dict_page_builder(self):
        """
        create_from_dict method should produce an instance of the class based on the dictonary
        """
        obj_dict = {'title': 'Page title', 'path': '00001', 'depth': '0', 'numchild': '0',
                    'body': '', 'page_theme': {'id': 1}, 'page_ref': 'ref0001', 'live': True,
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
        self.assertIs(page.page_ref, obj_dict['page_ref'])
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
                           theme=theme, page_ref='ref0001', live=True, slug='page-path', seo_title='page-name',
                           show_in_menus=True, search_description='page-description', first_published_at='yesterday')

        obj_dict = {'title': 'Page title 2', 'path': '00002', 'depth': '1', 'numchild': '1',
                    'body': '', 'page_theme': {'id': 2}, 'page_ref': 'ref0001', 'live': True,
                    'meta': {'slug': 'page-path2', 'seo_title': 'page-name2',
                             'show_in_menus': True, 'search_description': 'page-description2',
                             'first_published_at': 'today'}
                    }

        page = page.update_from_dict(obj_dict)

        self.assertIs(page.title, obj_dict['title'])
        self.assertIs(page.path, obj_dict['path'])
        self.assertIs(page.depth, obj_dict['depth'])
        self.assertIs(page.numchild, obj_dict['numchild'])
        self.assertIs(page.theme_id, obj_dict['page_theme']['id'])
        self.assertIs(page.page_ref, obj_dict['page_ref'])
        self.assertIs(page.live, obj_dict['live'])
        self.assertIs(page.slug, obj_dict['meta']['slug'])
        self.assertIs(page.seo_title, obj_dict['meta']['seo_title'])
        self.assertIs(page.show_in_menus, obj_dict['meta']['show_in_menus'])
        self.assertIs(page.search_description, obj_dict['meta']['search_description'])
        self.assertIs(page.first_published_at, obj_dict['meta']['first_published_at'])

    def test_save_doesnt_update_page_ref_if_exists(self):
        theme = create_test_theme()

        page = OneYou2Page(title="Test page", path='1111', depth=0, theme=theme)
        original_page_ref = page.page_ref

        self.assertIsNotNone(page.page_ref)
        self.assertIsNot(page.page_ref, '')

        page.save()

        loadedPage = OneYou2Page.objects.get(title="Test page")

        self.assertEqual(loadedPage.page_ref, original_page_ref)

    def test_save_creates_page_ref_if_doesnt_exists(self):
        theme = create_test_theme()

        page = OneYou2Page(title="Test page", path='1111', depth=0, theme=theme)
        page.page_ref = ''
        original_page_ref = page.page_ref

        self.assertEqual(page.page_ref, '')

        page.save()

        loadedPage = OneYou2Page.objects.get(title="Test page")

        self.assertIsNot(loadedPage.page_ref, original_page_ref)

    @patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
    def test_publishing_page_to_release_links_new_revision_to_release(self, mock_file_service):
        page = create_test_page()

        initial_revision = page.get_latest_revision()

        release = create_test_release()

        page.release = release
        page.save_revision().publish()
        page.save()

        second_revision = page.get_latest_revision()

        initial_revision_in_release = False
        second_revision_in_release = False
        for revision in release.revisions.all():
            if revision.revision.id == initial_revision.id:
                initial_revision_in_release = True
            if revision.revision.id == second_revision.id:
                second_revision_in_release = True

        self.assertTrue(second_revision_in_release)
        self.assertIsFalse(initial_revision_in_release)

    @patch('azure.storage.file.fileservice.FileService.get_file_to_text', return_value='abcd')
    def test_unpublishing_a_page_removes_the_revision_for_that_page_from_the_release(self, mock_file_service):
        page = create_test_page()

        release = create_test_release()

        page_count = OneYou2Page.objects.count()
        live_page_count = OneYou2Page.objects.live().count()
        self.assertEquals(page_count, release.revisions.count())
        self.assertEquals(live_page_count, release.revisions.count())

        revision_in_release = False
        for revision in release.revisions.all():
            if revision.revision.id == page.get_latest_revision().id:
                revision_in_release = True

        self.assertTrue(revision_in_release)

        page.release = release
        page.unpublish()

        page_count = OneYou2Page.objects.count()
        live_page_count = OneYou2Page.objects.live().count()

        self.assertNotEquals(page_count, release.revisions.count())
        self.assertEquals(live_page_count, release.revisions.count())

        revision_in_release = False
        for revision in release.revisions.all():
            if revision.revision.id == page.get_latest_revision().id:
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


class ThemeModelTests(OneYouTests):

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


class PagesUtilsTest(OneYouTests):
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
        processed_content = replace_embeds_with_links(rich_text_source)
        self.assertNotEquals(rich_text_source, processed_content)
        self.assertIsFalse('<embed' in processed_content)
        self.assertIsTrue('<img' in processed_content)

