# Lovebite.com

Modern companion profile directory platform with privacy-by-design, location privacy, secure image processing, role-based access control (RBAC), and moderation systems.

This project is configured to use a Supabase Postgres database through Prisma and is intended for direct deployment without Docker.

---

## 🗄️ Supabase setup

Set your database URL in the environment before running the app:

```bash
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?sslmode=require"
```

You can get this from your Supabase project dashboard under Project Settings → Database → Connection string.

---

## 🚀 Direct deployment

Install dependencies:

```bash
npm install
```

Generate Prisma client:

```bash
npx prisma generate
```

Apply migrations to your Supabase database:

```bash
npx prisma migrate deploy
```

Run the app in development mode:

```bash
npm run dev
```

Or build and run the production server:

```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🛡️ Security & Moderation Test Suite

Run the full security and privacy test suite:

```bash
node scratch/test-security-suite.mjs
```
