# LoveBite.live Backlink Audit — README

**Site:** https://www.lovebite.live/
**Scope:** India-wide organic search visibility, free-only/manual backlink strategy.
**Created:** 2026-10-28
**Audit directory:** `seo/backlink-audit/`

## 1. Audit methodology

This audit follows a verify-before-claim approach:

1. **Repository inspection first.** Reviewed project structure, `package.json`,
   Next.js SEO utilities (`lib/seo/site.ts`, `lib/seo/metadata.ts`), sitemap
   (`app/sitemap.ts`), robots (`app/robots.ts`), canonical URLs, redirects
   (`next.config.ts`), and existing SEO/traffic documentation
   (`SEO-ROADMAP.md`, `TRAFFIC-PLAN.md`).
2. **No production code changes** were made for this audit. All work is confined
   to `seo/backlink-audit/`.
3. **Backlink data handling.** No Ahrefs CSV/export or other backlink report was
   found in the repository. Therefore `backlink-audit.csv` is provided as a
   labelled template with the agreed column schema. Rows must be added only from
   real Ahrefs Free Backlink Checker exports or manually verified linking pages.
4. **Live verification where possible.** Checked the production site, robots.txt,
   sitemap.xml, HTTP/HTTPS and www/non-www redirects, and the `ww25.lovebite.live`
   hostname. Results are recorded as verified facts in `risk-report.md`.
5. **Competitor research.** Competitor rows are seeded as *candidates* requiring
   manual SERP/backlink verification. No competitor backlink counts, referring
   domains, or link URLs have been fabricated.
6. **Risk classification.** Every finding is labelled as:
   - **Verified fact** — directly observed.
   - **Suspicious indicator** — pattern that warrants review but is not proof.
   - **Unverified assumption** — not yet checked.

## 2. Tool limitations

- **Ahrefs Free Backlink Checker** (https://ahrefs.com/backlink-checker/) is
  JavaScript-rendered and cannot be scraped reliably in this environment. It
  shows a limited, sampled view of backlinks and does not expose full
  referring-page lists without manual use. Treat its DR/backlink/referring-domain
  figures as snapshots, not as a complete inventory.
- **No paid Ahrefs Site Explorer access** was used or claimed.
- **Bing Webmaster Tools** data is only available to the verified site owner;
  this audit does not have access to it. Import instructions are in
  `30-day-plan.md`.
- **No automated outreach** was performed. No emails, forms, or messages were
  sent.
- **No disavow file** was generated. Disavowal is recommended only after
  evidence of a manual action or a clearly manipulative link pattern, and only
  with documented review.
- **robots.txt currently blocks AhrefsBot and SemrushBot.** This can limit how
  thoroughly third-party crawlers discover links to the site. Whether to change
  this is a policy decision for the site owner (see `risk-report.md`).

## 3. How to repeat the analysis

### Backlink audit (monthly)

1. Open https://ahrefs.com/backlink-checker/ and enter `lovebite.live` (domain
   mode).
2. Export/download or manually transcribe referring pages into
   `backlink-audit.csv`. One row per linking page.
3. Set `data_source` to `imported_ahrefs_csv` and `verification_status` to
   `reported_only` until the page is checked.
4. For each row, fetch the referring page and confirm:
   - HTTP status
   - that the link to LoveBite.live still exists
   - anchor text
   - `rel` attribute (dofollow/nofollow/sponsored/ugc)
   - final target URL after redirects
5. Update `verification_status` to `verified_live`, `link_not_found`,
   `not_accessible`, or `redirected`.
6. Record the check date in `verified_date`.

### Redirect/hostname checks

```powershell
# Non-www and http variants
Invoke-WebRequest -Uri "http://lovebite.live/" -MaximumRedirection 0
Invoke-WebRequest -Uri "https://lovebite.live/" -MaximumRedirection 0
# Suspicious hostname
Resolve-DnsName ww25.lovebite.live
```

### Competitor research (monthly)

1. Run Google queries:
   - `call girls in India`
   - `escorts in India`
   - `call girls in Delhi`
   - `call girls in Mumbai`
   - `intitle:"call girls" India`
2. Record top 10 organic domains in `competitor-analysis.csv` as candidates.
3. For each candidate, use Ahrefs Free Backlink Checker (domain mode) and
   transcribe *observed* linking pages only. Never estimate counts.

### Validation commands run during this audit

- `npx tsc --noEmit` — **succeeded** (exit code 0, no errors).
- `npm run lint` — **timed out** after 120s; no lint errors were reported before
  timeout. Re-run with a longer timeout if needed.
- Production smoke checks (`Invoke-WebRequest`) — **succeeded** for
  https://www.lovebite.live/ (200), robots.txt (200), sitemap.xml (200).

## 5. Competitor verification summary (2026-10-28)

The 10 candidate competitors from the first pass were **retained** rather than
replaced. Replacing them would discard the tracking IDs and make the audit
history harder to follow. Their statuses were updated with manual homepage
checks and they remain unverified as ranking competitors until SERP and
backlink checks are completed.

### Verified findings

- `justdial.com` returned HTTP 200 and is a live, general local-business
  directory. Its category pages returned an empty HTML shell in this
  environment, so no referring pages were verified.
- `locanto.in` returned HTTP 403 in this environment. This is an access
  restriction, not evidence that the platform is harmful or unavailable.
- `indianescortservice.com` returned HTTP 200 but served an `Index of /`
  directory listing, not a usable editorial site.
- `delhiescorts.com` returned HTTP 200 with a "site temporarily unavailable"
  parking page.
- `mumbaiescorts.com` returned HTTP 200 with an informational/parking title.
- `kolkataescorts.com` returned HTTP 200 with no visible title or anchors.
- `bangaloreescorts.com` failed with a TLS/secure-channel error.
- `callgirlsindia.com` and `chennaiescorts.com` timed out.
- `escortsinindia.com` did not resolve (NXDOMAIN).
- **No referring page linking to any candidate competitor was verified in this
  pass.** `competitor-analysis.csv` therefore keeps `NOT_VERIFIED` in the
  referring-domain, linking-page, anchor, and link-type fields.

### Findings requiring manual Ahrefs checks

For each candidate domain, use Ahrefs Free Backlink Checker in domain mode and
record only observed rows:

1. Open https://ahrefs.com/backlink-checker/.
2. Enter the competitor domain (for example `justdial.com`).
3. Transcribe each visible referring page into `competitor-analysis.csv` as a
   new row or into a separate manual worksheet.
4. For each observed link, record: referring domain, exact linking page URL,
   destination URL, anchor text, link type, relevance, why the link exists, and
   whether a legitimate opportunity exists for LoveBite.live.
5. Verify the linking page independently by fetching it and confirming the link
   still exists.
6. Never estimate or copy aggregate metrics (DR, backlink counts, referring
   domain counts) from memory; record only what is visible.

### Top legitimate opportunities

These are opportunity *types*, not verified referring pages:

1. **Editorial safety resources** — pitch the `/faq` anti-scam and privacy
   content to digital-safety and privacy writers.
2. **Resource-page inclusion** — request inclusion on genuine safety/privacy
   resource lists that accept non-commercial references.
3. **Opt-in profile-owner shares** — encourage listing owners to share their
   own profile URLs from their public social accounts.
4. **Legitimate directory listings** — only where the directory accepts this
   business type, provides genuine user value, and permits the listing under
   its written policy.
5. **Broken-link replacement** — only where the replacement page genuinely
   satisfies the original page's purpose.

### Reasons to reject unsuitable opportunities

- Private blog networks, link farms, and SEO link-package pages.
- Automated or mass directory submissions.
- Comment spam, forum spam, and fake profiles.
- Paid links intended to manipulate rankings without `rel="sponsored"` or
  `nofollow`.
- Irrelevant websites with no topical or geographic relevance to India.
- Thin or empty city pages created only to obtain links.
- Any referring page that cannot be verified as live and contextually
  relevant.

### Confidence summary

- Homepage status checks above: **medium to high** for direct observations.
- Competitor status as ranking competitors: **low/unverified**.
- Backlink opportunities in `competitor-analysis.csv`: **low/unverified** until
  exact referring pages are observed and checked.

## 4. Files in this directory", "## 4. Files in this directory"

- `backlink-audit.csv` — one row per verified or reported backlink (template).
- `competitor-analysis.csv` — competitor backlink research and opportunity tracker.
- `outreach-plan.md` — ethical outreach workflow, examples, follow-up schedule.
- `30-day-plan.md` — weekly actions, free tools, metrics, targets.
- `risk-report.md` — suspicious patterns, redirect findings, next steps.
- `README.md` — this file.
