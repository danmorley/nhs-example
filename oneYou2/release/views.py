from __future__ import unicode_literals

import json

from django.http import HttpResponse
from django.views.static import serve

from release.utils import get_latest_release
from .models import Release

from frontendHandler.models import FrontendVersion

from home.models import SiteSettings


def get_protocol(domain_name):
    if "service" in domain_name:
        return 'https://'
    else:
        return 'http://'


def release_html(request, site_name):
    site_id = SiteSettings.objects.get(uid=site_name).site.id
    release_id = request.GET.get('id')
    if release_id:
        release = Release.objects.get(uuid=release_id)
    else:
        release = get_latest_release(site_id)

    index = FrontendVersion.get_html_for_version(release.frontend_id)
    substituted_index = index.replace("/static/css/", "/version/css/" + release.frontend_id + "/?file_name=")
    substituted_index = substituted_index.replace("/static/js/", "/version/js/" + release.frontend_id + "/?file_name=")
    substituted_index = substituted_index.replace("%apiurl%", get_protocol(request.__dict__['META']['HTTP_HOST'])
                                                  + request.__dict__['META']['HTTP_HOST'] + "/api")
    substituted_index = substituted_index.replace("%releaseid%", release.uuid)
    return HttpResponse(substituted_index)


def release_js(request, version_id):
    file_name = request.GET.get('file_name')
    return HttpResponse(FrontendVersion.get_js_for_version(version_id, file_name))


def release_css(request, version_id):
    file_name = request.GET.get('file_name')
    return HttpResponse(FrontendVersion.get_css_for_version(version_id, file_name), 'text/css')


def web_statics(request, path):
    if "wagtail" in path:
        return serve(request, path, document_root='./static/')
    else:
        pass
        return serve(request, path, document_root='./web/static/')


def serve_local_assets(request, path):
    # asset_manifest = json.load(open('/code/frontend/website-client/build/asset-manifest.json'))
    # reverse_asset_manifest = dict((v, k) for k, v in asset_manifest.items())
    path = path.split('/')
    file_path = "{}/{}".format(path[0], request.GET['file_name'])
    print(file_path)
    return serve(request, file_path, document_root='/code/frontend/website-client/build/static')

