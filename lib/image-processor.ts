import sharp from "sharp";
import crypto from "crypto";

export interface ProcessedImageResult {
  buffer: Buffer;
  mimeType: string;
  extension: string;
  sha256Hash: string;
  width: number;
  height: number;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  detectedMime?: string;
}

/**
 * Validate binary file magic bytes to prevent MIME spoofing & polyglot file attacks
 */
export function validateMagicBytes(buffer: Buffer): ValidationResult {
  if (buffer.length < 12) {
    return { valid: false, error: "File too small or corrupted" };
  }

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, detectedMime: "image/jpeg" };
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { valid: true, detectedMime: "image/png" };
  }

  // WebP: RIFF .... WEBP
  // bytes 0-3: 52 49 46 46 (RIFF)
  // bytes 8-11: 57 45 42 50 (WEBP)
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

  return { valid: false, error: "Unsupported file format. Only real JPEG, PNG, and WebP images are allowed." };
}

/**
 * Calculate SHA-256 fingerprint for duplicate detection
 */
export function calculateSha256(buffer: Buffer): string {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

/**
 * Process image: Strip EXIF metadata, auto-orient, validate dimensions, and re-encode to clean WebP
 */
export async function processAndSanitizeImage(
  inputBuffer: Buffer,
  options?: { maxDimension?: number; minDimension?: number; quality?: number }
): Promise<ProcessedImageResult> {
  const maxDim = options?.maxDimension || 2400;
  const minDim = options?.minDimension || 200;
  const quality = options?.quality || 85;

  // 1. Validate magic bytes
  const magicCheck = validateMagicBytes(inputBuffer);
  if (!magicCheck.valid) {
    throw new Error(magicCheck.error || "Invalid image magic bytes");
  }

  // 2. Load with sharp and inspect dimensions
  const image = sharp(inputBuffer, { failOn: "error" });
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error("Unable to read image dimensions");
  }

  if (metadata.width < minDim || metadata.height < minDim) {
    throw new Error(`Image is too small (${metadata.width}x${metadata.height}px). Minimum required is ${minDim}x${minDim}px.`);
  }

  // 3. Strip all EXIF / GPS / ICC metadata and re-encode to secure WebP
  // Using .rotate() applies orientation from EXIF before stripping metadata
  let pipeline = image.rotate();

  if (metadata.width > maxDim || metadata.height > maxDim) {
    pipeline = pipeline.resize({
      width: metadata.width > metadata.height ? maxDim : undefined,
      height: metadata.height >= metadata.width ? maxDim : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  // Re-encode to clean WebP without any EXIF/GPS tags
  const sanitizedBuffer = await pipeline
    .webp({ quality, effort: 4 })
    .toBuffer();

  const finalMeta = await sharp(sanitizedBuffer).metadata();
  const sha256Hash = calculateSha256(sanitizedBuffer);

  return {
    buffer: sanitizedBuffer,
    mimeType: "image/webp",
    extension: ".webp",
    sha256Hash,
    width: finalMeta.width || metadata.width,
    height: finalMeta.height || metadata.height,
  };
}
