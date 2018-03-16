from django.contrib.contenttypes.models import ContentType

from oneYou2.tests.utils import OneYouTests

from shelves.factories import create_test_abstract_shelf, create_test_promo_shelf, create_test_revision
from shelves.models import ShelfAbstract, ShelfRevision, PromoShelf


class ShelfAbstractModelTests(OneYouTests):

    def test_initialising_an_instance_assigns_the_content_type(self):
        shelf = create_test_abstract_shelf()

        expectedContentType = ContentType.objects.get_for_model(shelf)

        self.assertEqual(shelf.content_type, expectedContentType)

        shelf.delete()

    def test_initialising_a_sub_class_instance_assigns_the_correct_content_type(self):
        abstractShelf = create_test_abstract_shelf('Abstract test id')
        shelf = create_test_promo_shelf()

        expectedContentType = ContentType.objects.get_for_model(shelf)
        notExpectedContentType = ContentType.objects.get_for_model(abstractShelf)

        self.assertEqual(shelf.content_type, expectedContentType)
        self.assertNotEqual(shelf.content_type, notExpectedContentType)

        shelf.delete()
        abstractShelf.delete()

    def test_saving_a_shelf_abstract_creates_a_new_revision(self):
        shelf = ShelfAbstract(shelf_id="Test shelf")

        self.assertEqual(shelf.revisions.count(), 0)

        shelf.save()

        loadedShelf = ShelfAbstract.objects.get(shelf_id="Test shelf")

        self.assertEqual(loadedShelf.revisions.count(), 1)

        shelf.delete()

    def test_child_class_saving_also_creates_new_revision(self):
        shelf = PromoShelf(shelf_id="Test shelf", heading="The heading of the shelf")

        self.assertEqual(shelf.revisions.count(), 0)

        shelf.save()

        loadedShelf = PromoShelf.objects.get(heading="The heading of the shelf")

        self.assertEqual(loadedShelf.revisions.count(), 1)

        shelf.delete()

    def test_saving_associates_new_revision_to_live_revision(self):
        shelf = ShelfAbstract(shelf_id="Test shelf")

        self.assertIsNone(shelf.live_revision)

        shelf.save()

        self.assertIsNotNone(shelf.live_revision)

        shelf.delete()

    def test_specific_returns_the_instance_in_the_correct_class_type(self):
        shelf = create_test_abstract_shelf()

        expectedContentType = ContentType.objects.get_for_model(shelf.specific)
        self.assertEqual(shelf.content_type, expectedContentType)

        shelf.delete()

        shelf = create_test_promo_shelf()

        expectedContentType = ContentType.objects.get_for_model(shelf.specific)
        self.assertEqual(shelf.content_type, expectedContentType)

        shelf.delete()

    def test_to_dict_returns_the_object_as_a_dictionary(self):
        shelf = create_test_abstract_shelf()

        shelf_dict = shelf.to_dict()

        self.assertEqual(shelf_dict['shelf_id'], shelf.shelf_id)

        shelf.delete()


class ShelfRevisionModelTests(OneYouTests):

    def test_saving_adds_a_created_at_time(self):
        shelf = create_test_abstract_shelf()

        revision = ShelfRevision(shelf_id=shelf.id, content_json=shelf.to_dict())

        self.assertIsNone(revision.created_at)

        revision.save()

        self.assertIsNotNone(revision.created_at)

        shelf.delete()

    def test_is_latest_revision_returns_correct_value(self):
        shelf = create_test_abstract_shelf()

        initialRevision = shelf.live_revision

        secondRevision = create_test_revision(shelf)

        self.assertIsFalse(initialRevision.is_latest_revision())

        self.assertIsTrue(secondRevision.is_latest_revision())

        shelf.delete()

    def test_is_latest_revision_returns_true_for_unsaved_revisions(self):
        shelf = create_test_abstract_shelf()

        revision = ShelfRevision(shelf_id=shelf.id, content_json=shelf.to_dict())

        self.assertIsNone(revision.id)
        self.assertIsTrue(revision.is_latest_revision())

        shelf.delete()

    def test_get_previous_returns_the_previous_revision(self):
        shelf = create_test_abstract_shelf()

        initialRevision = shelf.live_revision

        secondRevision = create_test_revision(shelf)

        self.assertIsTrue(secondRevision.is_latest_revision())

        previousRevision = secondRevision.get_previous()

        self.assertEqual(initialRevision.id, previousRevision.id)

        shelf.delete()

    def test_get_next_returns_the_next_revision(self):
        shelf = create_test_abstract_shelf()

        initialRevision = shelf.live_revision

        secondRevision = create_test_revision(shelf)

        self.assertIsFalse(initialRevision.is_latest_revision())

        nextRevision = initialRevision.get_next()

        self.assertEqual(secondRevision.id, nextRevision.id)

        shelf.delete()

    def test_publish_duplicates_revision_as_live_on_the_shelf(self):
        shelf = create_test_abstract_shelf('Test label')

        initialRevision = shelf.live_revision

        shelf.shelf_id = 'Test label 2'
        shelf.save()

        secondRevision = shelf.live_revision

        self.assertNotEqual(shelf.live_revision.id, initialRevision.id)
        self.assertEqual(shelf.live_revision.id, secondRevision.id)
        self.assertEqual(shelf.revisions.count(), 2)

        initialRevision.publish()

        shelf = ShelfAbstract.objects.get(shelf_id='Test label')

        self.assertEqual(shelf.revisions.count(), 3)
        self.assertNotEqual(shelf.live_revision.content_json, secondRevision.content_json)
        self.assertEqual(initialRevision.as_shelf_object().shelf_id, shelf.live_revision.as_shelf_object().shelf_id)

        shelf.delete()

    def test_serializable_data_function_returns_a_dictionary_of_the_shelf(self):
        shelf = create_test_abstract_shelf()

        serialized_shelf = shelf.serializable_data()

        self.assertIsTrue('live_revision' in serialized_shelf)
        self.assertIsTrue('shelf_id' in serialized_shelf)
        self.assertIsTrue('content_type' in serialized_shelf)
