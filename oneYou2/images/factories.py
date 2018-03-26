from images.models import PHEImage


def create_default_test_image(id=None, title='Test page', file=None):
    image = PHEImage(id=id, title=title, width=120, height=120)
    image.save()

    return image
