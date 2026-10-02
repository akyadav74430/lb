import { getContactVisibility, telHref, whatsappHref } from "../scratch/tmp/contact-visibility.js";

let passed = 0;
let failed = 0;
function assert(cond, msg) {
  if (cond) { console.log(`  PASS  ${msg}`); passed++; }
  else { console.error(`  FAIL  ${msg}`); failed++; }
}
const NONE = { showContact: false, showCall: false, showWhatsApp: false };

console.log("\n=== Contact visibility matrix ===\n");

// 1. Public profile, contact enabled
let v = getContactVisibility(
  { status: "APPROVED", visibility: "PUBLIC", hidePhoneFromPublic: false, phone: "+91 98765 43210", whatsapp: "+91 98765 43210", userId: "u1" },
  null
);
assert(v.showContact && v.showCall && v.showWhatsApp, "1. public + contact enabled -> Contact/Call/WhatsApp");
assert(v.phone === "+919876543210" && v.whatsapp === "+919876543210", "1b. per-profile numbers used (normalized)");
assert(!(v.phone || "").includes("62035"), "1c. no hardcoded fallback number leaks in");

// 2. Public profile, contact disabled by owner
v = getContactVisibility(
  { status: "APPROVED", visibility: "PUBLIC", hidePhoneFromPublic: true, phone: "+91 98765 43210", whatsapp: "+91 98765 43210", userId: "u1" },
  null
);
assert(v.showContact && !v.showCall && !v.showWhatsApp, "2. public + contact disabled -> Contact only, no numbers");
assert(v.phone === undefined && v.whatsapp === undefined, "2b. no phone/whatsapp values exposed");
assert(v.gated === true, "2c. flagged as gated");

// 3. Gated, but requester is the owner / staff
v = getContactVisibility(
  { status: "APPROVED", visibility: "PUBLIC", hidePhoneFromPublic: true, phone: "+91 98765 43210", whatsapp: "9876543210", userId: "u1" },
  { id: "u1", role: "REGISTERED_USER" }
);
assert(v.showCall && v.showWhatsApp, "3. owner sees own contact despite hidePhoneFromPublic");
v = getContactVisibility(
  { status: "APPROVED", visibility: "PUBLIC", hidePhoneFromPublic: true, phone: "+91 98765 43210", userId: "u2" },
  { id: "staff", role: "SUPER_ADMIN" }
);
assert(v.showCall, "3b. staff sees contact");

// 4. Unpublished profile
v = getContactVisibility({ status: "APPROVED", visibility: "UNPUBLISHED", phone: "+91 1", userId: "u1" }, null);
assert(!v.showContact && !v.showCall, "4. unpublished -> no contact actions");
v = getContactVisibility({ status: "UNPUBLISHED", visibility: "PUBLIC", phone: "+91 1", userId: "u1" }, null);
assert(!v.showContact && !v.showCall, "4b. status UNPUBLISHED -> no contact actions");

// 5. Unapproved / suspended
v = getContactVisibility({ status: "DRAFT", visibility: "PUBLIC", phone: "+91 1", userId: "u1" }, null);
assert(!v.showContact, "5. draft profile -> no contact actions");
v = getContactVisibility({ status: "APPROVED", visibility: "PUBLIC", isSuspended: true, phone: "+91 1", userId: "u1" }, null);
assert(!v.showContact && !v.showCall, "5b. suspended owner -> no contact actions");

// 6. Sanitised public payload (server already stripped numbers + flag)
v = getContactVisibility({ status: "APPROVED", visibility: "PUBLIC", isPhoneHidden: true, phone: undefined, whatsapp: undefined, userId: "u1" }, null);
assert(v.showContact && !v.showCall && !v.showWhatsApp, "6. server-stripped payload -> Contact only");

// 7. Different profiles have different numbers
const a = getContactVisibility({ status: "APPROVED", visibility: "PUBLIC", phone: "+91 90000 00001", userId: "ua" }, null);
const b = getContactVisibility({ status: "APPROVED", visibility: "PUBLIC", phone: "+91 90000 00002", userId: "ub" }, null);
assert(a.phone !== b.phone && a.phone === "+919000000001" && b.phone === "+919000000002", "7. per-profile numbers, not shared");

// 8. Empty / missing contact payload
v = getContactVisibility(null, null);
assert(JSON.stringify(v) === JSON.stringify({ eligible: false, ...NONE, gated: false }), "8. null profile -> nothing rendered");

// 9. Link builders
assert(telHref("+91 98765 43210") === "tel:919876543210", "9. tel: href strips formatting");
assert(whatsappHref("+91 98765-43210") === "https://wa.me/919876543210", "9b. wa.me href digits only");

// 10. Numbers present but withheld: no leakage through hrefs
v = getContactVisibility({ status: "APPROVED", visibility: "PUBLIC", hidePhoneFromPublic: true, phone: "+91 98765 43210", userId: "u1" }, null);
assert(!v.phone || !v.phone.includes("98765"), "10. withheld number never returned for rendering");

console.log(`\n${passed} passed, ${failed} failed\n`);
if (failed) process.exit(1);
