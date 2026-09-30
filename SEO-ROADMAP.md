# Off-site authority roadmap

Everything in the git history is on-page or technical work. That is the part
you can control, and it is now in reasonable shape. It is also, honestly, the
smaller half of ranking. The following is off-site and cannot be automated
from this repository.

Read this before treating any ranking timeline as a promise. "First page for
`call girls in India`" is a months-long goal that depends on link acquisition
and content volume, not on a sprint of code changes.

## Where the site actually stands

Measured, not assumed:

- 14 URLs in the sitemap: homepage, `/call-girls`, `/escorts`, 2 city pages,
  4 profile pages, 6 info/legal pages.
- 2 public listings, in 2 cities (Kolkata, Delhi).
- Zero referring domains, since the site is new.

Head terms like `call girl` are dominated by domains that have been running
for a decade or more with tens of thousands of pages and thousands of
independent referring domains. No technical change makes a 14-URL site
competitive with that. What technical work *does* buy you is eligibility: you
can rank for long-tail city and service queries, and you will rank faster once
authority arrives.

## Phase 1 — measurement and indexing (do this first, it is free)

Nothing else can be evaluated until Google knows the site exists.

1. **Google Search Console.** Add the property, verify via DNS TXT, and submit
   `https://www.lovebite.live/sitemap.xml`. `robots.ts` already advertises the
   sitemap and the canonical domain resolves from `NEXT_PUBLIC_SITE_URL`.
2. **Bing Webmaster Tools.** Import from Search Console rather than verifying
   separately. Bing is a genuinely independent index and often surfaces adult-adjacent
   queries that Google will not.
3. **Check Indexing** in GSC on the 4 priority URLs: `/`, `/call-girls`,
   `/escorts`, and each `/city/*`.
4. **Watch Coverage and Enhancements.** Structured data is emitted for
   breadcrumbs, `ItemList`, and the site entity graph. Any error here shows up
   in GSC and is worth fixing before scaling content.

## Phase 2 — make the domain worth citing

Before asking anyone for a link, the destination has to be defensible.

- **Publish listings in the cities people actually search.** This is the single
  highest-leverage action available. Right now the site covers 2 cities; the
  long tail is where a new domain can actually win. Add real listings for
  Mumbai, Bengaluru, Hyderabad, Pune, Chennai, Jaipur, Lucknow, Ahmedabad.
- **Fill in `district` and `localArea` on every profile.** The city pages now
  build a genuine "areas covered" section from those columns. Profiles with them
  empty produce materially thinner pages, because the content module omits
  sentences it cannot back with data.
- **Fix the implausible rate rows.** The aggregate code logs values under
  ₹1,000 as keying errors. Correct them in the listings table so the published
  rate range is trustworthy.
- **Use `content/city-editorial.ts`.** Generated copy is factually safe but
  structural. Hand-written paragraphs for the top 10 cities are what separates
  you from templated doorway pages.

## Phase 3 — links

Link acquisition is manual and slow. There is no shortcut, and anything that
promises one (PBNs, link farms, paid "guaranteed #1" packages) either wastes
money or triggers a manual action that costs you everything.

What is legitimate and worth doing:

1. **Adult directory listings.** Submit to well-known, established adult
   directories that allow real listings. Expect low approval rates and low
   link quality. A handful of these is a start, not a strategy.
2. **Local and regional publications.** Genuine editorial coverage of the
   safety-verification angle is more linkable than directory listings, because
   journalists link to it. The verification and anti-scam content already on
   `/faq` is the most linkable asset on the site.
3. **Community participation.** Contribute substantively where the audience
   already discusses this, and disclose the affiliation. Undisclosed promotion
   in these communities is both a policy violation and a reputational risk.
4. **Telegram.** The footer already points at a Telegram channel. A channel
   that publishes real updates drives repeat visits and direct traffic, and
   direct traffic is a genuine ranking input.

## Phase 4 — the adult-content reality

This needs to be said plainly, because it shapes expectations:

- Google applies stricter de-ranking to adult content than to other verticals,
  and most of it is excluded from default SafeSearch results.
- Competitors in this vertical often hold domain-level authority that takes
  years to displace. A new domain rarely dislodges them on head terms.
- **Expect the long tail to come first.** "call girls in Kolkata" is winnable
  long before "call girls in India" is, and city pages are where this
  architecture pays off.
- A manual action for policy violations is a real risk in this space. The
  existing age-verification, terms, DMCA and 18+ pages are not decoration;
  keep them accurate and keep `disallow` rules in `robots.ts` in place.

## What was deliberately not done

Documented so nobody "fixes" it later:

- **No `aggregateRating` or fake review schema.** Fabricated review markup is a
  direct manual-action trigger. `lib/seo/jsonld.tsx` emits no ratings,
  review counts, or prices anywhere.
- **No pages for cities without listings.** That is doorway-page spam. The
  guard is `listCitiesWithListings()` in `lib/seo/profiles.ts`; keep it.
- **No keyword stuffing.** The copy is assembled from real data and sentences
  are omitted when the data is missing, rather than padded.
