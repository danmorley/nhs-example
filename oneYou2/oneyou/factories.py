import factory

from django.template.defaultfilters import slugify

from wagtail.core.models import Site

from images.factories import PHEImageFactory
from dctcmsbase.factories import ThemeFactory 

from .models import OneYouPage


class PageFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = OneYouPage

    title = factory.fuzzy.FuzzyText()
    depth = 0
    path = '1111'
    slug = slugify(title)
    og_image_fk = factory.SubFactory(PHEImageFactory)
    twitter_image_fk = factory.SubFactory(PHEImageFactory)
    theme = factory.SubFactory(ThemeFactory)

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        """Create an instance of a page, create a revision, and save them to the database."""
        manager = cls._get_manager(model_class)

        if cls._meta.django_get_or_create:
            return cls._get_or_create(model_class, *args, **kwargs)

        page = manager.create(*args, **kwargs)
        page.save_revision()

        return page


class SiteFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Site

    site_name = factory.fuzzy.FuzzyText()
    root_page = factory.SubFactory(PageFactory)