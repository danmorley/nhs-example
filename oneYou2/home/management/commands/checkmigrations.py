import sys
from django.core.management.base import BaseCommand
from django.db.migrations.executor import MigrationExecutor
from django.db import connections, DEFAULT_DB_ALIAS


class Command(BaseCommand):
    '''
    Check if any migrations need to be run
    '''

    help = 'Exit with non-zero code if migrations need to be run'

    def handle(self, *args, **kwargs):
        '''
        Actual command procesing goes here
        '''


        def is_database_synchronized(database):
            # Perform initial database connection as found in django's `migrate` command
            connection = connections[database]
            connection.prepare_database()
            executor = MigrationExecutor(connection)

            # Get migration targets from django's migration graph
            targets = executor.loader.graph.leaf_nodes()

            # If there is no migration plan for our targets, we must have an up-to-date database
            return False if executor.migration_plan(targets) else True

        # Exit with a non-zero code if the db isn't up-to-date
        if is_database_synchronized(DEFAULT_DB_ALIAS):
            sys.exit(0)
        else:
            sys.exit(1)
