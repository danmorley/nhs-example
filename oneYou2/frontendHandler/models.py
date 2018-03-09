from azure.storage.file import FileService

from django.db import models
from django.conf import settings


class FrontendVersion():
  def __init__(self, uuid, live_date):
    self.uuid = uuid
    self.live_date = live_date

  @classmethod
  def get_current_version(cls):
    file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)

    return file_service.get_file_to_text(settings.AZURE_FILE_SHARE, settings.ENV, 'current_release.txt')
