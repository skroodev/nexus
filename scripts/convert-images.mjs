import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './public/images';
const outputDir = './public/images/webp';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all PNG files
const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));

console.log(`Converting ${files.length} PNG files to WebP with optimized compression...`);

for (const file of files) {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file.replace('.png', '.webp'));
  
  try {
    // Resize large images to max 1200px width and compress more aggressively
    await sharp(inputPath)
      .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 65, effort: 6 })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✓ ${file} -> ${file.replace('.png', '.webp')} (${savings}% smaller)`);
  } catch (err) {
    console.error(`✗ Failed to convert ${file}:`, err.message);
  }
}

// Also create optimized logo (60x60 for display)
const logoPath = path.join(inputDir, 'logo-nx-white.png');
if (fs.existsSync(logoPath)) {
  await sharp(logoPath)
    .resize(120, 120) // 2x for retina
    .webp({ quality: 90 })
    .toFile(path.join(outputDir, 'logo-nx-white.webp'));
  console.log('✓ logo-nx-white.png -> logo-nx-white.webp (optimized 120x120)');
}

console.log('\nDone! Update your config.ts to use /images/webp/*.webp paths');
