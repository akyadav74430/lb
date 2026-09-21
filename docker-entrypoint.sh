#!/bin/sh
set -e

DB_PATH="/app/data/app.db"
MIGRATION_SQL="/app/prisma/migrations/20260918162412_init/migration.sql"

# Ensure uploads directory exists inside the data volume
mkdir -p /app/data/uploads

echo "Checking database..."
if ! sqlite3 "$DB_PATH" "SELECT name FROM sqlite_master WHERE type='table' AND name='User';" | grep -q "User"; then
  echo "Applying initial schema..."
  sqlite3 "$DB_PATH" < "$MIGRATION_SQL"
  echo "Schema applied."
else
  echo "Database already initialized."
fi

echo "Starting server..."
exec node server.js
