from wagtail.tests.utils import WagtailPageTests

from pages.factories import create_test_page, create_test_theme
from pages.models import OneYou2Page, Theme

from release.factories import create_test_release


class OneYou2PageModelTests(WagtailPageTests):

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


  def test_publishing_page_to_release_links_new_revision_to_release(self):
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
    self.assertFalse(initial_revision_in_release)


class ThemeModelTests(WagtailPageTests):

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