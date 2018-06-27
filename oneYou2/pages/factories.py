from wagtail.wagtailcore.models import Site

from images.factories import create_default_test_image

from images.models import PHEImage

from home.models import SiteSettings
from .models import OneYou2Page, Theme, Menu, Footer, Header, RecipePage


def create_test_menu(label="menu_label"):
    menu = Menu(label=label)
    menu.save()
    return menu


def create_test_footer(label="footer_label"):
    footer = Footer(label=label)
    footer.save()
    return footer


def create_test_header(label="header_label"):
    header = Header(label=label)
    header.save()
    return header


def create_test_theme(label="Test theme", class_name="test-class"):
    theme = Theme(label=label, class_name=class_name)
    theme.save()
    return theme


def create_test_page(title='Test page', path="1111", depth=0, theme=None):
    if not theme:
        theme = create_test_theme()
    if PHEImage.objects.count() == 0:
        create_default_test_image(id=1)

    site = Site.objects.first()
    if not site.site_name:
        site.site_name = 'oneyoutest'
        site.save()

    site_settings = SiteSettings.objects.filter(site_id=site.id).first()
    if not site_settings:
        site_settings = SiteSettings(site_id=site.id)
    site_settings.menu = create_test_menu()
    site_settings.save()

    root_page = site.root_page

    page = OneYou2Page(title=title, path=path, depth=depth, theme=theme)
    root_page.add_child(instance=page)
    page.save_revision().publish()
    page.save()

    return page


def create_test_recipe_page(title='Test Recipe page', path="1111", depth=0, theme=None):
    if not theme:
        theme = create_test_theme()
    if PHEImage.objects.count() == 0:
        create_default_test_image(id=1)

    site = Site.objects.first()
    if not site.site_name:
        site.site_name = 'oneyoutest'
        site.save()

    site_settings = SiteSettings.objects.filter(site_id=site.id).first()
    if not site_settings:
        site_settings = SiteSettings(site_id=site.id)
    site_settings.menu = create_test_menu()
    site_settings.save()

    root_page = site.root_page

    page = RecipePage(title=title, path=path, depth=depth, theme=theme)
    root_page.add_child(instance=page)
    page.save_revision().publish()
    page.save()

    return page
