import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/validation";
import { sendContactEmail } from "@/lib/mail";
import { verifyRecaptchaToken } from "@/lib/recaptcha";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    // 1. Extract IP for rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";

    // 2. Rate limiting check (max 5 submissions per 10 minutes per IP)
    const rateLimit = checkRateLimit(ip, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    // 3. Parse and validate payload
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed.";
      return NextResponse.json(
        {
          success: false,
          message: firstError,
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, message, recaptchaToken } = parsed.data;

    // 4. Verify reCAPTCHA token
    const recaptchaResult = await verifyRecaptchaToken(recaptchaToken, ip);
    if (!recaptchaResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete the reCAPTCHA verification",
          errorCodes: recaptchaResult.errorCodes,
        },
        { status: 400 }
      );
    }

    // 5. Send email to support (neha38982425@gmail.com)
    const emailResult = await sendContactEmail({
      name,
      email,
      message,
    });

    // 6. Record submission in database for audit and status tracking
    try {
      await prisma.contactMessage.create({
        data: {
          name,
          email,
          message,
          ipAddress: ip,
          status: emailResult.success ? "SENT" : "FAILED",
        },
      });
    } catch (dbError) {
      console.error("[Database Warning] Failed to log contact message to DB:", dbError);
    }

    // 7. Check email result
    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to send your message. Please try again later.",
        },
        { status: 500 }
      );
    }

    // 8. Return successful response
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to send your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
