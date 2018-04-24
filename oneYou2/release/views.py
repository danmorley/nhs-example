from __future__ import unicode_literals

from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django.views.static import serve

from release.utils import get_latest_release
from oneYou2.utils import get_protocol
from frontendHandler.models import FrontendVersion
from home.models import SiteSettings

from .models import Release


def release_html(request, site_name):
    try:
        site_id = SiteSettings.objects.get(uid=site_name).site.id
    except ObjectDoesNotExist:
        return HttpResponse("Page Not Found", status=404)
    release_id = request.GET.get('id')
    if release_id:
        release = Release.objects.get(uuid=release_id)
    else:
        release = get_latest_release(site_id)

    if release:
        frontend_id = release.frontend_id
        uuid = release.uuid
    else:
        frontend_id = FrontendVersion.get_current_version()
        uuid = 'current'

    index = FrontendVersion.get_html_for_version(frontend_id)
    substituted_index = index.replace("/static/css/", "/version/css/" + frontend_id + "/?file_name=")
    substituted_index = substituted_index.replace("/static/js/", "/version/js/" + frontend_id + "/?file_name=")

    substituted_index = substituted_index.replace("%apiurl%", get_protocol()
                                                  + request.__dict__['META']['HTTP_HOST'] + "/api")
    substituted_index = substituted_index.replace("%releaseid%", uuid)
    http_response = HttpResponse(substituted_index)
    if release.content_status == 1:
        http_response['Cache-Control'] = 'max-age=3600'
    return http_response


def release_js(request, version_id):
    file_name = request.GET.get('file_name')
    return HttpResponse(FrontendVersion.get_js_for_version(version_id, file_name))


def release_css(request, version_id):
    file_name = request.GET.get('file_name')
    return HttpResponse(FrontendVersion.get_css_for_version(version_id, file_name), 'text/css')


def web_statics(request, path):
    if "wagtail" in path or "cms" in path:
        return serve(request, path, document_root='./static/')
    else:
        return serve(request, path, document_root='./web/static/')
