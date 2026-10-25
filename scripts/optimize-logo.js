const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'public', 'images', 'logo-emblem.png');
const outputDir = path.join(__dirname, '..', 'public', 'images');

async function optimizeLogo() {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  console.log(`Original: ${metadata.width}x${metadata.height}`);

  // Generate sizes for different display sizes
  // Header: 34px, Mobile: 28px, Auth: 52px, Footer: 32px, Compact: 24px
  // We'll generate 2x for retina: 68, 56, 104, 64, 48
  const sizes = [48, 56, 64, 68, 104];

  for (const size of sizes) {
    const webpPath = path.join(outputDir, `logo-emblem-${size}w.webp`);
    const avifPath = path.join(outputDir, `logo-emblem-${size}w.avif`);
    const pngPath = path.join(outputDir, `logo-emblem-${size}w.png`);

    await image
      .clone()
      .resize(size, size, { fit: 'cover', position: 'center' })
      .webp({ quality: 85, effort: 6 })
      .toFile(webpPath);
    console.log(`Created ${webpPath}`);

    await image
      .clone()
      .resize(size, size, { fit: 'cover', position: 'center' })
      .avif({ quality: 70, effort: 9 })
      .toFile(avifPath);
    console.log(`Created ${avifPath}`);

    await image
      .clone()
      .resize(size, size, { fit: 'cover', position: 'center' })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(pngPath);
    console.log(`Created ${pngPath}`);
  }

  // Also create a small 34px version for the header (non-retina fallback)
  await image
    .clone()
    .resize(34, 34, { fit: 'cover', position: 'center' })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(outputDir, 'logo-emblem-34w.png'));
  console.log('Created logo-emblem-34w.png');
}

optimizeLogo().catch(console.error);