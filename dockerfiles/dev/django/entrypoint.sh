#!/bin/bash
set -e

# Set locale
export LANG=C.UTF-8
export LANGUAGE=C.UTF-8
export LC_ALL=C.UTF-8

# Wait for PostgreSQL to be ready
until nc -z db_dev 5432; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

# Run the Django development server
exec python manage.py runserver 0.0.0.0:8000