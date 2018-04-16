
def get_release_version():
    try:
        with open('version.txt') as data_file:
            return data_file.read()
    except FileNotFoundError:
        return "Cannot locate version number"


def get_protocol():
    # if settings.ENV == 'dev':
    #     return 'http://'
    # else:
    return 'https://'
