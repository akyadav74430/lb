# ==================================================
# Stage 1: Base image
# ==================================================
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# ==================================================
# Stage 2: Install dependencies
# ==================================================
FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# ==================================================
# Stage 3: Build application
# ==================================================
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
ENV PRISMA_HIDE_UPDATE_MESSAGE=1
RUN node ./node_modules/prisma/build/index.js generate
RUN npm run build

# ==================================================
# Stage 4: Production runner
# ==================================================
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV UPLOADS_DIR="/app/uploads"

# Install wget for lightweight healthcheck
RUN apk add --no-cache wget

# Create dedicated non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy dependencies for runtime tools (Prisma CLI, migration engine, scripts)
COPY --from=deps /app/node_modules ./node_modules

# Copy Next.js standalone build & static public assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy Prisma schema, migrations, data snapshot, sync script
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/lib/generated ./lib/generated
COPY --from=builder /app/package.json ./package.json

# Copy container entrypoint script
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Create persistent storage directories and assign non-root ownership
RUN mkdir -p /app/uploads /app/data && \
    chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

ENTRYPOINT ["/bin/sh", "docker-entrypoint.sh"]
