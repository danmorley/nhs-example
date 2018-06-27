from datetime import timedelta

from django.contrib.auth.models import User
from django.contrib.messages.storage.fallback import FallbackStorage
from django.core.exceptions import PermissionDenied
from django.http import HttpRequest, Http404, QueryDict
from django.utils import timezone

from .factories import create_test_oneyou_variant, create_test_experiment
from .models import OneYouVariant
from .views import VarientAdminURLHelper, create, edit

from oneYou2.factories import create_test_user
from oneYou2.test.utils import OneYouTests

from pages.factories import create_test_recipe_page

TEST_POST_CONTENT = QueryDict('csrfmiddlewaretoken=0hicVc5uV4hYXDnkzJljxKKhN5obLb1eEj6L77pXEMdOoRUPcoBUpYIpyZeHTpyd&'
                              'next=/admin/experiments/oneyouvariant/&titleContact Us (describe the variant)&'
                              'body-count=1&body-0-deleted=&body-0-order=0&body-0-type=simple_page_heading_shelf&'
                              'body-0-id=&body-0-value-heading=Test page&body-0-value-shelf_id&body-0-value-body=&'
                              'release=&theme=1&change_history-TOTAL_FORMS=0&change_history-INITIAL_FORMS=0&'
                              'change_history-MIN_NUM_FORMS=0&change_history-MAX_NUM_FORMS=1000&'
                              'og_title=One You - Home&og_description=Start the fight back to a healthier you!&'
                              'og_url=&og_image_fk=1&og_type=website&twitter_url=&twitter_card=summary&'
                              'twitter_site=@OneYouPHE&twitter_title=One You - Home&'
                              'twitter_description=Start the fight back to a healthier you!&'
                              'twitter_image_fk=1&use_share_button=on&slug=contact-us-v9bfb68&'
                              'seo_title=&search_description=&next=')


class VarientAdminURLHelperViewsTests(OneYouTests):

    def test_get_action_url_returns_the_add_url_for_an_add_action(self):
        url_helper = VarientAdminURLHelper(model=OneYouVariant)
        action = 'add'
        module = 'experiments'
        model = 'oneyouvariant'
        id = 1
        actual = url_helper.get_action_url(action, module, model, id)
        expected = "/admin/experiments/oneyouvariant/" + action + "/" + module + "/" + model + "/" + str(id) + "/"
        self.assertIsTrue(expected in actual)

    def test_get_action_url_returns_the_edit_url_for_an_edit_action(self):
        url_helper = VarientAdminURLHelper(model=OneYouVariant)
        action = 'edit'
        id = 1
        actual = url_helper.get_action_url(action, id)
        expected = "/admin/experiments/oneyouvariant/" + str(id) + "/" + action + "/"
        self.assertIsTrue(expected in actual)


class CreateExperimentsViewsTests(OneYouTests):

    def test_create_view_get(self):
        request = HttpRequest()
        user = User.objects.first()
        request.user = user
        app_name = 'experiments'
        model_name = 'oneyouvariant'
        response = create(request, app_name, model_name, 3)
        self.assertEquals(response.status_code, 200)

    def test_create_view_post(self):
        request = HttpRequest()
        setattr(request, 'session', 'session')
        messages = FallbackStorage(request)
        setattr(request, '_messages', messages)
        user = User.objects.first()
        request.user = user
        request.method = 'POST'
        request.POST = TEST_POST_CONTENT
        app_name = 'experiments'
        model_name = 'oneyouvariant'
        response = create(request, app_name, model_name, 3)
        self.assertEquals(response.status_code, 200)

    def test_create_view_correctly_checks_permisions(self):
        user = create_test_user()
        request = HttpRequest()
        request.user = user
        app_name = 'experiments'
        model_name = 'oneyouvariant'
        permission_error_thrown = False
        try:
            create(request, app_name, model_name, 3)
        except PermissionDenied:
            permission_error_thrown = True
        self.assertIsTrue(permission_error_thrown)

    def test_create_view_throws_404_for_unknown_app_name(self):
        user = User.objects.first()
        request = HttpRequest()
        request.user = user
        app_name = 'made_up_name'
        model_name = 'oneyouvariant'
        not_found_error_thrown = False
        try:
            create(request, app_name, model_name, 3)
        except Http404:
            not_found_error_thrown = True
        self.assertIsTrue(not_found_error_thrown)

    def test_create_view_throws_404_for_unknown_model_name(self):
        user = User.objects.first()
        request = HttpRequest()
        request.user = user
        app_name = 'experiments'
        model_name = 'made_up_name'
        not_found_error_thrown = False
        try:
            create(request, app_name, model_name, 3)
        except Http404:
            not_found_error_thrown = True
        self.assertIsTrue(not_found_error_thrown)

    def test_create_view_throws_404_for_models_not_child_of_page(self):
        user = User.objects.first()
        request = HttpRequest()
        request.user = user
        app_name = 'experiments'
        model_name = 'experimentscontent'
        not_found_error_thrown = False
        try:
            create(request, app_name, model_name, 3)
        except Http404:
            not_found_error_thrown = True
        self.assertIsTrue(not_found_error_thrown)

    def test_create_view_throws_permission_error_for_models_not_allowed_under_parent(self):
        parent_page = create_test_recipe_page()
        user = User.objects.first()
        request = HttpRequest()
        request.user = user
        app_name = 'experiments'
        model_name = 'oneyouvariant'
        permission_error_thrown = False

        try:
            create(request, app_name, model_name, parent_page.id)
        except PermissionDenied:
            permission_error_thrown = True
        self.assertIsTrue(permission_error_thrown)


class EditExperimentsViewsTests(OneYouTests):

    def test_edit_view_get(self):
        request = HttpRequest()
        page = create_test_oneyou_variant()
        user = User.objects.first()
        request.user = user
        response = edit(request, page.id)
        self.assertEquals(response.status_code, 200)

    def test_create_view_post(self):
        page = create_test_oneyou_variant()
        request = HttpRequest()
        setattr(request, 'session', 'session')
        messages = FallbackStorage(request)
        setattr(request, '_messages', messages)
        user = User.objects.first()
        request.user = user
        request.method = 'POST'
        request.POST = TEST_POST_CONTENT
        response = edit(request, page.id)
        self.assertEquals(response.status_code, 200)

    def test_create_view_locks_live_experiments(self):
        page = create_test_oneyou_variant()
        experiment = create_test_experiment(start_date=timezone.now() + timedelta(days=-1),
                                            end_date=timezone.now() + timedelta(days=1))
        experiment.variants.add(page.id)
        request = HttpRequest()
        setattr(request, 'session', 'session')
        messages = FallbackStorage(request)
        setattr(request, '_messages', messages)
        user = User.objects.first()
        request.user = user
        request.method = 'POST'
        request.POST = TEST_POST_CONTENT
        response = edit(request, page.id)
        self.assertEquals(response.status_code, 200)

    def test_edit_view_correctly_checks_permissions(self):
        user = create_test_user()
        page = create_test_oneyou_variant()
        request = HttpRequest()
        request.user = user
        permission_error_thrown = False
        try:
            edit(request, page.id)
        except PermissionDenied:
            permission_error_thrown = True
        self.assertIsTrue(permission_error_thrown)
