from azure.storage.blob import BlobService
from azure.storage.file import FileService

from django.db import models
from django.conf import settings


class FrontendVersion():
  def __init__(self, uuid, live_date):
    self.uuid = uuid
    self.live_date = live_date

  @classmethod
  def get_current_version(cls):
    blob_service = BlobService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)

    return blob_service.get_blob_to_text(settings.AZURE_CONTAINER, '/' + settings.ENV + '/code/current_release.txt')
