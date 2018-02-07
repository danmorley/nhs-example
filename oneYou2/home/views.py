from __future__ import unicode_literals

from .models import Release

from django.forms.models import model_to_dict
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

import json

@require_POST
@csrf_exempt
def releases(request):
  data = json.loads(request.body)
  releases = Release.objects.all()
  return HttpResponse(json.dumps(to_dict(releases)), content_type="application/json")




def to_dict(querySet):
  queryDict = []
  for modelObject in querySet:
    modelDict = model_to_dict(modelObject)
    for key, value in list(modelDict.items()):
      if value is None:
        del modelDict[key]
    queryDict.append(modelDict)
  return queryDict
