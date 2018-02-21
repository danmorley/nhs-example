from django.contrib.contenttypes.models import ContentType

from wagtail.tests.utils import WagtailPageTests

from oneYou2.test_helpers import assertIsTrue, assertIsFalse
from shelves.models import ShelfAbstract, ShelfRevision, PromoShelf

class ShelfAbstractModelTests(WagtailPageTests):

  def test_initialising_an_instance_assigns_the_content_type(self):
    shelf = ShelfAbstract(label='Test label')

    expectedContentType = ContentType.objects.get_for_model(shelf)

    self.assertEqual(shelf.content_type, expectedContentType)


  def test_initialising_a_sub_class_instance_assigns_the_correct_content_type(self):
    abstractShelf = ShelfAbstract(label='Abstract Test label')
    shelf = PromoShelf(label="Test shelf", heading="The heading of the shelf")

    expectedContentType = ContentType.objects.get_for_model(shelf)
    notExpectedContentType = ContentType.objects.get_for_model(abstractShelf)

    self.assertEqual(shelf.content_type, expectedContentType)
    self.assertNotEqual(shelf.content_type, notExpectedContentType)


  def test_saving_a_shelf_abstract_creates_a_new_revision(self):
    shelf = ShelfAbstract(label="Test shelf")

    self.assertEqual(shelf.revisions.count(), 0)

    shelf.save()

    loadedShelf = ShelfAbstract.objects.get(label="Test shelf")

    self.assertEqual(loadedShelf.revisions.count(), 1)

    shelf.delete()


  def test_child_class_saving_also_creates_new_revision(self):
    shelf = PromoShelf(label="Test shelf", heading="The heading of the shelf")

    self.assertEqual(shelf.revisions.count(), 0)

    shelf.save()

    loadedShelf = PromoShelf.objects.get(heading="The heading of the shelf")

    self.assertEqual(loadedShelf.revisions.count(), 1)

    shelf.delete()


  def test_saving_associates_new_revision_to_live_revision(self):
    shelf = ShelfAbstract(label="Test shelf")

    self.assertIsNone(shelf.live_revision)

    shelf.save()

    loadedShelf = ShelfAbstract.objects.get(label="Test shelf")

    self.assertIsNotNone(shelf.live_revision)

    shelf.delete()


  def test_specific_returns_the_instance_in_the_correct_class_type(self):
    shelf = ShelfAbstract(label='Test label')
    shelf.save()

    expectedContentType = ContentType.objects.get_for_model(shelf.specific)
    self.assertEqual(shelf.content_type, expectedContentType)

    shelf.delete()

    shelf = PromoShelf(label="Test shelf", heading="The heading of the shelf 1")
    shelf.save()

    expectedContentType = ContentType.objects.get_for_model(shelf.specific)
    self.assertEqual(shelf.content_type, expectedContentType)

    shelf.delete()

  def test_to_dict_returns_the_object_as_a_dictionary(self):
    shelf = ShelfAbstract(label='Test label')

    shelf_dict = shelf.to_dict()

    self.assertEqual(shelf_dict['label'], shelf.label)


class ShelfRevisionModelTests(WagtailPageTests):

  def test_saving_adds_a_created_at_time(self):
    shelf = ShelfAbstract(label='Test label')
    shelf.save()

    revision = ShelfRevision(shelf_id = shelf.id, content_json = shelf.to_dict())

    self.assertIsNone(revision.created_at)

    revision.save()

    self.assertIsNotNone(revision.created_at)

    shelf.delete()


  def test_is_latest_revision_returns_correct_value(self):
    shelf = ShelfAbstract(label='Test label')
    shelf.save()

    initialRevision = shelf.live_revision

    secondRevision = ShelfRevision(shelf_id = shelf.id, content_json = shelf.to_dict())

    secondRevision.save()

    assertIsFalse(self, initialRevision.is_latest_revision())

    assertIsTrue(self, secondRevision.is_latest_revision())

    shelf.delete()


  def test_is_latest_revision_returns_true_for_unsaved_revisions(self):
    shelf = ShelfAbstract(label='Test label')
    shelf.save()

    revision = ShelfRevision(shelf_id = shelf.id, content_json = shelf.to_dict())

    self.assertIsNone(revision.id)
    assertIsTrue(self, revision.is_latest_revision())

    shelf.delete()


  def test_get_previous_returns_the_previous_revision(self):
    shelf = ShelfAbstract(label='Test label')
    shelf.save()

    initialRevision = shelf.live_revision

    secondRevision = ShelfRevision(shelf_id = shelf.id, content_json = shelf.to_dict())

    secondRevision.save()

    assertIsTrue(self, secondRevision.is_latest_revision())

    previousRevision = secondRevision.get_previous()

    self.assertEqual(initialRevision.id, previousRevision.id)

    shelf.delete()


  def test_get_next_returns_the_next_revision(self):
    shelf = ShelfAbstract(label='Test label')
    shelf.save()

    initialRevision = shelf.live_revision

    secondRevision = ShelfRevision(shelf_id=shelf.id, content_json=shelf.to_dict())

    secondRevision.save()

    assertIsFalse(self, initialRevision.is_latest_revision())

    nextRevision = initialRevision.get_next()

    self.assertEqual(secondRevision.id, nextRevision.id)

    shelf.delete()


  def test_publish_duplicates_revision_as_live_on_the_shelf(self):
    shelf = ShelfAbstract(label='Test label')
    shelf.save()

    initialRevision = shelf.live_revision

    shelf.label = 'Test label 2'
    shelf.save()

    secondRevision = shelf.live_revision

    self.assertNotEqual(shelf.live_revision.id, initialRevision.id)
    self.assertEqual(shelf.live_revision.id, secondRevision.id)
    self.assertEqual(shelf.revisions.count(), 2)

    initialRevision.publish()

    shelf = ShelfAbstract.objects.get(label='Test label')

    self.assertEqual(shelf.revisions.count(), 3)
    self.assertNotEqual(shelf.live_revision.content_json, secondRevision.content_json)
    self.assertEqual(initialRevision.as_shelf_object().label, shelf.live_revision.as_shelf_object().label)

    shelf.delete()




