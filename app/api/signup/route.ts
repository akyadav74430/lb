import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { signUpSchema } from "@/lib/validation";
import { Prisma } from "@/lib/generated/prisma";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Signup] Failed to parse request JSON body:", err);
    }
    return NextResponse.json(
      { error: "Invalid JSON format in request body." },
      { status: 400 }
    );
  }

  // Server-side input validation
  const parsed = signUpSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const firstErrorMessage =
      Object.values(fieldErrors).flat()[0] || "Invalid input provided.";
    return NextResponse.json(
      {
        error: firstErrorMessage,
        errors: fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, password } = parsed.data;

  try {
    // Check if email already exists before attempting insert
    const existing = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        {
          error: "An account with this email already exists. Please sign in.",
          errors: {
            email: ["An account with this email already exists. Please sign in."],
          },
        },
        { status: 409 }
      );
    }

    // Hash password with salt rounds = 12
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    // 1. Handle Prisma Unique Constraint Violation (P2002) - concurrent signup / race condition
    if (
      (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") ||
      (typeof error === "object" && error !== null && (error as { code?: string }).code === "P2002")
    ) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[Signup] Prisma unique constraint violation (P2002) for email: ${email}`);
      }
      return NextResponse.json(
        {
          error: "An account with this email already exists. Please sign in.",
          errors: {
            email: ["An account with this email already exists. Please sign in."],
          },
        },
        { status: 409 }
      );
    }

    // 2. Handle Prisma Client Validation Error (bad data passed to Prisma query)
    if (
      error instanceof Prisma.PrismaClientValidationError ||
      (typeof error === "object" && error !== null && (error as { name?: string }).name === "PrismaClientValidationError")
    ) {
      console.error("[Signup] PrismaClientValidationError during registration:", error);
      return NextResponse.json(
        { error: "Invalid registration parameters provided." },
        { status: 400 }
      );
    }

    // 3. Handle Database Connection / Initialization Failure (P1000, P1001, P1003, etc.)
    if (
      error instanceof Prisma.PrismaClientInitializationError ||
      (typeof error === "object" && error !== null && (error as { name?: string }).name === "PrismaClientInitializationError")
    ) {
      console.error(
        "[Signup] Database connection error during registration:",
        (error as Error).message || error
      );
      return NextResponse.json(
        { error: "Database connection failed. Please check database server status or retry shortly." },
        { status: 500 }
      );
    }

    // 4. Generic Unexpected Server Error - Never leak internal stack traces or credentials to clients
    console.error("[Signup] Unexpected server error during registration:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while creating your account. Please try again." },
      { status: 500 }
    );
  }
}
