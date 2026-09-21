# Social Profile Directory — Project Plan

A Next.js web app where users sign up, build a profile, and browse everyone else's profiles as filterable tiles on the home page.

---

## 1. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14+ (App Router) | Server components for feed, client components for forms/filters |
| Language | TypeScript | Type-safe models & API routes |
| Auth | Auth.js (NextAuth) with Credentials provider only | Email/password signup, hashed passwords, no OAuth/social login |
| Database | PostgreSQL | Relational, good for filtering/indexing |
| ORM | Prisma | Schema, migrations, type-safe queries |
| Image storage | Local disk volume (mounted in the container) | Avoids a 3rd-party storage dependency; keeps everything in one image/deployment |
| Styling | Plain CSS / minimal Tailwind, no fancy gradients or glassmorphism | See "UI Guidelines" below |
| Validation | Zod | Shared client/server validation |
| Hosting | Docker — single image, self-hosted | See "Docker Setup" section |

---

## 2. Core Features (MVP)

1. **Auth**: Sign up (name, email, password), sign in, sign out, session persistence.
2. **Profile creation/edit**: One profile per user, editable after signup.
3. **Home feed**: Grid of profile tiles, paginated/infinite-scroll.
4. **Filters**: Region, address/city, favorite color, and a free-text search.
5. **Profile detail view**: Click a tile to see the full profile.

## 3. Stretch Features (Post-MVP)

- Follow/like other profiles
- Messaging (WhatsApp deep link is enough for MVP: `https://wa.me/<number>`)
- Admin moderation panel
- Public/private profile toggle
- Report/block user

---

## 4. UI Guidelines (keep it simple, not "AI-generated" looking)

Avoid the common tells of AI-generated UI: no purple/blue gradient backgrounds, no glassmorphism, no glowing shadows, no oversized emoji-as-icons, no excessive rounded-corner "card soup," no auto-generated hero sections with vague buzzwords.

Instead:
- Plain white/light-gray background, one accent color, system font stack (or a single simple Google-hosted font like Inter, self-hosted — not CDN-fetched at runtime to keep the single-image constraint clean).
- Flat, low-shadow tiles with a thin 1px border instead of heavy drop shadows.
- Simple top nav: logo/text on the left, Sign in / Sign up (or user name + Sign out) on the right.
- Filter bar as a plain horizontal row of dropdowns/inputs, not a sidebar with icons.
- No stock illustrations, no decorative SVG blobs.
- Straightforward grid (CSS grid, 3–4 columns on desktop, 1 on mobile) — no carousels or animated transitions unless you ask for them.

---

## 5. Data Model (Prisma schema sketch)

```prisma
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  passwordHash  String
  createdAt     DateTime  @default(now())
  profile       Profile?
}

model Profile {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id])
  photoUrl    String?
  bio         String?
  address     String?
  city        String?
  region      String?      // state/province
  country     String?
  favColor    String?      // hex or name, used for color filter
  phone       String?
  whatsapp    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([region])
  @@index([city])
  @@index([favColor])
}
```

---

## 6. Routes / Pages (App Router)

```
/app
  /(auth)
    /signup/page.tsx
    /signin/page.tsx
  /(main)
    /page.tsx                → home feed with tiles + filter bar
    /profile/[id]/page.tsx   → single profile detail
    /profile/edit/page.tsx   → create/edit own profile
    /api/auth/[...nextauth]/route.ts
    /api/profiles/route.ts        → GET (list + filters), POST (create)
    /api/profiles/[id]/route.ts   → GET, PUT, DELETE
    /api/upload/route.ts          → image upload handler
```

---

## 7. Home Feed & Filtering Logic

- `GET /api/profiles?region=&city=&color=&search=&page=`
- Server component fetches with query params, uses Prisma `where` clause built dynamically:
  ```ts
  const where = {
    ...(region && { region }),
    ...(city && { city: { contains: city, mode: 'insensitive' } }),
    ...(color && { favColor: color }),
    ...(search && {
      OR: [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { address: { contains: search, mode: 'insensitive' } },
      ],
    }),
  };
  ```
- Filter bar (client component) updates URL search params → triggers server re-fetch (use `useRouter().push` with query string, or React Server Component + `searchParams` prop).
- Add a color swatch picker (small set of preset colors) rather than free text, for cleaner filtering.
- Debounce the search/address text input (~300ms).

### Profile Tile (shown on home page)
Each tile displays:
- Photo (fallback avatar if none)
- Name
- City / Region (address summary, not full address for privacy)
- Phone number (click-to-call `tel:` link)
- WhatsApp icon (click-to-chat `wa.me` link)
- Small color tag/badge

Full street address can be reserved for the detail page only, or shown fully per your privacy preference — flag this decision below.

---

## 8. Auth Flow

1. Signup form → validate with Zod → hash password (bcrypt) → create `User` → redirect to profile setup.
2. Signin form → NextAuth Credentials provider → verify password → create session (JWT).
3. Protect `/profile/edit` and profile-mutating API routes with session check (`getServerSession`).
4. Public routes: home feed, profile detail, signup, signin.

---

## 9. Image Upload Flow (no 3rd-party service)

1. Client picks file → client-side resize/compress (e.g. `browser-image-compression`) to keep files small.
2. Upload to `/api/upload` → server writes the file to a local `/app/public/uploads` (or a mounted volume) directory with a generated filename.
3. Save the resulting relative path (e.g. `/uploads/xyz.jpg`) in `Profile.photoUrl`.
4. Mount that uploads folder as a Docker volume so photos survive container restarts/rebuilds.

---

## 10. Milestones

| Phase | Deliverable |
|---|---|
| 1 | Project scaffold, DB schema, Prisma migrations |
| 2 | Auth (signup/signin/signout) working end-to-end |
| 3 | Profile create/edit form + image upload |
| 4 | Home feed rendering tiles from DB |
| 5 | Filters (region, city, color, search) wired to API |
| 6 | Profile detail page |
| 7 | Styling pass, responsive tile grid, empty/loading states |
| 8 | Write Dockerfile + docker-compose, build single image, verify end-to-end in a container |

---

## 11. Open Decisions (need your input before building)

- Should full street address be public on the tile, or only city/region (with full address on detail page, or hidden entirely)?
- Should phone/WhatsApp be visible to everyone, or only to signed-in users?
- Is "color" a personal preference field (like a favorite color for fun/identity), or does it mean something else (e.g. a category tag)? Clarify so the filter makes sense.
- Do you want the database (Postgres) to run as a second container in `docker-compose.yml` alongside the app, or would you rather it be genuinely one single container with SQLite instead of Postgres (see Docker section — this changes the schema slightly)?

---

## 12. Docker Setup (single image)

"One image" needs one clarification: Next.js needs a database. There are two clean ways to satisfy "single image" depending on how strict that requirement is:

**Option A — Truly one container, SQLite instead of Postgres (simplest, recommended for "only one image"):**
- Swap Prisma's datasource to `sqlite`, store the DB file on a mounted volume (e.g. `/app/data/app.db`).
- Everything (app + DB engine) lives in one image; no `docker-compose` even required, just `docker run`.
- Trade-off: SQLite is fine for a small/simple app like this; not ideal for heavy concurrent writes, but that's not a concern here.

**Option B — One *app* image, Postgres as a sidecar container via docker-compose:**
- Keeps Postgres (better long-term if you expect growth), but the app itself still builds as a single Docker image.
- Slightly contradicts "only one image" literally, so only use this if you're okay with two containers total (app + db), both still fully self-hosted with no 3rd-party service.

Given the "only one image" instruction, the plan defaults to **Option A (SQLite)** unless you say otherwise.

### Example Dockerfile (multi-stage, single final image)

```dockerfile
# ---- deps & build ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# ---- runtime ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
VOLUME ["/app/data", "/app/public/uploads"]
EXPOSE 3000
CMD ["node", "server.js"]
```

- Uses Next.js `output: "standalone"` (set in `next.config.js`) to keep the runtime image small and dependency-free.
- Two volumes: one for the SQLite file, one for uploaded photos, so both persist across rebuilds.
- Run with:
  ```bash
  docker build -t social-profiles .
  docker run -p 3000:3000 -v social_data:/app/data -v social_uploads:/app/public/uploads social-profiles
  ```
- Environment variables (session secret, etc.) passed via `-e` flags or an `.env` file at runtime — no secrets baked into the image.

---

## 13. Suggested Folder Structure

```
/prisma
  schema.prisma
/app
  (auth)/...
  (main)/...
  api/...
/components
  ProfileTile.tsx
  FilterBar.tsx
  ProfileForm.tsx
  Avatar.tsx
/lib
  auth.ts
  db.ts
  validation.ts
/types
  profile.ts
```
