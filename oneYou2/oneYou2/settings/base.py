"""
Django settings for oneYou2 project.

Generated by 'django-admin startproject' using Django 1.11.9.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

from __future__ import absolute_import, unicode_literals

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_DIR = os.path.dirname(PROJECT_DIR)


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    'home',
    'search',
    'pages',
    'sexhealth',
    'release',
    'shelves',
    'images',
    'frontendHandler',
    'dct-admin-interface',
    
    'wagtail.contrib.forms',
    'wagtail.contrib.redirects',
    'wagtail.embeds',
    'wagtail.sites',
    'wagtail.users',
    'wagtail.snippets',
    'wagtail.documents',
    'wagtail.images',
    'wagtail.search',
    'wagtail.admin',
    'wagtail.core',
    'wagtail.contrib.settings',
    'wagtail.api.v2',
    'wagtail.contrib.modeladmin',
    'wagtailmedia',


    'modelcluster',
    'taggit',
    'wagtailsnippetscopy',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'storages',
    'django.contrib.sitemaps',
    'debug_toolbar',
    'axes',
    'experiments',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'wagtail.core.middleware.SiteMiddleware',
    'wagtail.contrib.redirects.middleware.RedirectMiddleware',
]

ROOT_URLCONF = 'oneYou2.urls'

AUTHENTICATION_BACKENDS = [
    'axes.backends.AxesModelBackend',
    'django.contrib.auth.backends.ModelBackend',
]


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(PROJECT_DIR, 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'oneYou2.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
      'NAME': os.environ.get('DB_NAME', 'master'),
      'ENGINE': 'sql_server.pyodbc',
      'HOST': os.environ.get('DB_HOST', 'db'),
      'PORT': os.environ.get('DB_PORT', 1433),
      'USER': os.environ.get('DB_USER', 'sa'),
      'PASSWORD': os.environ.get('DB_PASSWORD'),
      'OPTIONS': {
        'host_is_server': True,
        'driver': 'ODBC Driver 13 for SQL Server',
        },
      }
    }

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
    },
    'axes_cache': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}

AXES_CACHE = 'axes_cache'
AXES_FAILURE_LIMIT = 5

# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/London'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

STATICFILES_DIRS = [
    os.path.join(PROJECT_DIR, 'static'),
]

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'


# Wagtail settings

WAGTAIL_SITE_NAME = "oneYou2"
SITE_ENV = os.environ.get('SITE_ENV', 'db')

# Base URL to use when referring to full URLs within the Wagtail admin backend -
# e.g. in notification emails. Don't include '/admin' or a trailing slash
BASE_URL = 'http://example.com'

# Cross origin whitelist
CORS_ORIGIN_REGEX_WHITELIST = (
    r'^(https?://)?([\w|-]+\.)+nhschoices\.net$',
    r'^(https?://)?([\w|-]+\.)+nhs\.uk$',
    r'^(http://)?localhost:(\d+)$',
    r'^(http://)?vbhost:(\d+)$',
    )

WAGTAILIMAGES_IMAGE_MODEL = 'images.PHEImage'
WAGTAIL_USAGE_COUNT_ENABLED = True

DEFAULT_FILE_STORAGE = 'storages.backends.azure_storage.AzureStorage'
AZURE_ACCOUNT_NAME = os.environ.get('AZURE_ACCOUNT_NAME')    # eg. 'campaignstorage'
AZURE_ACCOUNT_KEY = os.environ.get('AZURE_ACCOUNT_KEY')      # eg. '<secret key>'
AZURE_CONTAINER = os.environ.get('AZURE_CONTAINER')          # eg. 'campaign-resource-centre'
AZURE_FILE_SHARE = os.environ.get('AZURE_FILE_SHARE')
CONTENT_STORE_ENDPOINT = os.environ.get('CONTENT_STORE_ENDPOINT')
ADOBE_TRACKING_URL = os.environ.get('ADOBE_TRACKING_URL')

ENV = os.environ.get('CMS_ENV', 'local')

INITIALIZER = os.environ.get('INITIALIZER', False)

# INTERNAL_IPS = ('127.0.0.1', 'localhost', '172.18.0.1')

if ENV == 'prod':
    PARAGON_ACTION_API_URL = "https://api-live-mentalhealth.paragon-cc.co.uk/api/Actions/UpdateAction"
    PARAGON_ACTION_API_AUTH_HEADER = "cGFyYWdvbi1jYzoyNEVFM0ExMi0wM0U4LTQ5OTYtQkIwOS1DMzM1NzNFNUU5RUE="
    PARAGON_ACTION_API_PRODUCT_TOKEN = "3D149395-F755-4586-BA8A-E4F915B023AD"
else:
    PARAGON_ACTION_API_URL = "https://api-test-mentalhealth.cc-testing.co.uk/api/Actions/UpdateAction"
    PARAGON_ACTION_API_AUTH_HEADER = "cGFyYWdvbi1jYzo5RjRGMkNGQi1ENUE4LTQyQTEtQTA2OC1GNkE0MTc0MEE4RUU="
    PARAGON_ACTION_API_PRODUCT_TOKEN = "3D149395-F755-4586-BA8A-E4F915B023AD"
