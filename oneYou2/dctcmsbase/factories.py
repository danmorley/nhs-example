from wagtail.core.models import Site

from home.models import SiteSettings
from images.factories import create_default_test_image
from images.models import PHEImage

from .sharedcontent import Banner
from .pagecomponents import Theme, Menu


def create_test_theme(label='Test theme', class_name='test-class'):
    theme = Theme(label=label, class_name=class_name)
    theme.save()
    return theme


def create_test_menu(label='menu_label'):
    menu = Menu(label=label)
    menu.save()
    return menu


def create_test_page(model, parent=None, title='Test page', path='1111', depth=0, theme=None):
    if not theme:
        theme = create_test_theme()
    if PHEImage.objects.count() == 0:
        create_default_test_image(id=1)

    site = Site.objects.first()
    if not site.site_name:
        site.site_name = 'test'
        site.save()

    site_settings = SiteSettings.objects.filter(site_id=site.id).first()
    if not site_settings:
        site_settings = SiteSettings(site_id=site.id)
    site_settings.menu = create_test_menu()
    site_settings.save()

    if parent is None:
        parent = site.root_page

    page = model(title=title, path=path, depth=depth, page_theme=theme, live=True)
    parent.add_child(instance=page)
    page.save_revision().publish()

    return page

def create_test_banner(heading='Test heading'):
    banner = Banner(heading=heading)
    banner.save()
    return banner