import requests
import json

from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime

from wagtail.wagtailcore.models import Page

from release.models import Release
from pages.models import OneYou2Page

class Command(BaseCommand):
  def load_new_versions(self):
    current_releases = Release.objects.all()
    post_data = {}
    post_data['uuids'] = []
    for release in current_releases:
      post_data['uuids'].append(release.uuid)
    url = 'http://web-pre-prod:8000/api/v2/releases/'
    response = requests.post(url, data = json.dumps(post_data))
    return json.loads(response.text)


  def migrateUpdates(self, page_ids):
    for page_id in page_ids:
      page = self.load_page_data(page_id)
      parent_page = Page.objects.get(id=page['meta']['parent']['id'])
      try:
        self.update_page(page, parent_page)
      except ObjectDoesNotExist as e:
        self.create_page(page, parent_page)

    
  def load_page_data(self, page_id):
    page_url = 'http://web-pre-prod:8000/api/v2/pages/' + str(page_id)
    page_response = requests.get(page_url)
    return json.loads(page_response.text)


  def update_page(self, page_dict, parent_page):
    existing_page = OneYou2Page.objects.get(uuid=page_dict['uuid'])
    new_page = existing_page.update_from_dict(page_dict)
    new_page.save_revision().publish()


  def create_page(self, page_dict, parent_page):
    new_page = OneYou2Page.create_from_dict(page_dict)
    parent_page.add_child(instance=new_page)
    new_page.save_revision().publish()


  def handle(self, *args, **kwargs):
    new_releases = self.load_new_versions()
    for release in new_releases:
      self.migrateUpdates(release['pages'])
      Release(release_name=release['release_name'], release_time=datetime.fromtimestamp(release['release_time']), uuid=release['uuid']).save()
