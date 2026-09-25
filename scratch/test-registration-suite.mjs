const BASE_URL = "http://localhost:3000";

async function runTests() {
  console.log("=== STARTING COMPREHENSIVE REGISTRATION TEST SUITE ===\n");
  let passed = 0;
  let total = 0;

  function assert(condition, name, details = "") {
    total++;
    if (condition) {
      console.log(`[PASS] Test ${total}: ${name}`);
      passed++;
    } else {
      console.error(`[FAIL] Test ${total}: ${name} - ${details}`);
    }
  }

  // 1. Empty name
  {
    const res = await fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "   ",
        email: "valid.user1@example.com",
        password: "ValidPassword123!"
      })
    });
    const data = await res.json();
    assert(
      res.status === 400 && data.errors?.name?.length > 0,
      "Empty/whitespace name rejection",
      `Status: ${res.status}, body: ${JSON.stringify(data)}`
    );
  }

  // 2. Invalid email format
  {
    const res = await fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Valid Name",
        email: "not-an-email",
        password: "ValidPassword123!"
      })
    });
    const data = await res.json();
    assert(
      res.status === 400 && data.errors?.email?.length > 0,
      "Invalid email format rejection",
      `Status: ${res.status}, body: ${JSON.stringify(data)}`
    );
  }

  // 3. Weak password (under 8 chars)
  {
    const res = await fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Valid Name",
        email: "valid.user2@example.com",
        password: "short"
      })
    });
    const data = await res.json();
    assert(
      res.status === 400 && data.errors?.password?.length > 0,
      "Weak password rejection (< 8 characters)",
      `Status: ${res.status}, body: ${JSON.stringify(data)}`
    );
  }

  // 4. Invalid JSON payload
  {
    const res = await fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-a-valid-json{"
    });
    const data = await res.json();
    assert(
      res.status === 400 && data.error === "Invalid JSON format in request body.",
      "Malformed JSON payload rejection with 400 (not 500)",
      `Status: ${res.status}, body: ${JSON.stringify(data)}`
    );
  }

  // 5. Successful registration with a fresh new user
  const newEmail = `user_${Date.now()}@example.com`;
  let createdUserId = null;
  {
    const res = await fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "New Verified User",
        email: newEmail,
        password: "StrongPassword2026!"
      })
    });
    const data = await res.json();
    createdUserId = data.id;
    assert(
      res.status === 201 && data.id && data.email === newEmail.toLowerCase(),
      "Successful registration of new user returns 201",
      `Status: ${res.status}, body: ${JSON.stringify(data)}`
    );
  }

  // 6. Duplicate email registration
  {
    const res = await fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Duplicate User",
        email: newEmail,
        password: "StrongPassword2026!"
      })
    });
    const data = await res.json();
    assert(
      res.status === 409 &&
      data.error === "An account with this email already exists. Please sign in." &&
      data.errors?.email?.includes("An account with this email already exists. Please sign in."),
      "Duplicate email registration returns 409 with user-friendly message",
      `Status: ${res.status}, body: ${JSON.stringify(data)}`
    );
  }

  // 7. Duplicate email with uppercase variation (case-insensitive check)
  {
    const res = await fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Duplicate Uppercase",
        email: newEmail.toUpperCase(),
        password: "StrongPassword2026!"
      })
    });
    const data = await res.json();
    assert(
      res.status === 409 &&
      data.error === "An account with this email already exists. Please sign in.",
      "Duplicate uppercase email returns 409 with user-friendly message",
      `Status: ${res.status}, body: ${JSON.stringify(data)}`
    );
  }

  // 8. Verify existing users are untouched
  {
    const res = await fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Ankit Kumar",
        email: "ankitydv098@gmail.com",
        password: "StrongPassword2026!"
      })
    });
    const data = await res.json();
    assert(
      res.status === 409 &&
      data.error === "An account with this email already exists. Please sign in.",
      "Existing seed user is unaffected and protected against duplicate signup",
      `Status: ${res.status}, body: ${JSON.stringify(data)}`
    );
  }

  console.log(`\n=== TEST RESULTS: ${passed}/${total} TESTS PASSED ===\n`);
}

runTests().catch(console.error);
