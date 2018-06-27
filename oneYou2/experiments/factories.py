from images.factories import create_default_test_image
from images.models import PHEImage

from .models import OneYouVariant, Experiment

from pages.factories import create_test_page


def create_test_oneyou_variant(parent_page=None, title='Test page (variant)', path="11111111", depth=0, theme=None):
    if not parent_page:
        parent_page = create_test_page()
    if not theme:
        theme = parent_page.theme
    if PHEImage.objects.count() == 0:
        create_default_test_image(id=1)

    variant = OneYouVariant(title=title, path=path, depth=depth, theme=theme)
    parent_page.add_child(instance=variant)
    variant.save_revision().publish()
    variant.save()

    return variant


def create_test_experiment(name='Test Experiment', start_date=None, end_date=None):
    experiment = Experiment(name=name, start_date=start_date, end_date=end_date)
    experiment.save()
    return experiment
