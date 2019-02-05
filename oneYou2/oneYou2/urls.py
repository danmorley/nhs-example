from __future__ import absolute_import, unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.urls import include, path, re_path
from django.contrib import admin
from django.http import HttpResponse
from django.views.static import serve

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.core import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

from wagtail.contrib.sitemaps.views import sitemap

from .utils import get_release_version

from experiments import urls as experiment_urls
from release import views
from search import views as search_views
from api import urls as api_urls
# from pages import urls as pages_urls
from release import urls as pages_urls
from api.wagtail import api_router
from api import views as api_views
# from shelves.views import upload_actions


urlpatterns = [
    url(r'^django-admin/', admin.site.urls),

    url(r'^admin/custom/pages/', include(pages_urls, namespace='oneyou_pages')),
    url(r'^admin/experiments/', include(experiment_urls)),
    url(r'^admin/pages/', include(pages_urls)),
    # url(r'^admin/pages/', include(new_pages_urls)),
    # url(r'^admin/actions/upload/', upload_actions, name='upload_actions'),
    url(r'^admin/release/release/view/(?P<release_id>\d+)/$', views.release_view, name='release_view'),

    url(r'^admin/', include(wagtailadmin_urls)),
    url(r'^documents/', include(wagtaildocs_urls)),

    url(r'^robots\.txt$', api_views.robots, name='robots'),

    url(r'^api/', api_router.urls),
    url(r'^api/', include(api_urls)),

    url(r'^search/$', search_views.search, name='search'),

    url('^sitemap\.xml$', sitemap),

    url('^service-worker\.js$', serve, {'path': 'service-worker.js', 'document_root': './web/'}),
    url('^index\.html$', serve, {'path': 'index.html', 'document_root': './web/'}),

    url(r'^version/$', lambda request: HttpResponse(get_release_version()), name='cms_version'),
    url('^(?P<site_name>[\w-]+)/version/css/(?P<version_id>[\w-]+)/$', views.release_css, name='release_css'),
    url('^(?P<site_name>[\w-]+)/version/js/(?P<version_id>[\w-]+)/$', views.release_js, name='release_js'),
    # url(r'^(?P<path>main.js/)$', serve, {'document_root': './web/'}),
    # url(r'^(service-worker.js/)$', serve, {'document_root': './web/'}),
    url(r'^static/(?P<path>.*)$', views.cms_statics),
    url(r'^(?P<site_name>[\w-]+)/static/(?P<path>.*)$', views.web_statics),
    url(r'^(?P<site_name>[\w-]+)/public/(?P<path>.*)$', views.statics),
    url(r'^(?P<site_name>[\w-]+)/', views.release_html, name='release_html'),
    # For anything not caught by a more specific rule above, hand over to
    # Wagtail's page serving mechanism. This should be the last pattern in
    # the list:
    url(r'', include(wagtail_urls)),

    # Alternatively, if you want Wagtail pages to be served from a subpath
    # of your site, rather than the site root:
    #    url(r'^pages/', include(wagtail_urls)),
]

if settings.DEBUG:
    import debug_toolbar
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    from .views import api_gateway_portal

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    # Django debug toolbar
    urlpatterns = [
                      url(r'^__debug__/', include(debug_toolbar.urls)),
                      url(r'^location/', api_gateway_portal),
                  ] + urlpatterns
