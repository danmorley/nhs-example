import json
import uuid

from azure.storage.file import FileService

from datetime import datetime

from django.conf import settings


class FrontendVersion:
    def __init__(self, uuid, live_date):
        self.uuid = uuid
        self.live_date = live_date

    @classmethod
    def get_current_version(cls):
        return '1234'
        # TODO try to find a way to mock this function on server start
        if settings.AZURE_ACCOUNT_NAME == 'test' or settings.AZURE_ACCOUNT_NAME is None:
            return 'test'

        file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)

        return file_service.get_file_to_text(settings.AZURE_FILE_SHARE, settings.ENV, 'current_version.txt')

    @classmethod
    def get_available_versions(cls):
        # TODO try to find a way to mock this function on server start
        return []
        if settings.AZURE_ACCOUNT_NAME == 'test' or settings.AZURE_ACCOUNT_NAME is None:
            return []

        file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)

        directories = file_service.list_directories_and_files(settings.AZURE_FILE_SHARE, settings.ENV).directories
        available_versions = []

        for directory in directories:
            properties = file_service.get_directory_properties(settings.AZURE_FILE_SHARE,
                                                               settings.ENV + '/' + directory.name)
            available_versions.append((directory.name, properties['last-modified']))

        return sorted(available_versions, key=lambda x: datetime.strptime(x[1], '%a, %d %b %Y %H:%M:%S %Z'),
                      reverse=True)

    @classmethod
    def get_html_for_version(cls, uuid):
        file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)

        return file_service.get_file_to_text(settings.AZURE_FILE_SHARE, settings.ENV + '/' + uuid, 'index.html')

    @classmethod
    def get_js_for_version(cls, version_id, file_name):
        file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)

        directory_name = settings.ENV + '/' + version_id + '/static/js'

        return file_service.get_file_to_text(settings.AZURE_FILE_SHARE, directory_name, file_name)

    @classmethod
    def get_css_for_version(cls, version_id, file_name):
        file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)

        directory_name = settings.ENV + '/' + version_id + '/static/css'
        return file_service.get_file_to_text(settings.AZURE_FILE_SHARE, directory_name, file_name)

    @classmethod
    def deploy_version(cls):
        file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)

        unique_id = str(uuid.uuid4())

        file_service.create_directory(settings.AZURE_FILE_SHARE, settings.ENV, fail_on_exist=False)

        version_directory = settings.ENV + "/" + unique_id

        file_service.create_directory(settings.AZURE_FILE_SHARE, version_directory)
        file_service.create_directory(settings.AZURE_FILE_SHARE, version_directory + '/static')
        file_service.create_directory(settings.AZURE_FILE_SHARE, version_directory + '/static/js')
        file_service.create_directory(settings.AZURE_FILE_SHARE, version_directory + '/static/css')
        file_service.create_directory(settings.AZURE_FILE_SHARE, version_directory + '/static/media')

        file_service.put_file_from_text(settings.AZURE_FILE_SHARE, version_directory, "current_version.txt", unique_id)

        manifest = json.loads(open('./web/asset-manifest.json').read())

        for key in manifest:
            file_service.put_file_from_path(settings.AZURE_FILE_SHARE, version_directory, manifest[key],
                                            './web/' + manifest[key])
        file_service.put_file_from_path(settings.AZURE_FILE_SHARE, version_directory, 'index.html', './web/index.html')

        file_service.put_file_from_text(settings.AZURE_FILE_SHARE, settings.ENV, "current_version.txt", unique_id)
