# Lovebite.com — Complete Docker & Operations Guide

This guide documents the production Docker architecture, local execution, database lifecycle, backup/restore procedures, and operational maintenance for **Lovebite.com**.

---

## 1. Architecture Overview

```
                      Internet / Browser
                              │
                     Port 3000:3000
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 lovebite-app (Next.js 16)                   │
│   • Node 20 LTS Alpine (Non-root user: nextjs UID 1001)     │
│   • Next.js Standalone Production Server                    │
│   • Sharp Media Pipeline (EXIF Stripping, SHA-256)          │
│   • Health Check: GET /api/health                           │
│   • Persistent Volume: lovebite_uploads -> /app/uploads     │
└──────────────────────────────┬──────────────────────────────┘
                               │
               Internal Docker Bridge Network
                 (lovebite-network: private)
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                  lovebite-db (MySQL 8.0)                    │
│   • Port 3306 (Internal only; NOT exposed publicly)         │
│   • Character set: utf8mb4 / utf8mb4_unicode_ci             │
│   • Persistent Volume: lovebite_mysql_data                  │
│   • Healthcheck: mysqladmin ping                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. System Requirements

- **Docker**: Engine version 20.10+ (tested with Docker 29.8+)
- **Docker Compose**: Compose v2.0+ (tested with Compose v5.5+)
- **Memory**: Minimum 2 GB RAM recommended for Next.js build and MySQL 8.0
- **Disk Space**: Minimum 4 GB available disk space

---

## 3. Environment Variables

Docker Compose automatically loads variables from `.env.docker`.

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | MySQL connection string for the app | `mysql://lovebite:<password>@database:3306/lovebite` |
| `MYSQL_DATABASE` | MySQL database name | `lovebite` |
| `MYSQL_USER` | Application MySQL user | `lovebite` |
| `MYSQL_PASSWORD` | Application MySQL password | `lovebite_secure_pass_2026` |
| `MYSQL_ROOT_PASSWORD` | MySQL root administrative password | `lovebite_root_secret_2026` |
| `NEXTAUTH_SECRET` | 32+ character JWT session secret | Generate with: `openssl rand -base64 32` |
| `AUTH_SECRET` | Secret key used by Auth.js / NextAuth v5 | Same as `NEXTAUTH_SECRET` |
| `NEXTAUTH_URL` | Canonical public URL of the application | `http://localhost:3000` |
| `NEXT_PUBLIC_APP_URL` | Client-accessible URL | `http://localhost:3000` |
| `NODE_ENV` | Runtime environment | `production` |
| `PORT` | Container listening port | `3000` |
| `HOSTNAME` | Listening interface binding | `0.0.0.0` |
| `UPLOADS_DIR` | Directory inside container for file uploads | `/app/uploads` |
| `SUPPORT_EMAIL` | Destination email for user contact messages | `support@lovebite.com` |
| `MAIL_HOST` | SMTP server host | `smtp.example.com` |
| `MAIL_PORT` | SMTP port (`587` for STARTTLS, `465` for SSL) | `587` |
| `MAIL_USERNAME` | SMTP authentication user | `your-smtp-username` |
| `MAIL_PASSWORD` | SMTP authentication password | `your-smtp-password` |
| `MAIL_FROM` | Outgoing email header sender string | `lovebite.com Support <support@lovebite.com>` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v2 site key | Optional (bypass active if blank) |
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA v2 secret key | Optional |

---

## 4. Single-Command Startup (Production Mode)

To build and start the entire stack:

```bash
docker compose up --build -d
```

### What Happens Automatically on First Run:
1. `lovebite-db` container starts MySQL 8.0.
2. MySQL initializes `lovebite` database and runs healthcheck tests.
3. Once MySQL is healthy, `lovebite-app` starts.
4. Container entrypoint (`docker-entrypoint.sh`) runs:
   - Validates database connectivity with `SELECT 1`.
   - Applies Prisma migrations via `npx prisma migrate deploy`.
   - Runs `prisma/sync-existing-data.mjs` to restore existing users, admin credentials, profiles, and photos into MySQL.
   - Sets up `/app/uploads` permissions.
   - Starts Next.js standalone server with `node server.js`.
5. The application becomes accessible at:
   **[http://localhost:3000](http://localhost:3000)**

---

## 5. Development Mode (Hot Reloading)

To develop with live source code mounting and hot reload:

```bash
docker compose -f docker-compose.dev.yml up --build
```

In development mode:
- Local source code is mounted into the container.
- MySQL port `3306` is published to the host for GUI access (e.g., TablePlus, DBeaver, MySQL Workbench).
- Next.js development server runs with Turbopack fast refresh.

---

## 6. Stopping the Application

To stop the containers safely **without losing any data**:

```bash
docker compose down
```

> [!CAUTION]
> **Never use `docker compose down -v`** in production. The `-v` flag deletes all persistent Docker volumes, which would destroy the MySQL database and uploaded photos.

---

## 7. Status & Health Checks

Check container status and health:

```bash
docker compose ps
```

Expected output:
```
NAME           IMAGE        COMMAND                  SERVICE    STATUS
lovebite-app   ...          "/bin/sh docker-entr…"   app        Up (healthy)
lovebite-db    mysql:8.0    "docker-entrypoint.s…"   database   Up (healthy)
```

Test application health endpoint:

```bash
curl -i http://localhost:3000/api/health
```

Expected JSON response:
```json
{"status":"ok"}
```

---

## 8. Viewing Logs

Stream all logs in real time:

```bash
docker compose logs -f
```

Stream application logs only:

```bash
docker compose logs -f app
```

Stream database logs only:

```bash
docker compose logs -f database
```

---

## 9. Prisma Migrations in Docker

### Check Migration Status:
```bash
docker compose exec app npx prisma migrate status
```

### Apply New Production Migrations:
```bash
docker compose exec app npx prisma migrate deploy
```

> [!WARNING]
> Do NOT run `prisma migrate reset` in production, as it completely drops and recreates the database.

---

## 10. Database Backup & Restore

### Backing Up the MySQL Database:

```bash
docker compose exec database mysqldump -u root -plovebite_root_secret_2026 lovebite > lovebite_backup_$(date +%Y%m%d_%H%M%S).sql
```

*(On Windows PowerShell, use quotes or pass the file redirection directly:)*

```powershell
docker compose exec database mysqldump -u root -plovebite_root_secret_2026 lovebite | Out-File -Encoding utf8 "backup.sql"
```

### Restoring the Database from a Backup File:

```bash
docker compose exec -T database mysql -u root -plovebite_root_secret_2026 lovebite < lovebite_backup.sql
```

---

## 11. Photo & File Upload Persistence

- Photos uploaded by companion profiles are processed by Sharp (EXIF stripped, re-encoded to WebP, validated for magic bytes).
- Files are saved to `/app/uploads` in the application container.
- The volume `lovebite_uploads` is mounted at `/app/uploads`, ensuring that uploads survive container restarts, upgrades, and image rebuilds.

### Backing Up Uploaded Files:

```bash
docker run --rm -v lovebite_uploads:/uploads -v "$PWD":/backup alpine tar czf /backup/uploads_backup.tar.gz -C /uploads .
```

### Restoring Uploaded Files:

```bash
docker run --rm -v lovebite_uploads:/uploads -v "$PWD":/backup alpine tar xzf /backup/uploads_backup.tar.gz -C /uploads
```

---

## 12. Security Best Practices

1. **Non-Root Execution**: The application runs under an unprivileged `nextjs` user (UID 1001), preventing container breakout attacks.
2. **Private Network**: The MySQL container (`database:3306`) is attached to an internal bridge network (`lovebite-network`) and is NOT exposed on host port 3306 in production.
3. **Secret Isolation**: Secrets are injected via `.env.docker` and are never hardcoded inside `Dockerfile` or committed to git.
4. **Input & MIME Validation**: Images are strictly validated against magic-byte headers (JPEG, PNG, WebP) and stripped of GPS metadata before storage.

---

## 13. Troubleshooting

### Container fails to connect to database:
1. Verify MySQL is healthy:
   ```bash
   docker compose ps database
   ```
2. Check database logs:
   ```bash
   docker compose logs database
   ```
3. Ensure `DATABASE_URL` in `.env.docker` uses `database:3306` (the Docker service name) and NOT `localhost:3306`.

### Port 3000 already in use on host:
If port 3000 is occupied by another local service, change the port mapping in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"
```
Then access at `http://localhost:3001`.

### Permission denied in uploads:
The entrypoint automatically configures ownership for `nextjs:nodejs`. If permissions are manually altered, run:
```bash
docker compose exec -u root app chown -R nextjs:nodejs /app/uploads
```
