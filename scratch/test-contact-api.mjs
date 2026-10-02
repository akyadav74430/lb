const BASE = process.env.BASE_URL || "http://localhost:3005";
let passed = 0, failed = 0;
function assert(c, m) {
  if (c) { console.log(`  PASS  ${m}`); passed++; }
  else { console.error(`  FAIL  ${m}`); failed++; }
}

const list = await fetch(`${BASE}/api/profiles?page=1`);
const listJson = await list.json();
const profiles = listJson.profiles || [];
console.log(`\nGET /api/profiles -> ${list.status}, ${profiles.length} profiles\n`);

assert(list.status === 200, "list endpoint returns 200");

const leakKeys = ["hidePhoneFromPublic", "isSuspended", "moderationNotes", "rejectionReason", "passwordHash", "address"];
const raw = JSON.stringify(listJson);
for (const k of leakKeys) {
  assert(!raw.includes(`"${k}"`), `list response omits internal key "${k}"`);
}
assert(!/"user":\{"id":"[^"]+","name":"[^"]+","email"/.test(raw), "list response omits owner email");

const allApprovedPublic = profiles.every((p) => p.status === "APPROVED" && p.visibility === "PUBLIC");
assert(allApprovedPublic, "every listed profile is APPROVED + PUBLIC (unpublished/suspended excluded server-side)");

const withPhone = profiles.filter((p) => p.phone);
const withWa = profiles.filter((p) => p.whatsapp);
assert(withPhone.length > 0, `contact enabled profiles expose phone (${withPhone.length})`);
assert(withWa.length > 0, `contact enabled profiles expose whatsapp (${withWa.length})`);

const numbers = new Set(profiles.flatMap((p) => [p.phone, p.whatsapp]).filter(Boolean));
console.log(`        distinct numbers in payload: ${numbers.size} for ${profiles.length} profiles`);
assert(numbers.size >= profiles.length || profiles.length <= 1, "numbers are per-profile, not one shared number");

// no gated profile may carry a number
assert(profiles.every((p) => !p.isPhoneHidden || (!p.phone && !p.whatsapp)), "isPhoneHidden profiles carry no numbers");

// single profile endpoint
if (profiles[0]) {
  const one = await fetch(`${BASE}/api/profiles/${profiles[0].id}`);
  const oneJson = await one.json();
  assert(one.status === 200, "GET /api/profiles/[id] returns 200 for a public profile");
  assert(!JSON.stringify(oneJson).includes('"email"'), "single profile response omits owner email");
  assert(oneJson.phone === profiles[0].phone, "single profile applies the same contact rules as the list");
}

const missing = await fetch(`${BASE}/api/profiles/does-not-exist`);
assert(missing.status === 404, "unknown profile id -> 404");

// homepage renders + CSS shipped
const home = await fetch(`${BASE}/`);
const homeHtml = await home.text();
assert(home.status === 200, "homepage returns 200");
const cssHref = (homeHtml.match(/\/_next\/static\/css\/[^"']+\.css/) || [])[0];
assert(Boolean(cssHref), "stylesheet link found");
const css = await fetch(`${BASE}${cssHref}`).then((r) => r.text());
for (const sel of [".contact-actions", ".contact-action--primary", ".contact-action--call", ".contact-action--whatsapp", ".profile-card__link"]) {
  assert(css.includes(sel), `CSS ships ${sel}`);
}
assert(/@media\s*\(max-width:\s*480px\)\s*\{[^}]*contact-action--primary/s.test(css) || css.includes("contact-action--primary{flex:1 0 100%}"), "CSS has mobile stacked Contact layout");
assert(css.includes("flex-wrap:wrap"), "contact row can wrap (no horizontal overflow)");
assert(css.includes("focus-visible"), "visible focus state defined");

console.log(`\n${passed} passed, ${failed} failed\n`);
if (failed) process.exit(1);
