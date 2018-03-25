from django.core.files import File
from django.core.management.base import BaseCommand

from images.models import PHEImage

from oneYou2.settings.base import BASE_DIR


class Command(BaseCommand):
    '''
    Upload the frontend to the azure storage
    '''

    def handle(self, *args, **kwargs):
        '''
        Actual command procesing goes here
        '''
        img_dir = BASE_DIR + '/oneYou2/static/img/'
        # default images is in format (file_name, title)
        default_images = [
            ('one_you_logo.jpg', "OneYou Logo"),
            ('phe_logo.png', "PHE Logo")
        ]

        for img in default_images:
            file_name = img_dir + img[0]
            try:
                phe_image = PHEImage.objects.get(title=img[1])
                phe_image.title = img[1]
                phe_image.file = File(open(file_name, 'rb'))
                phe_image.save()
            except PHEImage.DoesNotExist:
                PHEImage(title=img[1], file=File(open(file_name, 'rb'))).save()
