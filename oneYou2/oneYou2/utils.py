from django.conf import settings


def get_release_version():
    try:
        with open('version.txt') as data_file:
            return data_file.read()
    except FileNotFoundError:
        return 'Cannot locate version number'


def get_protocol():
    if settings.ENV == 'local':
        return 'http://'
    else:
        return 'https://'


def frontend_deployed():
    try:
        with open('frontend_deployed.txt') as data_file:
            value = data_file.read()
            return value == 'True'
    except FileNotFoundError:
        return False


def set_frontend_deployed_status(status):
    status_file = open('frontend_deployed.txt', 'w')
    status_file.write(status)
    status_file.close()
