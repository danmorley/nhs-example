#!/usr/bin/env bash
set -euo pipefail


# Change to project directory
cd oneYou2/

# Run migrations
echo "Running migrations"
python3 manage.py migrate
