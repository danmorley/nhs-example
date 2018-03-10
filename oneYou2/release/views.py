from __future__ import unicode_literals

from collections import OrderedDict

from .models import query_set_to_dict, Release

from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

import json
from datetime import datetime

# @require_POST
@csrf_exempt
def releases(request):
  if request.method == 'POST':
    data = json.loads(request.body)
    releases = Release.objects.exclude(uuid__in=data['uuids']).exclude(release_time__isnull=True).filter(release_time__lte=datetime.now())
    return HttpResponse(json.dumps(query_set_to_dict(releases)), content_type="application/json")

  releases = Release.objects.filter(release_time__lte=datetime.now())
  return HttpResponse(json.dumps(query_set_to_dict(releases)), content_type="application/json")
