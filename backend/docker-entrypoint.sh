#!/bin/sh
set -eu

max_attempts="${DB_INIT_MAX_ATTEMPTS:-20}"
attempt=1

echo "Initializing database schema..."
until ./node_modules/.bin/prisma db push; do
  if [ "$attempt" -ge "$max_attempts" ]; then
    echo "Database initialization failed after $attempt attempts."
    exit 1
  fi

  echo "Database is not ready. Retrying in 2 seconds... ($attempt/$max_attempts)"
  attempt=$((attempt + 1))
  sleep 2
done

echo "Seeding properties..."
node dist/prisma/seed.js

echo "Starting API..."
exec node dist/src/index.js
