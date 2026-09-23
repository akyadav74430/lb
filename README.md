# Lovebite.com

Modern companion profile directory platform with privacy-by-design, location privacy, secure image processing, role-based access control (RBAC), and moderation systems.

---

## 🐳 Docker Quick-Start (Production)

The entire application stack (Next.js 16 + MySQL 8.0) can be started with a single Docker Compose command:

```bash
# 1. Start the complete application
docker compose up --build -d

# 2. View running services and health status
docker compose ps

# 3. View live application logs
docker compose logs -f app
```

Once running, the application is available at:
**[http://localhost:3000](http://localhost:3000)**

Health check endpoint:
**[http://localhost:3000/api/health](http://localhost:3000/api/health)**

To stop the containers safely:
```bash
docker compose down
```

> For complete Docker operations, backups, restores, migrations, and development mode, see the **[DOCKER.md](DOCKER.md)** guide.

---

## 💻 Local Development (Without Docker)

First, install dependencies:

```bash
npm install
```

Generate Prisma client:

```bash
npx prisma generate
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🛡️ Security & Moderation Test Suite

Run the full security and privacy test suite:

```bash
node scratch/test-security-suite.mjs
```
