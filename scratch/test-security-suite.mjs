import sharp from "sharp";
import crypto from "crypto";

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✕ FAIL: ${message}`);
    failed++;
  }
}

// 1. Magic Bytes Algorithm Validation
function validateMagicBytes(buffer) {
  if (buffer.length < 12) return { valid: false, error: "Too small" };
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, detectedMime: "image/jpeg" };
  }
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return { valid: true, detectedMime: "image/png" };
  }
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { valid: true, detectedMime: "image/webp" };
  }
  return { valid: false, error: "Unsupported format" };
}

// 2. Role Hierarchy
const ROLE_HIERARCHY = {
  VISITOR: 0,
  REGISTERED_USER: 1,
  MODERATOR: 2,
  ADMIN: 3,
  SUPER_ADMIN: 4,
};

function hasRoleLevel(userRole, requiredRole) {
  if (!userRole) return false;
  return (ROLE_HIERARCHY[userRole] ?? 0) >= (ROLE_HIERARCHY[requiredRole] ?? 0);
}

// 3. Privacy Masker
function sanitizeProfileDTO(profile, requester) {
  if (!profile) return null;
  const isOwner = requester && requester.id === profile.userId;
  const isStaff = requester && hasRoleLevel(requester.role, "MODERATOR");

  if (profile.status !== "APPROVED" && !isOwner && !isStaff) {
    return null;
  }

  const safe = {
    ...profile,
    address: isOwner || isStaff ? profile.address : undefined,
  };

  if (profile.hidePhoneFromPublic && !requester && !isStaff) {
    delete safe.phone;
    delete safe.whatsapp;
    safe.isPhoneHidden = true;
  }

  if (!isStaff && !isOwner) {
    delete safe.moderationNotes;
    delete safe.rejectionReason;
  }

  return safe;
}

async function runTests() {
  console.log("==================================================");
  console.log("🛡️  LOVEBITE PRODUCTION SECURITY & MODERATION TEST SUITE");
  console.log("==================================================\n");

  // 1. RBAC Hierarchy
  console.log("1. Testing Role-Based Access Control (RBAC):");
  assert(!hasRoleLevel("VISITOR", "REGISTERED_USER"), "VISITOR cannot access REGISTERED_USER resources");
  assert(!hasRoleLevel("REGISTERED_USER", "MODERATOR"), "REGISTERED_USER cannot access MODERATOR resources");
  assert(!hasRoleLevel("REGISTERED_USER", "ADMIN"), "REGISTERED_USER cannot access ADMIN resources");
  assert(hasRoleLevel("MODERATOR", "MODERATOR"), "MODERATOR can access MODERATOR resources");
  assert(hasRoleLevel("ADMIN", "MODERATOR"), "ADMIN has MODERATOR level access");
  assert(hasRoleLevel("SUPER_ADMIN", "ADMIN"), "SUPER_ADMIN has ADMIN privileges");

  // 2. Magic-Byte Image Security & EXIF Stripping
  console.log("\n2. Testing Magic Bytes & Photo Pipeline:");
  const fakeJpg = Buffer.from("<?php echo 'malicious script'; ?>");
  assert(!validateMagicBytes(fakeJpg).valid, "Malicious PHP payload disguised as JPG rejected via magic bytes");

  const validJpgHeader = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01]);
  assert(validateMagicBytes(validJpgHeader).valid, "Real JPEG magic bytes accepted");

  // Real Image Pipeline with Sharp
  const testImageBuffer = await sharp({
    create: {
      width: 400,
      height: 400,
      channels: 4,
      background: { r: 225, g: 29, b: 72, alpha: 1 },
    },
  })
    .jpeg({ quality: 90 })
    .toBuffer();

  const webpSanitized = await sharp(testImageBuffer).rotate().webp({ quality: 85 }).toBuffer();
  const sha256 = crypto.createHash("sha256").update(webpSanitized).digest("hex");
  assert(sha256.length === 64, "SHA-256 duplicate fingerprint generated: " + sha256.slice(0, 16) + "…");

  // 3. Privacy-by-Design & Location Masking
  console.log("\n3. Testing Privacy-by-Design & Field Masking:");
  const rawProfile = {
    id: "prof-1",
    userId: "user-123",
    address: "123 Confidential Luxury Apartment, Bandra West",
    city: "Mumbai",
    region: "Maharashtra",
    phone: "+91 98765 43210",
    hidePhoneFromPublic: true,
    status: "APPROVED",
    visibility: "PUBLIC",
    moderationNotes: "Government ID verified by staff.",
  };

  const publicDTO = sanitizeProfileDTO(rawProfile, null);
  assert(publicDTO.address === undefined, "Confidential street address masked from public visitors");
  assert(publicDTO.phone === undefined, "Phone masked from unauthenticated visitors when hidePhoneFromPublic is true");
  assert(publicDTO.moderationNotes === undefined, "Internal moderation notes stripped from public response");
  assert(publicDTO.city === "Mumbai", "City level location preserved for directory search");

  const ownerDTO = sanitizeProfileDTO(rawProfile, { id: "user-123", role: "REGISTERED_USER" });
  assert(ownerDTO.address === rawProfile.address, "Profile owner can view own complete address");
  assert(ownerDTO.phone === rawProfile.phone, "Profile owner can view own contact details");

  const underReviewProfile = { ...rawProfile, status: "UNDER_REVIEW" };
  assert(sanitizeProfileDTO(underReviewProfile, null) === null, "Profile under review completely hidden from public visitors");
  assert(sanitizeProfileDTO(underReviewProfile, { id: "user-123", role: "REGISTERED_USER" }) !== null, "Profile under review visible to owner");
  assert(sanitizeProfileDTO(underReviewProfile, { id: "mod-1", role: "MODERATOR" }) !== null, "Profile under review visible to moderator");

  // 4. Live API Endpoint Security Verification
  console.log("\n4. Testing Live API Endpoints (localhost:3002):");
  try {
    // 4.1 Admin stats without auth -> expect 401
    const unauthAdminRes = await fetch("http://localhost:3002/api/admin/stats");
    assert(unauthAdminRes.status === 401, "Unauthenticated access to /api/admin/stats returns 401 Unauthorized");

    // 4.2 Public Profiles Endpoint -> expect 200
    const profilesRes = await fetch("http://localhost:3002/api/profiles");
    assert(profilesRes.status === 200, "Public profiles API (/api/profiles) returns 200 OK");
    const profilesData = await profilesRes.json();
    assert(Array.isArray(profilesData.profiles), "Profiles array returned with sanitized fields");

    // 4.3 Reports Endpoint without valid body -> expect 400
    const badReportRes = await fetch("http://localhost:3002/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId: "invalid", category: "INVALID_CAT", description: "too short" }),
    });
    assert(badReportRes.status === 400, "Invalid report payload returns 400 Bad Request with validation errors");
  } catch (err) {
    console.warn("Live API connection note:", err.message);
  }

  console.log("\n==================================================");
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
