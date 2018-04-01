from django.conf.urls import url

from . import views

app_name = 'oneyou_pages'
urlpatterns = [
    url(r'^sites/(?P<site_identifier>[\w\-]+)/$',
        views.site_view,
        name='current-release-view'),

    url(r'^sites/(?P<site_identifier>[\w\-]+)/(?P<release_uuid>[\w\-]+)/$',
        views.site_view,
        name='specific-release-view'),

    url(r'^sites/(?P<site_identifier>[\w\-]+)/(?P<release_uuid>[\w\-]+)/pages/$',
        views.page_list,
        name='page-list'),

    url(r'^sites/(?P<site_identifier>[\w\-]+)/(?P<release_uuid>[\w\-]+)/pages/(?P<page_pk>\d+)/$',
        views.page_detail,
        name='page-detail'),
]
