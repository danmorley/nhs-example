#!/usr/bin/env bash
set -euo pipefail


# Change to project directory
cd oneyou/

# Run migrations
echo "Running migrations"
python3 manage.py migrate
