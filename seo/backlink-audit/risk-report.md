# Risk Report — LoveBite.live Backlinks

## 1. Verified facts

| # | Finding | Evidence | Confidence |
|---|---------|----------|------------|
| F1 | Production site returns HTTP 200 at https://www.lovebite.live/ | `Invoke-WebRequest` 2026-10-28 | High |
| F2 | robots.txt is live and advertises sitemap https://www.lovebite.live/sitemap.xml | Live fetch 2026-10-28 | High |
| F3 | robots.txt blocks `AhrefsBot` and `SemrushBot` (among others) | `app/robots.ts` and live robots.txt | High |
| F4 | HTTP (port 80) redirects 308 to HTTPS; non-www redirects 308 to www | Live checks 2026-10-28 | High |
| F5 | `/city/:city*` permanently (301) redirects to `/call-girls-in/:city*` | `next.config.ts` redirects() | High |
| F6 | `ww25.lovebite.live` does not resolve (NXDOMAIN) | `nslookup`/`Resolve-DnsName` 2026-10-28 | High |
| F7 | No Ahrefs CSV/export or backlink report exists in the repository | Filesystem search 2026-10-28 | High |
| F8 | TypeScript check (`npx tsc --noEmit`) passes with no errors | Command output 2026-10-28 | High |
| F9 | Site uses per-page canonical URLs; root layout does not set a global canonical | `app/layout.tsx`, `lib/seo/metadata.ts` | High |

## 2. Suspicious indicators (not proof of harm)

| # | Indicator | Why it is suspicious | Confidence |
|---|-----------|----------------------|------------|
| S1 | User-reported Ahrefs sample shows referring pages promoting aged domains, backlink services, PBNs and SEO link packages | These are common sources of manipulative or low-value links | Medium (reported, not independently verified) |
| S2 | Some reported links point through `ww25.lovebite.live` | Non-canonical hostname; could indicate scraped/redirected or spam-generated references | Medium (hostname no longer resolves) |
| S3 | Site is new (2026) with DR 0 and ~158 reported backlinks / 73 referring domains | New domains often accumulate noisy early links; not inherently harmful | Low (snapshot; may be stale) |
| S4 | 49% dofollow reported | Mixed dofollow/nofollow is normal; ratio alone is not evidence of manipulation | Low |

Notes:
- A link is **not** harmful solely because of its TLD, low DR, or suspicious
  appearance. Each referring page must be inspected for actual link presence,
  context, and intent.
- Blocking `AhrefsBot` may reduce Ahrefs' ability to discover links to the
  site, which can make the reported backlink profile look smaller or stale than
  reality.

## 3. Unverified assumptions

| # | Assumption | Status |
|---|------------|--------|
| U1 | The reported suspicious referring pages still exist and still link to LoveBite.live | Not checked (no source URLs available) |
| U2 | Links through `ww25.lovebite.live` were ever live or caused indexing issues | Not checked; hostname currently NXDOMAIN |
| U3 | Any link is part of a paid/manipulative scheme | Not established |
| U4 | Competitor domains listed in `competitor-analysis.csv` are current ranking competitors | Not verified |
| U5 | Ahrefs snapshot figures (DR 0, 158 backlinks, 73 referring domains, 49% dofollow) are current | Not rechecked; Ahrefs Free Backlink Checker could not be scraped in this environment |

## 4. Redirect findings

- **Canonical host:** https://www.lovebite.live/ (www + HTTPS) is the intended
  canonical origin, driven by `NEXT_PUBLIC_SITE_URL`.
- **HTTP → HTTPS:** 308 redirect confirmed.
- **non-www → www:** 308 redirect confirmed.
- **Legacy `/city/*` → `/call-girls-in/*`:** 301 redirect in `next.config.ts`.
  Backlinks to old `/city/` URLs should still pass signals through the 301,
  but updating known links to the new canonical URL is preferable.
- **`ww25.lovebite.live`:** NXDOMAIN as of 2026-10-28. No action needed unless
  it reappears or old references resurface. If it ever resolves again,
  investigate DNS/hosting configuration before assuming malicious intent.

## 5. Recommended next steps

1. **Obtain the Ahrefs export.** Run Ahrefs Free Backlink Checker manually,
   export/transcribe referring pages, and populate `backlink-audit.csv`.
2. **Verify each reported link** (HTTP status, link presence, anchor, rel,
   final target). Update verification statuses.
3. **Review, do not auto-disavow.** Only consider disavowal if there is a
   manual action in Google Search Console or clear evidence of a manipulative
   link scheme. Document evidence and owner approval first.
4. **Keep robots policy under review.** If Ahrefs monitoring is desired,
   consider allowing `AhrefsBot` on public pages; weigh against bandwidth and
   scraping concerns. This is a policy decision, not an automatic change.
5. **Strengthen linkable assets** (`/faq` safety guides) before outreach.
6. **Publish real listings in priority cities** to make city pages genuinely
   useful link targets.
7. **Track metrics weekly** per `30-day-plan.md`.

## 6. Disavowal stance

No disavow file has been generated and none should be submitted on the basis of
this report. The current evidence consists of reported suspicious patterns and a
non-resolving hostname, not a documented manual action or verified manipulative
link scheme. Revisit only if Search Console reports a manual action or verified
link spam.
