import requests
import json

from django.core.management.base import BaseCommand
from datetime import datetime

from wagtail.wagtailcore.models import Page

from release.models import Release
from pages.models import OneYou2Page

class Command(BaseCommand):
  def handle(self, *args, **kwargs):
    new_releases = load_new_versions()
    for release in new_releases:
      updatePages(release['pages'])
      Release(release_name=release['release_name'], release_time=datetime.fromtimestamp(release['release_time']), uuid=release['uuid']).save()


  def load_new_versions():
    current_releases = Release.objects.all()
    post_data = {}
    post_data['uuids'] = []
    for release in current_releases:
      post_data['uuids'].append(release.uuid)
    url = 'http://web-pre-prod:8000/api/v2/releases/'
    response = requests.post(url, data = json.dumps(post_data))
    return json.loads(response.text)


  def updatePages(page_ids):
    for page_id in page_ids:
      page = load_page_data(page_id)
      new_page = OneYou2Page.from_dict(page)
      parent_page = Page.objects.get(id=page['meta']['parent']['id'])
      parent_page.add_child(instance=new_page)
      new_page.save_revision().publish()

    
  def load_page_data(page_id):
    page_url = 'http://web-pre-prod:8000/api/v2/pages/' + str(page_id)
    page_response = requests.get(page_url)
    return json.loads(page_response.text)
