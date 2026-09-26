import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { randomUUID } from "crypto";
import { processAndSanitizeImage } from "@/lib/image-processor";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/security";
import { uploadImage } from "@/lib/supabase-storage";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limiting: 30 uploads per hour per user/IP
  const clientIp = getClientIp(request);
  const rateKey = `upload_${session.user.id}_${clientIp}`;
  const rate = checkRateLimit(rateKey, 30, 60 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Upload rate limit exceeded. Please wait before uploading more photos." },
      { status: 429 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (err) {
    console.error("Failed to parse form data:", err);
    return NextResponse.json({ error: "Failed to parse upload" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const maxSize = 8 * 1024 * 1024; // 8MB raw limit
  if (file.size > maxSize) {
    return NextResponse.json({ error: "File too large (max 8MB before compression)" }, { status: 400 });
  }

  try {
    const rawBuffer = Buffer.from(await file.arrayBuffer());

    // Run secure image pipeline: Magic bytes -> EXIF stripping -> WebP re-encoding -> SHA-256
    const processed = await processAndSanitizeImage(rawBuffer, {
      maxDimension: 2400,
      minDimension: 200,
      quality: 85,
    });

    // Convert processed buffer back to File for upload
    const processedFile = new File([new Uint8Array(processed.buffer)], `${randomUUID()}${processed.extension}`, {
      type: processed.mimeType,
    });

    const { url } = await uploadImage(processedFile, "profiles");

    return NextResponse.json({
      url,
      sha256: processed.sha256Hash,
      width: processed.width,
      height: processed.height,
      mimeType: processed.mimeType,
    });
  } catch (err: unknown) {
    console.error("Image processing error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to process image" },
      { status: 400 }
    );
  }
}