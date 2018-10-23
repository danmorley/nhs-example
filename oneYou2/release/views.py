from __future__ import unicode_literals
import json
import re

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.template import Context, Template
from django.views.static import serve

from wagtail.contrib.redirects.models import Redirect

from frontendHandler.models import FrontendVersion
from home.models import SiteSettings
from oneYou2.utils import get_protocol
from release.utils import get_latest_release, get_latest_live_release

from .models import Release, ReleasePage


def release_html(request, site_name):
    try:
        site_setting = SiteSettings.objects.get(uid=site_name)
        site_id = site_setting.site.id
    except ObjectDoesNotExist:
        return HttpResponse('Page Not Found', status=404)

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
                redirect_path = '/{}{}'.format(site_name, wagtail_redirect.redirect_page.url)
            else:
                redirect_path = wagtail_redirect.redirect_link

            permanent = wagtail_redirect.is_permanent
            return redirect(redirect_path, permanent=permanent)

    major_frontend_version = None
    release_id = request.GET.get('id')
    if release_id:
        release = Release.objects.get(uuid=release_id)
        frontend_name = release.get_frontend_id_display()
        matchObj = re.match( r'V([0-9]+)\..* - .*', frontend_name, re.I)
        if matchObj:
            try:
                major_frontend_version = int(matchObj.group(1))
            except ValueError:
                pass
    else:
        preview_page = request.GET.get('preview_page')
        if preview_page:
            release = get_latest_release(site_id)
        else:
            release = get_latest_live_release(site_id)

    if release:
        frontend_id = release.frontend_id
        uuid = release.uuid
    else:
        # In this sc
        frontend_id = FrontendVersion.get_current_version()
        uuid = 'current'

    host = request.META['HTTP_HOST']
    if settings.CONTENT_STORE_ENDPOINT:
        content_store_endpoint = settings.CONTENT_STORE_ENDPOINT
    else:
        content_store_endpoint = get_protocol() + host + '/api'

    if major_frontend_version and major_frontend_version <= 1:
        # legacy to render frontend index.html before multisite have been implemented
        index = FrontendVersion.get_html_for_version(frontend_id)
        substituted_index = index.replace("/static/css/", "/{}/version/css/{}/?file_name=".format(site_name, frontend_id))
        substituted_index = substituted_index.replace("/static/js/",
                                                    "/{}/version/js/{}/?file_name=".format(site_name, frontend_id))
        substituted_index = substituted_index.replace("/manifest", "/{}/public/manifest".format(site_name))
        substituted_index = substituted_index.replace("/favicon", "/{}/public/{}/favicon".format(site_name, frontend_id))
        substituted_index = substituted_index.replace("/webtrends.min.js", "/{}/public/{}/webtrends.min.js".format(site_name, frontend_id))

        host = request.META['HTTP_HOST']
        if settings.CONTENT_STORE_ENDPOINT:
            content_store_endpoint = settings.CONTENT_STORE_ENDPOINT
        else:
            content_store_endpoint = get_protocol() + host + "/api"

        substituted_index = substituted_index.replace("%apiurl%", content_store_endpoint)
        substituted_index = substituted_index.replace("%releaseid%", uuid)
        substituted_index = substituted_index.replace("%adobe_tracking_url%", settings.ADOBE_TRACKING_URL)
        http_response = HttpResponse(substituted_index)
    else:
        template = Template(FrontendVersion.get_html_for_version(frontend_id))

        context = Context({
            'site_setting': site_setting,
            'api_url': content_store_endpoint,
            'release_id': uuid,
            'public_url': '/{}/public/{}'.format(site_name, frontend_id),
            'css_path': '/{}/version/css/{}/?file_name='.format(site_name, frontend_id),
            'js_path': '/{}/version/js/{}/?file_name='.format(site_name, frontend_id),
        })

        if settings.ENV == 'local':
            context['public_url'] = '/static'

        http_response = HttpResponse(template.render(context))

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
        response_obj.append({'id': release.id, 'name': release.release_name})
    return JsonResponse({'releases': response_obj})



def release_view(request, release_id):
    release = None
    error_msg = ''
    pages = {}

    try:
        release = Release.objects.get(id=release_id)
    except Release.DoesNotExist:
        error_msg = 'This release id {} doesn\'t exist'.format(release_id)

    if release:
        pages_release = ReleasePage.objects.filter(release__id=release_id)

        # get live release content
        live_release, live_pages_release = None, None
        try:
            live_release = get_latest_live_release(release.site.id)
            live_pages_release = ReleasePage.objects.filter(release__id=live_release.id)
        except (Release.DoesNotExist, AttributeError) as e:
            error_msg = 'No live release'
        
        # Compare release with live release
        for page_release in pages_release:
            page_detail = page_release.get_page_detail_dict('new')

            if live_release:
                try:
                    live_page_release =  ReleasePage.objects.get(
                        release__id=live_release.id,
                        revision__page=page_release.revision.page)
                    if live_page_release.revision.id != page_release.revision.id:
                        page_detail['status'] = 'updated'
                    else:
                        page_detail['status'] = 'unchanged'
                except ReleasePage.DoesNotExist:
                    pass
            
            pages.update({page_release.revision.page.id: page_detail})
        
        # Check if pages have been removed from live release
        if live_pages_release:
            for live_page_release in live_pages_release:
                if live_page_release.revision.page.id not in pages:
                    pages.update({
                        live_page_release.revision.page.id: live_page_release.get_page_detail_dict('removed')
                    })

    return render(request, 'wagtailadmin/release/detail.html', {
        'release': release,
        'pages': pages,
        'error_msg': error_msg,
    })