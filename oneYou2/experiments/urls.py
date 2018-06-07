from __future__ import absolute_import, unicode_literals
from django.conf.urls import url

from . import views

urlpatterns = [
    url(
        r'^oneyouvariant/add/(\w+)/(\w+)/(\d+)/$',
        views.create,
        name='experiments_oneyouvariant_add'
    ),
    url(
        r'^oneyouvariant/(\d+)/edit/$',
        views.edit,
        name='experiments_oneyouvariant_edit'
    ),
]
