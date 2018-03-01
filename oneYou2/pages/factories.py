from wagtail.wagtailcore.models import Page

from .models import OneYou2Page, Theme


def create_test_theme(label="Test theme", class_name="test-class"):
  theme = Theme(label=label, class_name=class_name)
  theme.save()
  return theme


def create_test_page(title='Test page', path="1111", depth=0, theme=None):
  if not theme:
    theme = create_test_theme()
    
  root_page = Page.get_root_nodes()[0]

  page = OneYou2Page(title=title, path=path, depth=depth, theme=theme)
  root_page.add_child(instance=page)
  page.save_revision().publish()
  page.save()

  return page