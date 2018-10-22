from django.core import management
from django.core.management import BaseCommand
from django.core.management.utils import parse_apps_and_model_labels
from django.db import DEFAULT_DB_ALIAS


class Command(BaseCommand):
    help = 'Installs the named fixture(s) in the database if no OneYou pages exist.'
    missing_args_message = (
        'No database fixture specified. Please provide the path of at least '
        'one fixture in the command line.'
    )

    def add_arguments(self, parser):
        parser.add_argument('args', metavar='fixture', nargs='+', help='Fixture labels.')
        parser.add_argument(
            '--database', action='store', dest='database', default=DEFAULT_DB_ALIAS,
            help='Nominates a specific database to load fixtures into. Defaults to the "default" database.',
        )
        parser.add_argument(
            '--app', action='store', dest='app_label', default=None,
            help='Only look for fixtures in the specified app.',
        )
        parser.add_argument(
            '--ignorenonexistent', '-i', action='store_true', dest='ignore',
            help='Ignores entries in the serialized data for fields that do not '
                 'currently exist on the model.',
        )
        parser.add_argument(
            '-e', '--exclude', dest='exclude', action='append', default=[],
            help='An app_label or app_label.ModelName to exclude. Can be used multiple times.',
        )
        parser.add_argument(
            '--format', action='store', dest='format', default=None,
            help='Format of serialized data when reading from stdin.',
        )

    def handle(self, *fixture_labels, **options):
        from pages.models import OneYou2Page
        one_you_pages = OneYou2Page.objects.count()
        print('Current number of pages: ', one_you_pages)
        if one_you_pages == 0:
            self.ignore = options['ignore']
            self.using = options['database']
            self.app_label = options['app_label']
            self.verbosity = options['verbosity']
            self.excluded_models, self.excluded_apps = parse_apps_and_model_labels(options['exclude'])
            self.format = options['format']
            management.call_command('loaddata', fixture_labels[0], **options)
