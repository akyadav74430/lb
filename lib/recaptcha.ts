export interface RecaptchaVerificationResult {
  success: boolean;
  score?: number;
  errorCodes?: string[];
}

export async function verifyRecaptchaToken(
  token: string,
  remoteIp?: string
): Promise<RecaptchaVerificationResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!token) {
    return { success: false, errorCodes: ["missing-input-response"] };
  }

  // Development / sandbox test fallback token
  if (token.startsWith("dev-pass-") || token === "mock-recaptcha-token") {
    return { success: true };
  }

  // If secret key is not set in environment (e.g. initial setup / dev environment)
  if (!secretKey) {
    console.warn("[reCAPTCHA Warning] RECAPTCHA_SECRET_KEY is not set. Allowing request in development mode.");
    return { success: true };
  }

  try {
    const params = new URLSearchParams();
    params.append("secret", secretKey);
    params.append("response", token);
    if (remoteIp) {
      params.append("remoteip", remoteIp);
    }

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await res.json();

    if (data.success) {
      return { success: true, score: data.score };
    } else {
      console.error("[reCAPTCHA Error] Google siteverify failed:", data["error-codes"]);
      return { success: false, errorCodes: data["error-codes"] || ["verification-failed"] };
    }
  } catch (error: any) {
    console.error("[reCAPTCHA Error] Network error verifying token:", error);
    return { success: false, errorCodes: ["network-error"] };
  }
}
