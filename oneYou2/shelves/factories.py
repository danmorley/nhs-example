from .models import ShelfAbstract, ShelfRevision, PromoShelf, BannerShelf


def create_test_abstract_shelf(shelf_id='Test ID'):
    shelf = ShelfAbstract(shelf_id=shelf_id)
    shelf.save()
    return shelf


def create_test_promo_shelf(shelf_id='Test ID', heading='Test heading'):
    shelf = PromoShelf(shelf_id=shelf_id, heading=heading)
    shelf.save()
    return shelf


def create_test_revision(shelf=None):
    if shelf is None:
        shelf = create_test_abstract_shelf()
    revision = ShelfRevision(shelf_id=shelf.id, content_json=shelf.to_dict())
    revision.save()
    return revision


def create_test_banner_shelf(shelf_id='Test ID', heading='Test heading'):
    shelf = BannerShelf(shelf_id=shelf_id, heading=heading)
    shelf.save()
    return shelf
