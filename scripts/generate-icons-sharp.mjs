#!/usr/bin/env node

/**
 * Icon Generator using Sharp
 * 
 * This script generates all required icons from your logo using Sharp.
 * 
 * Install: pnpm add -D sharp
 * Usage: node scripts/generate-icons-sharp.mjs
 */

import sharp from 'sharp';
import { join } from 'path';

const LOGO_PATH = 'public/brand/BTC-Logo--Blue.jpg';
const OUTPUT_DIR = 'public';

const sizes = [
  { name: 'favicon.ico', size: 32, format: 'png' }, // Will be renamed to .ico
  { name: 'icon-192.png', size: 192, format: 'png' },
  { name: 'icon-512.png', size: 512, format: 'png' },
  { name: 'apple-icon.png', size: 180, format: 'png' },
];

async function generateIcons() {
  console.log('🎨 Generating icons from', LOGO_PATH);
  console.log('');

  try {
    for (const config of sizes) {
      const outputPath = join(OUTPUT_DIR, config.name);
      
      await sharp(LOGO_PATH)
        .resize(config.size, config.size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✓ Generated ${config.name} (${config.size}x${config.size})`);
    }
    
    console.log('');
    console.log('✅ All icons generated successfully!');
    console.log('');
    console.log('Run `pnpm validate` to verify.');
  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    console.log('');
    console.log('Make sure sharp is installed: pnpm add -D sharp');
    process.exit(1);
  }
}

generateIcons();
