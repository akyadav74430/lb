# Lovebite (`lovebite.com`) — Security, Privacy & Moderation Architecture

## 1. Overview & Core Architecture

Lovebite is an India-focused companion directory platform operating with a privacy-by-design, safety-first architecture. All user data, photographs, and moderation actions adhere to strict data minimization, encryption, EXIF stripping, and role-based access control (RBAC).

---

## 2. Authentication & Role-Based Access Control (RBAC)

### 2.1 Role Hierarchy
Privileges strictly follow an inheritance hierarchy:

```text
VISITOR (Level 0)
   ↓
REGISTERED_USER (Level 1)
   ↓
MODERATOR (Level 2)
   ↓
ADMIN (Level 3)
   ↓
SUPER_ADMIN (Level 4)
```

| Role | Permissions & Access Scope |
| :--- | :--- |
| **`VISITOR`** | Browse public approved profiles, filter by Indian States/Districts/Cities, view public rates, submit confidential safety reports, send support inquiries. |
| **`REGISTERED_USER`** | Manage own account, create companion profile, upload 5–6 photos, configure visibility tiers, block abusive users, view members-only contact numbers. |
| **`MODERATOR`** | Access Moderation Dashboard (`/admin/dashboard`), review pending profiles, inspect reports, approve/reject profiles with mandatory reasoning, request changes, flag duplicate photo hashes. |
| **`ADMIN`** | All Moderator permissions + manage user accounts, assign/revoke Moderator roles, toggle account suspensions, view full audit logs. |
| **`SUPER_ADMIN`** | Unrestricted platform security access, delete Admin accounts, modify highest-level security credentials. |

### 2.2 IDOR & Access Control Protections
- Resource ownership is verified server-side on every mutative request (`session.user.id === profile.userId` or staff override via `isStaffOrAdmin`).
- DTO sanitizers (`sanitizeUserDTO`, `sanitizeProfileDTO`) strip sensitive database fields (`passwordHash`, internal moderation notes, confidential street addresses) before sending JSON responses to clients.

---

## 3. Secure Photo Upload & Processing Pipeline

### 3.1 Media Pipeline Architecture

```text
User Selects Images (JPG / PNG / WebP)
              ↓
  Client-Side Image Compression
              ↓
POST /api/upload with Rate Limiter (30/hr)
              ↓
Magic-Byte Signature Verification (Reject forged extensions)
              ↓
   Sharp Engine Re-Encoding & Dimension Validation
              ↓
Complete GPS & EXIF Metadata Removal (rotate + strip tags)
              ↓
      SHA-256 Perceptual Fingerprint Generation
              ↓
  Quarantine Storage (`/app/data/uploads` / UUID filenames)
              ↓
Moderation Review / Duplicate Cluster Flagging
              ↓
Approved Delivery via `/api/files/[filename]`
```

### 3.2 Key Photo Security Features
1. **Magic-Byte Binary Header Inspection**: Prevents polyglot file uploads and executable script execution (JPEG: `FF D8 FF`, PNG: `89 50 4E 47`, WebP: `52 49 46 46...57 45 42 50`).
2. **EXIF & GPS Stripping**: Server automatically eliminates all geolocation tags, camera metadata, and device identifiers.
3. **Randomized UUID Filenames**: User-provided filenames are completely discarded; media is stored using cryptographically secure UUIDs (`randomUUID()`).
4. **5–6 Photo Gallery Policy**: Profile editor enforces 5 minimum recommended photos and 6 maximum gallery images with explicit primary photo selection.
5. **Duplicate Fingerprinting**: Calculates SHA-256 hash of image buffers to detect reused or stolen photos across multiple companion profiles.

---

## 4. Privacy-by-Design & Location Privacy

### 4.1 Visibility Tiers
Every companion profile has configurable visibility:
- **`PUBLIC`**: Visible to all directory visitors.
- **`REGISTERED_USERS_ONLY`**: Full details hidden behind mandatory user sign-in.
- **`PRIVATE`**: Hidden from all search queries; visible only to the profile owner and safety moderators.
- **`UNPUBLISHED`**: Draft mode.

### 4.2 Indian Location Privacy
Directory navigation is structured hierarchically:
$$\text{India} \longrightarrow \text{State} \longrightarrow \text{District} \longrightarrow \text{City} \longrightarrow \text{Local Area}$$
- Exact physical street addresses and hotel room numbers are **strictly confidential** and masked from public API responses.
- Contact privacy toggle (`hidePhoneFromPublic`) protects WhatsApp and telephone numbers from scrapers and unauthenticated crawlers.

---

## 5. Moderation Workflow & Legal Safeguards

### 5.1 Profile Approval Lifecycle
```text
DRAFT  ──(Submit)──>  UNDER_REVIEW  ──(Moderator Review)──>  APPROVED / REJECTED / NEEDS_CHANGES
```
- **Age Confirmation**: Requires explicit, un-prechecked confirmation that the user is at least 18 years old.
- **Photo Consent Declaration**: Records consent version (`1.0`), IP address, and timestamp upon submission.
- **Rejection Accountability**: Any rejected profile requires an explicit, informative reason recorded in the database and visible to the profile owner.

---

## 6. Report & Block System

### 6.1 Report Categories
Visitors and users can submit confidential reports categorized by:
1. `FAKE_PROFILE` — Fake / Scammer Profile
2. `STOLEN_PHOTOS` — Stolen or Unauthorized Photographs
3. `IMPERSONATION` — Impersonating Another Individual
4. `UNDERAGE_CONCERN` — Minor Suspected (Immediate High-Priority Escalation)
5. `HARASSMENT` — Harassment or Threatening Behavior
6. `SPAM` — Commercial Spam or Bot Automation
7. `FRAUD` — Advance Payment Scam / Financial Fraud
8. `NON_CONSENSUAL_CONTENT` — Non-Consensual Media Publication
9. `WRONG_INFORMATION` — Inaccurate Location or Rates
10. `OTHER` — Terms of Service Violation

### 6.2 Rate Limiting
- **Reports**: Max 5 submissions / hour per IP or account.
- **Uploads**: Max 30 uploads / hour per user.
- **Auth**: Max 10 failed login attempts per 15 minutes.
- **Contact Support**: Max 5 submissions / hour with Google reCAPTCHA v2 verification.

---

## 7. Incident Response Procedures

| Incident Type | Immediate Containment Action | Escalation & Notification |
| :--- | :--- | :--- |
| **Suspected Minor / Underage Content** | Immediate profile suspension, quarantine of all images, IP block. | Escalate immediately to Lead Safety Moderator and law enforcement where applicable under POCSO / local regulations. |
| **Stolen Photos / DMCA Notice** | Suspend flagged media within 24 hours, notify uploader. | Resolve via `/admin/dashboard` reports queue. |
| **Compromised Account / Takeover** | Invalidate active JWT sessions, reset password hash, lock account. | Send email notice to verified account owner. |
| **Scammer / Advance Fee Fraud** | Immediate profile ban, blacklist phone/email, audit associated IP clusters. | Notify reporting users; publish details to Blacklist registry. |

---

## 8. Verification & Running Tests

Run the complete security test suite:
```bash
node scratch/test-security-suite.mjs
```

Verify build output:
```bash
npm run build
```
