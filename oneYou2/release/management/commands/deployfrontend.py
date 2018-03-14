from django.core.management.base import BaseCommand

from frontendHandler.models import FrontendVersion


class Command(BaseCommand):
    '''
    Upload the frontend to the azure storage
    '''

    def handle(self, *args, **kwargs):
        '''
        Actual command procesing goes here
        '''
        FrontendVersion.deploy_version()
