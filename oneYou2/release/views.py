from __future__ import unicode_literals

from django.http import HttpResponse


from release.utils import get_latest_release
from .models import Release

from frontendHandler.models import FrontendVersion

from home.models import SiteSettings


def release_frontend(request, site_name):
  site_id = SiteSettings.objects.get(uid=site_name).site.id
  release_id = request.GET.get('id')
  if release_id:
    return HttpResponse(FrontendVersion.get_html_for_version(Release.objects.get(uuid=release_id).frontend_id))
  else:
    return HttpResponse(FrontendVersion.get_html_for_version(get_latest_release(site_id).frontend_id))

