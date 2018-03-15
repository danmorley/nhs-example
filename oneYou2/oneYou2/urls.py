from __future__ import absolute_import, unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.views.static import serve

from wagtail.wagtailadmin import urls as wagtailadmin_urls
from wagtail.wagtailcore import urls as wagtail_urls
from wagtail.wagtaildocs import urls as wagtaildocs_urls

from wagtail.contrib.wagtailsitemaps.views import sitemap

from .api import api_router
from release import views

from search import views as search_views

from pages import urls as pages_urls


urlpatterns = [
    url(r'^django-admin/', include(admin.site.urls)),

    url(r'^admin/custom/pages/', include(pages_urls, namespace="oneyou_pages")),


    url(r'^admin/', include(wagtailadmin_urls)),
    url(r'^documents/', include(wagtaildocs_urls)),

    url(r'^api/v2/', api_router.urls),

    url(r'^search/$', search_views.search, name='search'),

    url('^sitemap\.xml$', sitemap),

    url('^service-worker\.js$', serve, {'path': 'service-worker.js', 'document_root': './web/'}),
    url('^index\.html$', serve, {'path': 'index.html', 'document_root': './web/'}),

    url('^version/css/(?P<version_id>[\w-]+)/$', views.release_css, name='release_css'),
    url('^version/js/(?P<version_id>[\w-]+)/$', views.release_js, name='release_js'),
    # url(r'^(?P<path>main.js/)$', serve, {'document_root': './web/'}),
    # url(r'^(service-worker.js/)$', serve, {'document_root': './web/'}),
    url(r'^static/(?P<path>.*)$', views.web_statics),
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
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
