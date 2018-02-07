import requests
import json

from django.core.management.base import BaseCommand

from release.models import Release

class Command(BaseCommand):
  def handle(self, *args, **kwargs):
    current_releases = Release.objects.all()
    post_data = {}
    post_data['uuids'] = []
    for release in current_releases:
      post_data['uuids'].append(release.uuid)
    url = 'http://web-pre-prod:8000/api/v2/releases/'
    response = requests.post(url, data = json.dumps(post_data))
    serialized_data = response.text
    data = json.loads(serialized_data)
    print(data)

  