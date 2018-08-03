import factory
from factory import fuzzy
from images.models import PHEImage


def create_default_test_image(id=None, title='Test page', file=None):
    image = PHEImage(id=id, title=title, width=120, height=120)
    image.save()

    return image


class PHEImageFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = PHEImage

    title = fuzzy.FuzzyText()
    file = factory.django.ImageField(color='blue')
    width = 1200
    height = 1200
    # factory.django.ImageField(color='blue')
