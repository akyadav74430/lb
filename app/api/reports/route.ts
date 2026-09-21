import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { reportSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await auth();
  const clientIp = getClientIp(request);

  // Rate limit: 5 reports per hour per IP / user
  const rateKey = `report_${session?.user?.id || "anon"}_${clientIp}`;
  const rate = checkRateLimit(rateKey, 5, 60 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many reports submitted. Please wait before submitting another report." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = reportSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { profileId, category, description } = parsed.data;

  // Verify that the profile exists
  const profile = await prisma.profile.findUnique({
    where: { id: profileId },
    select: { id: true, userId: true },
  });

  if (!profile) {
    return NextResponse.json({ error: "Reported profile not found" }, { status: 404 });
  }

  // Prevent users from reporting their own profile
  if (session?.user?.id && profile.userId === session.user.id) {
    return NextResponse.json({ error: "You cannot report your own profile" }, { status: 400 });
  }

  // Create report record
  const report = await prisma.report.create({
    data: {
      profileId,
      reporterId: session?.user?.id || null,
      category,
      description,
      ipAddress: clientIp,
      status: "PENDING",
    },
  });

  // Log audit event
  try {
    await prisma.auditLog.create({
      data: {
        userId: session?.user?.id || null,
        action: "REPORT_SUBMITTED",
        details: `Report #${report.id} filed against profile ${profileId} for category: ${category}`,
        ipAddress: clientIp,
      },
    });
  } catch {
    // ignore
  }

  return NextResponse.json(
    { success: true, message: "Thank you. Your report has been securely submitted to our trust & safety moderation team." },
    { status: 201 }
  );
}
