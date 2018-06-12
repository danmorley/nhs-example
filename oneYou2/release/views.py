from __future__ import unicode_literals

from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
from django.views.static import serve
from django.conf import settings

from release.utils import get_latest_release
from oneYou2.utils import get_protocol
from frontendHandler.models import FrontendVersion
from home.models import SiteSettings
from wagtail.wagtailredirects.models import Redirect

from .models import Release


def release_html(request, site_name):
    try:
        site_id = SiteSettings.objects.get(uid=site_name).site.id
    except ObjectDoesNotExist:
        return HttpResponse("Page Not Found", status=404)

    if getattr(request, 'path', None):
        site_redirects = Redirect.get_for_site(site_id)
        wagtail_redirect = site_redirects.filter(old_path=request.path).first()
        if not wagtail_redirect:
            if request.path[-1] == '/':
                wagtail_redirect = Redirect.objects.filter(site=site_id, old_path=request.path[:-1]).first()
            else:
                wagtail_redirect = Redirect.objects.filter(site=site_id, old_path=request.path + '/').first()

        if wagtail_redirect:
            if wagtail_redirect.redirect_page:
                redirect_path = '/oneyou{}'.format(wagtail_redirect.redirect_page.url)
            else:
                redirect_path = wagtail_redirect.redirect_link

            permanent = wagtail_redirect.is_permanent
            return redirect(redirect_path, permanent=permanent)

    release_id = request.GET.get('id')
    if release_id:
        release = Release.objects.get(uuid=release_id)
    else:
        release = get_latest_release(site_id)

    if release:
        frontend_id = release.frontend_id
        uuid = release.uuid
    else:
        # In this sc
        frontend_id = FrontendVersion.get_current_version()
        uuid = 'current'

    index = FrontendVersion.get_html_for_version(frontend_id)
    substituted_index = index.replace("/static/css/", "/{}/version/css/{}/?file_name=".format(site_name, frontend_id))
    substituted_index = substituted_index.replace("/static/js/",
                                                  "/{}/version/js/{}/?file_name=".format(site_name, frontend_id))
    substituted_index = substituted_index.replace("/manifest", "/{}/public/manifest".format(site_name))
    substituted_index = substituted_index.replace("/favicon", "/{}/public/{}/favicon".format(site_name, frontend_id))
    # substituted_index = substituted_index.replace("/webtrends", "/{}/public/webtrends".format(site_name))

    host = request.__dict__['META']['HTTP_HOST']

    if settings.CONTENT_STORE_ENDPOINT:
        content_store_endpoint = settings.CONTENT_STORE_ENDPOINT
    else:
        content_store_endpoint = get_protocol() + host + "/api"

    if "local" in host or "service" in host:
        content_store_endpoint = get_protocol() + host + "/api"

    substituted_index = substituted_index.replace("%apiurl%", content_store_endpoint)
    substituted_index = substituted_index.replace("%releaseid%", uuid)
    http_response = HttpResponse(substituted_index)

    if release and release.content_status == 1:
        http_response['Cache-Control'] = 'max-age=900'
    return http_response


def release_js(request, site_name, version_id):
    file_name = request.GET.get('file_name')
    main_js = FrontendVersion.get_js_for_version(version_id, file_name)
    substituted_main_js = main_js.replace('/static/media', '/{}/public/static/media'.format(site_name))
    return HttpResponse(substituted_main_js)


def release_css(request, site_name, version_id):
    file_name = request.GET.get('file_name')
    main_css = FrontendVersion.get_css_for_version(version_id, file_name)
    substituted_main_css = main_css.replace('/static/media', '/{}/public/{}/static/media'.format(site_name, version_id))
    return HttpResponse(substituted_main_css, 'text/css')


def cms_statics(request, path):
    return serve(request, path, document_root='./static/')


def web_statics(request, site_name, path):
    return serve(request, path, document_root='./web/static/')


def statics(request, site_name, path):
    path_components = path.split('/')
    file_name = path_components.pop()
    FrontendVersion.load_static('/'.join(path_components), file_name)
    return serve(request, file_name, document_root='./web/')


def open_releases(request):
    releases = Release.objects.filter(content_status=0)
    response_obj = []
    for release in releases:
        response_obj.append({"id": release.id, "name": release.release_name})
    return JsonResponse({"releases": response_obj})
