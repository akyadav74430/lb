#!/bin/sh
set -e

echo "=================================================="
echo "🚀 Lovebite.com Production Container Startup"
echo "=================================================="

# Ensure upload and data directories exist
mkdir -p /app/uploads /app/data

# Wait for MySQL to become fully ready and reachable
echo "⏳ Checking database connectivity..."
MAX_TRIES=30
COUNT=0

while [ $COUNT -lt $MAX_TRIES ]; do
  if node -e "
    const { PrismaClient } = require('./lib/generated/prisma');
    const p = new PrismaClient();
    p.\$queryRaw\`SELECT 1\`
      .then(() => { process.exit(0); })
      .catch(() => { process.exit(1); });
  " 2>/dev/null; then
    echo "✓ MySQL database is reachable and ready."
    break
  fi
  COUNT=$((COUNT + 1))
  echo "  Waiting for database... attempt $COUNT/$MAX_TRIES (retrying in 2s)"
  sleep 2
done

if [ $COUNT -eq $MAX_TRIES ]; then
  echo "❌ Error: Could not connect to MySQL database after $MAX_TRIES attempts."
  exit 1
fi

# Run Prisma migrations safely
echo "📦 Applying Prisma migrations..."
node ./node_modules/prisma/build/index.js migrate deploy
echo "✓ Prisma migrations deployed."

# Synchronize existing data if the database is newly initialized
if [ -f "prisma/sync-existing-data.mjs" ]; then
  echo "🔄 Verifying initial data synchronization..."
  node prisma/sync-existing-data.mjs
fi

# Start Next.js production standalone server
echo "✨ Starting Lovebite Next.js server on port ${PORT:-3000}..."
exec node server.js
