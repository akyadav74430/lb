const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Simple ICO generator that bundles PNG buffers into standard ICO format
function createIco(pngBuffers) {
  const numImages = pngBuffers.length;
  // Header: 2 bytes reserved (0), 2 bytes type (1 for ICO), 2 bytes count
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(numImages, 4);

  let offset = 6 + (16 * numImages);
  const entries = [];
  const imageBuffers = [];

  for (const item of pngBuffers) {
    const { width, height, buffer } = item;
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // Color palette: 0 = no palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset of image data

    entries.push(entry);
    imageBuffers.push(buffer);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...entries, ...imageBuffers]);
}

async function run() {
  const rootDir = path.resolve(__dirname, '..');
  const logoJpegPath = path.join(rootDir, 'public', 'images', 'Logo.jpeg');

  if (!fs.existsSync(logoJpegPath)) {
    console.error('Logo.jpeg not found at:', logoJpegPath);
    process.exit(1);
  }

  console.log('Generating branding assets from:', logoJpegPath);

  // 1. Generate 512x512 master square emblem from upper silhouette (focus on glowing neon portrait)
  const emblemBuffer = await sharp(logoJpegPath)
    .extract({ left: 0, top: 120, width: 726, height: 726 })
    .resize(512, 512, { fit: 'cover' })
    .png({ quality: 100 })
    .toBuffer();

  const emblemPath = path.join(rootDir, 'public', 'images', 'logo-emblem.png');
  fs.writeFileSync(emblemPath, emblemBuffer);
  console.log('Created logo-emblem.png');

  // 2. Generate Favicon sizes (Ensure 32-bit RGBA for Next.js Turbopack / Rust image decoder)
  const sizes = [16, 32, 48];
  const pngBuffers = [];
  for (const size of sizes) {
    const buf = await sharp(emblemBuffer)
      .ensureAlpha()
      .resize(size, size)
      .png({ colourType: 6 }) // colourType 6 = RGBA (32-bit with alpha)
      .toBuffer();
    pngBuffers.push({ width: size, height: size, buffer: buf });
  }

  const icoBuffer = createIco(pngBuffers);
  fs.writeFileSync(path.join(rootDir, 'app', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon.ico'), icoBuffer);
  console.log('Created app/favicon.ico and public/favicon.ico');

  // 3. Generate icon.png (32x32 & 512x512) and apple-icon.png (180x180)
  const icon32Buffer = await sharp(emblemBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(rootDir, 'app', 'icon.png'), icon32Buffer);
  fs.writeFileSync(path.join(rootDir, 'public', 'icon.png'), icon32Buffer);

  const icon192Buffer = await sharp(emblemBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(rootDir, 'public', 'icon-192.png'), icon192Buffer);

  const icon512Buffer = await sharp(emblemBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(rootDir, 'public', 'icon-512.png'), icon512Buffer);

  const appleIconBuffer = await sharp(emblemBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(rootDir, 'app', 'apple-icon.png'), appleIconBuffer);
  fs.writeFileSync(path.join(rootDir, 'public', 'apple-icon.png'), appleIconBuffer);
  console.log('Created icon.png, icon-192.png, icon-512.png, apple-icon.png');

  // 4. Generate optimized full portrait master in public/images/logo.png
  await sharp(logoJpegPath)
    .png({ quality: 95 })
    .toFile(path.join(rootDir, 'public', 'images', 'logo.png'));
  console.log('Created public/images/logo.png');

  // 5. Generate high-res horizontal logo lockup
  // Convert emblem to base64 data URI to embed into SVG cleanly
  const emblemBase64 = `data:image/png;base64,${emblemBuffer.toString('base64')}`;
  
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 56" fill="none" width="260" height="56">
  <defs>
    <filter id="lb-neon-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <linearGradient id="lb-text-glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff3366" />
      <stop offset="60%" stop-color="#ff4d79" />
      <stop offset="100%" stop-color="#ff8099" />
    </linearGradient>
    <clipPath id="emblem-rounded">
      <rect x="6" y="4" width="48" height="48" rx="12" />
    </clipPath>
  </defs>

  <!-- Glowing Emblem Badge -->
  <g class="lb-emblem-group">
    <!-- Glow aura -->
    <rect x="4" y="2" width="52" height="52" rx="14" fill="#ff1a53" opacity="0.3" filter="url(#lb-neon-glow)" />
    <!-- Outer border -->
    <rect x="5" y="3" width="50" height="50" rx="13" stroke="#ff3366" stroke-width="1.5" fill="#0d0d11" />
    <!-- Embedded neon emblem -->
    <image href="${emblemBase64}" x="6" y="4" width="48" height="48" preserveAspectRatio="xMidYMid slice" clip-path="url(#emblem-rounded)" />
  </g>

  <!-- Wordmark: lovebite.com -->
  <g transform="translate(66, 38)">
    <!-- "love" -->
    <text
      x="0"
      y="0"
      font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      font-size="28"
      font-weight="900"
      font-style="italic"
      letter-spacing="-0.5px"
      fill="url(#lb-text-glow)"
      filter="url(#lb-neon-glow)"
    >love</text>
    
    <!-- "bite" -->
    <text
      x="62"
      y="0"
      font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      font-size="28"
      font-weight="900"
      letter-spacing="-0.5px"
      fill="#ffffff"
      class="lb-word-bite"
    >bite</text>

    <!-- ".com" -->
    <text
      x="115"
      y="0"
      font-family="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      font-size="16"
      font-weight="700"
      fill="#ff4d79"
    >.com</text>
  </g>
</svg>`;

  fs.writeFileSync(path.join(rootDir, 'public', 'images', 'logo.svg'), svgContent);
  console.log('Created updated public/images/logo.svg');

  // Also render horizontal PNG for fallback
  await sharp(Buffer.from(svgContent))
    .resize(520, 112)
    .png()
    .toFile(path.join(rootDir, 'public', 'images', 'logo-horizontal.png'));
  console.log('Created public/images/logo-horizontal.png');

  console.log('All branding assets generated successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
