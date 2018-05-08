#!/bin/bash
set -e

# Default is to run the Django App
if [[ $# -eq 0 ]]; then

  # Change to project directory
  cd oneYou2/

  # Check and wait for migrations to complete
  until python3 manage.py checkmigrations
  do
    echo "Waiting for database to be migrated"
    sleep 5
  done

  #Run Gunicorn
  exec gunicorn oneYou2.wsgi:application \
      --name oneyou-cms \
      --bind 0.0.0.0:8000 \
      --workers 3 \
      --log-level=info \
      --log-file=- \
      --access-logfile=- \
      --error-logfile=- \
      --timeout 60

fi

# EXECUTE DOCKER COMMAND NOW
exec "$@"
