from django.conf.urls import url

from . import views
from .newworld_migration import copy_oneyou_newworld

# Override Wagtail paths

app_name = 'oneyou_pages'
urlpatterns = [
    # url(r'^(?P<page_id>\d+)/copyoneyounewworld/', copy_oneyou_newworld, name='copy_oneyou_newworld'),
    # url(r'^(\d+)/unpublish/', views.unpublish, name='unpublish-custom'),
    # url(r'^(\d+)/copy/', views.copy, name='copy-page'),
    # url(r'^(\d+)/edit/$', views.edit, name='unpublish-page'),
    # url(r'^(\d+)/revisions/(\d+)/view/$', views.revisions_view, name='revisions_view'),
    # url(r'^moderation/(?P<revision_id>\d+)/approve/$', views.approve_moderation_release, name='approve_moderation'),
    # url(r'^moderation/(?P<revision_id>\d+)/reject/$', views.reject_moderation_release, name='reject_moderation'),
]