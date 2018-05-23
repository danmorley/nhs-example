import json
import uuid

from azure.storage.file import FileService

from datetime import datetime

from django.conf import settings

from oneYou2.utils import get_release_version


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
        file_directory = settings.ENV if settings.ENV != 'local' else 'dev'
        return file_service.get_file_to_text(settings.AZURE_FILE_SHARE, file_directory, 'current_version.txt')

    @classmethod
    def get_available_versions(cls):
        print('loading available versions')
        # TODO try to find a way to mock this function on server start
        return []
        if settings.AZURE_ACCOUNT_NAME == 'test' or settings.AZURE_ACCOUNT_NAME is None:
            return []

        file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)

        file_directory = settings.ENV if settings.ENV != 'local' else 'dev'

        current_tag = get_release_version()
        latest_deployed_tag = file_service.get_file_to_text(settings.AZURE_FILE_SHARE, file_directory,
                                                            'current_tag.txt')

        if settings.INITIALIZER is not False:
            if settings.ENV == 'dev':
                print('running deploy for integration environment')
                # always deploy the frontend version in the integration and review environments
                FrontendVersion.deploy_version()
            elif settings.ENV != 'local' and current_tag != latest_deployed_tag:
                print('running deploy for ' + settings.ENV + ' environment')
                # we need to start using 'local' as the environment variable on local machines, to prevent frontend
                # deployment when running locally.
                # check the latest deployed version so we only deploy each tag once on staging and production
                FrontendVersion.deploy_version()

        # we have to return all directories as azure SDK had no way to order and limit response count
        directories = file_service.list_directories_and_files(settings.AZURE_FILE_SHARE, file_directory).directories
        available_versions = []

        for directory in directories:
            print('loading meta for ' + directory.name)
            properties = file_service.get_directory_properties(settings.AZURE_FILE_SHARE,
                                                               file_directory + '/' + directory.name)
            release_tag = file_service.get_file_to_text(settings.AZURE_FILE_SHARE,
                                                        file_directory + '/' + directory.name, 'tag.txt')
            available_versions.append((directory.name, release_tag + ' - ' + properties['last-modified']))

        sorted_list = sorted(available_versions, key=lambda x: datetime.strptime(x[1].split(' - ')[1],
                                                                                 '%a, %d %b %Y %H:%M:%S %Z'),
                             reverse=True)
        return sorted_list[:20]

    @classmethod
    def get_html_for_version(cls, uuid):
        file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)
        file_directory = settings.ENV if settings.ENV != 'local' else 'dev'
        return file_service.get_file_to_text(settings.AZURE_FILE_SHARE, file_directory + '/' + uuid, 'index.html')

    @classmethod
    def get_js_for_version(cls, version_id, file_name):
        file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)
        file_directory = settings.ENV if settings.ENV != 'local' else 'dev'
        directory_name = file_directory + '/' + version_id + '/static/js'

        return file_service.get_file_to_text(settings.AZURE_FILE_SHARE, directory_name, file_name)

    @classmethod
    def get_css_for_version(cls, version_id, file_name):
        file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)
        file_directory = settings.ENV if settings.ENV != 'local' else 'dev'
        directory_name = file_directory + '/' + version_id + '/static/css'
        return file_service.get_file_to_text(settings.AZURE_FILE_SHARE, directory_name, file_name)

    @classmethod
    def deploy_version(cls):
        print('deploying frontend to azure')
        file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)

        unique_id = str(uuid.uuid4())

        file_directory = settings.ENV if settings.ENV != 'local' else 'dev'

        file_service.create_directory(settings.AZURE_FILE_SHARE, file_directory, fail_on_exist=False)

        version_directory = file_directory + "/" + unique_id

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

        release_tag = get_release_version()
        file_service.put_file_from_text(settings.AZURE_FILE_SHARE, version_directory, 'tag.txt', release_tag)
        file_service.put_file_from_text(settings.AZURE_FILE_SHARE, file_directory, "current_tag.txt", release_tag)

        file_service.put_file_from_text(settings.AZURE_FILE_SHARE, file_directory, "current_version.txt", unique_id)
