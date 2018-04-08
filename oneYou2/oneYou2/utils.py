
def get_release_version():
    try:
        with open('version.txt') as data_file:
            return data_file.read()
    except FileNotFoundError:
        return "Cannot locate version number"


def get_protocol(domain_name):
    if "service" in domain_name:
        return 'https://'
    else:
        return 'http://'
