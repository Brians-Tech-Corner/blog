#!/usr/bin/env node

/**
 * Generate icons from your logo
 * 
 * Requirements: 
 * - Install sharp: pnpm add -D sharp
 * - Have your logo at public/brand/BTC-Logo--Blue.jpg
 * 
 * Usage: node scripts/generate-icons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, '../public/brand/BTC-Logo--Blue.jpg');
const OUTPUT_DIR = path.join(__dirname, '../public');

const icons = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 180, name: 'apple-icon.png' },
  { size: 32, name: 'favicon.png' }, // Will convert to .ico manually or use online tool
];

async function generateIcons() {
  console.log('🎨 Generating icons from', INPUT_FILE);
  
  // Check if input file exists
  if (!fs.existsSync(INPUT_FILE)) {
    console.error('❌ Logo file not found:', INPUT_FILE);
    console.log('Make sure you have BTC-Logo--Blue.jpg in public/brand/');
    process.exit(1);
  }

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Generate each icon size
  for (const { size, name } of icons) {
    const outputPath = path.join(OUTPUT_DIR, name);
    
    try {
      await sharp(INPUT_FILE)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✓ Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${name}:`, error.message);
    }
  }

  console.log('\n✨ Icon generation complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Convert favicon.png to favicon.ico using an online tool:');
  console.log('   → https://favicon.io/favicon-converter/');
  console.log('2. Or keep favicon.png and update app/layout.tsx to use PNG');
  console.log('\n🧪 Test your icons:');
  console.log('   pnpm dev');
  console.log('   Open http://localhost:3000 and check browser tab');
}

// Run the script
generateIcons().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
