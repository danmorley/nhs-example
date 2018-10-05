from django.conf.urls import url

from . import views
from release import views as release_views

app_name = 'react_api'
urlpatterns = [
    url(r'^preview/sites/(?P<site_identifier>[\w\-]+)/pages/(?P<page_slug_path>[\w|\W]+)/$',
    # url(r'^preview/pages/(?P<page_slug>[\w\-]+)/revisions/(?P<page_revision>[\w\-]+)/$',
        views.page_preview,
        name='page-preview'),

    url(r'^sites/(?P<site_identifier>[\w\-]+)/$',
        views.site_view,
        name='current-release-view'),

    url(r'^sites/(?P<site_identifier>[\w\-]+)/(?P<release_uuid>[\w\-]+)/$',
        views.release_view,
        name='specific-release-view'),

    url(r'^sites/(?P<site_identifier>[\w\-]+)/(?P<release_uuid>[\w\-]+)/pages/(?P<page_slug_path>[\w|\W]+)/$',
        views.page_detail,
        name='page-detail-by-slug'),
    url(r'^open-releases/$', release_views.open_releases, name='open-release-list')
]
