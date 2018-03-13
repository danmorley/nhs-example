from __future__ import unicode_literals

import json

from collections import OrderedDict
from datetime import datetime

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .models import query_set_to_dict, Release

from frontendHandler.models import FrontendVersion

from home.models import SiteSettings


@csrf_exempt
def releases(request):
  if request.method == 'POST':
    data = json.loads(request.body)
    releases = Release.objects.exclude(uuid__in=data['uuids']).exclude(release_time__isnull=True).filter(release_time__lte=datetime.now())
    return HttpResponse(json.dumps(query_set_to_dict(releases)), content_type="application/json")

  releases = Release.objects.filter(release_time__lte=datetime.now())
  return HttpResponse(json.dumps(query_set_to_dict(releases)), content_type="application/json")

def release_frontend(request, site_name):
  site_id = SiteSettings.objects.get(uid=site_name).site.id
  release_id = request.GET.get('id')
  if release_id:
    return HttpResponse(FrontendVersion.get_html_for_version(Release.objects.get(uuid=release_id).frontend_id))
  else:
    return HttpResponse(FrontendVersion.get_html_for_version(Release.get_current_release(site_id).frontend_id))

