#!/usr/bin/env node

/**
 * Icon Generator Script
 * 
 * This script helps generate favicon and app icons from your logo.
 * 
 * Requirements:
 * - Source image: public/brand/BTC-Logo--Blue.jpg (or your preferred logo)
 * - Install sharp: pnpm add -D sharp
 * 
 * Usage: node scripts/generate-icons.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const LOGO_PATH = 'public/brand/BTC-Logo--Blue.jpg';
const OUTPUT_DIR = 'public';

console.log('🎨 Icon Generator\n');
console.log('To generate icons from your logo, you have two options:\n');

console.log('Option 1: Online Tools (Recommended, easiest)');
console.log('─────────────────────────────────────────────');
console.log('1. Go to https://realfavicongenerator.net/');
console.log(`2. Upload: ${LOGO_PATH}`);
console.log('3. Download the generated package');
console.log('4. Extract these files to public/:');
console.log('   - favicon.ico');
console.log('   - icon-192.png');
console.log('   - icon-512.png');
console.log('   - apple-icon.png (rename from apple-touch-icon.png)');
console.log('');

console.log('Option 2: Using ImageMagick (Command line)');
console.log('────────────────────────────────────────────');
console.log('Install: brew install imagemagick (macOS) or apt-get install imagemagick (Linux)');
console.log('');
console.log('Then run these commands:');
console.log('');
console.log(`# Favicon (32x32)`);
console.log(`convert ${LOGO_PATH} -resize 32x32 -background white -gravity center -extent 32x32 public/favicon.ico`);
console.log('');
console.log(`# PWA Icon 192x192`);
console.log(`convert ${LOGO_PATH} -resize 192x192 -background white -gravity center -extent 192x192 public/icon-192.png`);
console.log('');
console.log(`# PWA Icon 512x512`);
console.log(`convert ${LOGO_PATH} -resize 512x512 -background white -gravity center -extent 512x512 public/icon-512.png`);
console.log('');
console.log(`# Apple Touch Icon 180x180`);
console.log(`convert ${LOGO_PATH} -resize 180x180 -background white -gravity center -extent 180x180 public/apple-icon.png`);
console.log('');

console.log('Option 3: Using Sharp (Node.js)');
console.log('─────────────────────────────────────');
console.log('1. Install: pnpm add -D sharp');
console.log('2. Run: node scripts/generate-icons-sharp.mjs');
console.log('');

console.log('💡 Tip: For best results, use a square logo with padding.');
console.log('   Your logo at public/brand/BTC-Logo--Blue.jpg will work great!');
