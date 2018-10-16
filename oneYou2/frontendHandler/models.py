import json
import uuid
import os

from azure.storage.file import FileService
from azure.common import AzureMissingResourceHttpError

from datetime import datetime

from django.conf import settings

from oneYou2.utils import get_release_version, frontend_deployed, set_frontend_deployed_status


class FrontendVersion:
    def __init__(self, uuid, live_date):
        self.uuid = uuid
        self.live_date = live_date

    @classmethod
    def get_current_version(cls):
        if settings.ENV == 'local':
            return 'local'

        # TODO try to find a way to mock this function on server start
        if settings.AZURE_ACCOUNT_NAME == 'test' or settings.AZURE_ACCOUNT_NAME is None:
            return 'test'

        file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)
        return file_service.get_file_to_text(settings.AZURE_FILE_SHARE, settings.ENV, 'current_version.txt')

    @classmethod
    def get_available_versions(cls):
        print('loading available versions')

        if settings.ENV == 'local':
            return [('local', 'local')]

        # TODO try to find a way to mock this function on server start
        if settings.AZURE_ACCOUNT_NAME == 'test' or settings.AZURE_ACCOUNT_NAME is None:
            return []

        file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)

        current_tag = get_release_version()
        latest_deployed_tag = file_service.get_file_to_text(settings.AZURE_FILE_SHARE, settings.ENV,
                                                            'current_tag.txt')

        deployed_status = frontend_deployed()
        print('checking for initializer and deployed status')
        print('initializer', settings.INITIALIZER)
        print('deployed status', deployed_status)
        print('checking current environment and latest tag')
        print('environment', settings.ENV)
        print('latest tag', latest_deployed_tag)
        print('current tag', current_tag)
        if settings.INITIALIZER is not False and not deployed_status:
            if settings.ENV == 'dev':
                print('running deploy for integration environment')
                # always deploy the frontend version in the integration and review environments
                FrontendVersion.deploy_version()
            elif current_tag != latest_deployed_tag:
                print('running deploy for ' + settings.ENV + ' environment')
                # we need to start using 'local' as the environment variable on local machines, to prevent frontend
                # deployment when running locally.
                # check the latest deployed version so we only deploy each tag once on staging and production
                FrontendVersion.deploy_version()
            set_frontend_deployed_status('True')

        # we have to return all directories as azure SDK had no way to order and limit response count
        directories = file_service.list_directories_and_files(settings.AZURE_FILE_SHARE, settings.ENV).directories
        available_versions = []

        for directory in directories:
            print('loading meta for ' + directory.name)
            properties = file_service.get_directory_properties(settings.AZURE_FILE_SHARE,
                                                               settings.ENV + '/' + directory.name)
            try:
                release_tag = file_service.get_file_to_text(settings.AZURE_FILE_SHARE,
                                                            settings.ENV + '/' + directory.name, 'tag.txt')
            except AzureMissingResourceHttpError:
                print('Invalid front end ' + directory.name)
                release_tag = 'Invalid front end ' + directory.name

            available_versions.append((directory.name, release_tag + ' - ' + properties['last-modified']))

        sorted_list = sorted(available_versions, key=lambda x: datetime.strptime(x[1].split(' - ')[1],
                                                                                 '%a, %d %b %Y %H:%M:%S %Z'),
                             reverse=True)
        return sorted_list[:20]

    @classmethod
    def get_local_file_text(cls, file_path):
        file_path = os.path.join(settings.PROJECT_DIR, '..', 'frontend', 'website-client', 'build', *file_path)
        file = open(file_path, 'r')
        html_text = file.read().strip()
        file.close()
        return html_text

    @classmethod
    def get_html_for_version(cls, uuid):
        if settings.ENV == 'local':
            return cls.get_local_file_text(['index.html'])
        else:
            file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)
            return file_service.get_file_to_text(settings.AZURE_FILE_SHARE, settings.ENV + '/' + uuid, 'index.html')

    @classmethod
    def get_js_for_version(cls, version_id, file_name):
        if settings.ENV == 'local':
            return cls.get_local_file_text(['static', 'js', file_name])
        else:
            file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)
            directory_name = settings.ENV + '/' + version_id + '/static/js'
            return file_service.get_file_to_text(settings.AZURE_FILE_SHARE, directory_name, file_name)

    @classmethod
    def get_css_for_version(cls, version_id, file_name):
        if settings.ENV == 'local':
            return cls.get_local_file_text(['static', 'css', file_name])
        else:
            file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)
            directory_name = settings.ENV + '/' + version_id + '/static/css'
            return file_service.get_file_to_text(settings.AZURE_FILE_SHARE, directory_name, file_name)

    @classmethod
    def load_static(cls, path, file_name):
        if settings.ENV == 'local':
            return cls.get_local_file_text([path, file_name, './web/' + file_name])
        else:
            file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)
            directory_name = settings.ENV + '/' + path
            return file_service.get_file_to_path(settings.AZURE_FILE_SHARE, directory_name, file_name, './web/' + file_name)

    @classmethod
    def deploy_version(cls):
        print('deploying frontend to azure')
        file_service = FileService(account_name=settings.AZURE_ACCOUNT_NAME, account_key=settings.AZURE_ACCOUNT_KEY)

        unique_id = str(uuid.uuid4())

        file_directory = settings.ENV if settings.ENV != 'local' else 'dev'

        file_service.create_directory(settings.AZURE_FILE_SHARE, file_directory, fail_on_exist=False)

        version_directory = file_directory + '/' + unique_id

        print('creating frontend version directory' + version_directory)
        file_service.create_directory(settings.AZURE_FILE_SHARE, version_directory)
        print('creating statics directory')
        file_service.create_directory(settings.AZURE_FILE_SHARE, version_directory + '/static')
        print('creating js directory')
        file_service.create_directory(settings.AZURE_FILE_SHARE, version_directory + '/static/js')
        print('creating css directory')
        file_service.create_directory(settings.AZURE_FILE_SHARE, version_directory + '/static/css')
        print('creating media directory')
        file_service.create_directory(settings.AZURE_FILE_SHARE, version_directory + '/static/media')

        print('adding current_version to the version directory')
        file_service.put_file_from_text(settings.AZURE_FILE_SHARE, version_directory, 'current_version.txt', unique_id)

        manifest = json.loads(open('./web/asset-manifest.json').read())

        for key in manifest:
            print('uploading ' + manifest[key])
            file_service.put_file_from_path(settings.AZURE_FILE_SHARE, version_directory, manifest[key],
                                            './web/' + manifest[key])
        print('uploading index.html')
        file_service.put_file_from_path(settings.AZURE_FILE_SHARE, version_directory, 'index.html', './web/index.html')

        print('uploading favicon')
        file_service.put_file_from_path(settings.AZURE_FILE_SHARE, version_directory, 'favicon.ico',
                                        './web/favicon.ico')

        print('uploading webtrends.min.js')
        file_service.put_file_from_path(settings.AZURE_FILE_SHARE, version_directory, 'webtrends.min.js',
                                        './web/webtrends.min.js')

        release_tag = get_release_version()
        print('adding tag meta to the version directory')
        file_service.put_file_from_text(settings.AZURE_FILE_SHARE, version_directory, 'tag.txt', release_tag)

        print('adding current tag meta to the environment directory')
        file_service.put_file_from_text(settings.AZURE_FILE_SHARE, file_directory, 'current_tag.txt', release_tag)

        print('updating current version meta in the environment directory')
        file_service.put_file_from_text(settings.AZURE_FILE_SHARE, file_directory, 'current_version.txt', unique_id)
