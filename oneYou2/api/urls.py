from django.conf.urls import url

from . import views
from release import views as release_views

app_name = 'react_api'
urlpatterns = [
    url(r'^preview/sites/(?P<site_identifier>[\w\-]+)/pages/(?P<page_slug>[\w\-]+)/$',
        views.page_preview,
        name='page-preview'),

    url(r'^sites/(?P<site_identifier>[\w\-]+)/$',
        views.site_view,
        name='current-release-view'),

    url(r'^sites/(?P<site_identifier>[\w\-]+)/pages/$',
        views.full_page_list,
        name='all-pages'),

    url(r'^sites/(?P<site_identifier>[\w\-]+)/(?P<release_uuid>[\w\-]+)/$',
        views.release_view,
        name='specific-release-view'),

    url(r'^sites/(?P<site_identifier>[\w\-]+)/(?P<release_uuid>[\w\-]+)/pages/$',
        views.page_list,
        name='page-list'),

    url(r'^sites/(?P<site_identifier>[\w\-]+)/(?P<release_uuid>[\w\-]+)/pages/home/$',
        views.home_page_detail,
        name='home-page-detail'),

    url(r'^sites/(?P<site_identifier>[\w\-]+)/(?P<release_uuid>[\w\-]+)/pages/(?P<page_pk>\d+)/$',
        views.page_detail,
        name='page-detail-by-pk'),

    url(r'^sites/(?P<site_identifier>[\w\-]+)/(?P<release_uuid>[\w\-]+)/pages/(?P<page_slug>[\w\-]+)/$',
        views.page_detail,
        name='page-detail-by-slug'),
    url(r'^open-releases/$', release_views.open_releases, name='open-release-list')
]
