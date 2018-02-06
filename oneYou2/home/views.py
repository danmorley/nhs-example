from __future__ import unicode_literals

from .models import Release

from django.forms.models import model_to_dict
from django.http import HttpResponse
import json

def releases(request):
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
