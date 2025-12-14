# Icon & Favicon Generation Guide

Your blog needs the following icons in the `/public` directory. You have the BTC logo files in `/public/brand/` — use these to generate the required sizes.

## Required Icons

### Favicon
- **favicon.ico** (32x32 px) - The classic browser tab icon
- Location: `/public/favicon.ico`

### Web App Icons
- **icon-192.png** (192x192 px) - Android home screen, small
- **icon-512.png** (512x512 px) - Android home screen, large
- **apple-icon.png** (180x180 px) - iOS home screen icon
- Location: `/public/`

## How to Generate Icons

### Option 1: Online Tool (Easiest)
Use [favicon.io](https://favicon.io/) or [RealFaviconGenerator](https://realfavicongenerator.net/)

1. Upload your logo: `/public/brand/BTC-Logo--Blue.jpg`
2. Download the generated package
3. Extract and place files in `/public/`

### Option 2: Using ImageMagick (Command Line)

If you have ImageMagick installed:

```bash
cd public/brand

# Generate 192x192 icon
convert BTC-Logo--Blue.jpg -resize 192x192 -background white -gravity center -extent 192x192 ../icon-192.png

# Generate 512x512 icon
convert BTC-Logo--Blue.jpg -resize 512x512 -background white -gravity center -extent 512x512 ../icon-512.png

# Generate Apple icon (180x180)
convert BTC-Logo--Blue.jpg -resize 180x180 -background white -gravity center -extent 180x180 ../apple-icon.png

# Generate favicon (32x32)
convert BTC-Logo--Blue.jpg -resize 32x32 -background white -gravity center -extent 32x32 ../favicon.ico
```

### Option 3: Using Sharp (Node.js)

Create a script `scripts/generate-icons.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');

const inputFile = './public/brand/BTC-Logo--Blue.jpg';
const sizes = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 180, name: 'apple-icon.png' },
  { size: 32, name: 'favicon.ico' },
];

async function generateIcons() {
  for (const { size, name } of sizes) {
    await sharp(inputFile)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFile(`./public/${name}`);
    console.log(`✓ Generated ${name}`);
  }
}

generateIcons().catch(console.error);
```

Install and run:
```bash
pnpm add -D sharp
node scripts/generate-icons.js
```

## Icon Design Tips

### Best Practices
- **Simple & Recognizable**: Icons are small, so keep the design simple
- **Square Format**: Always use square images (1:1 aspect ratio)
- **Padding**: Add 10-20% padding around your logo for breathing room
- **Background**: Use solid white or transparent background
- **Colors**: Make sure your logo is visible on both light and dark backgrounds

### What to Use
Since you have:
- `BTC-Logo--Blue.jpg` - Blue version (recommended for icons)
- `BTC-Logo--Black.jpg` - Black version (alternative)

**Recommendation**: Use the **Blue version** (`BTC-Logo--Blue.jpg`) for icons as it:
- Matches your brand colors
- Stands out better on various backgrounds
- Looks professional and modern

## Verification Checklist

After generating icons, verify they exist:

```bash
ls -lh public/*.{png,ico}
```

You should see:
```
-rw-r--r-- apple-icon.png    (180x180)
-rw-r--r-- favicon.ico        (32x32)
-rw-r--r-- icon-192.png       (192x192)
-rw-r--r-- icon-512.png       (512x512)
```

## Test Your Icons

### Local Testing
1. Run `pnpm dev`
2. Open http://localhost:3000
3. Check the browser tab for favicon
4. Open DevTools → Application → Manifest to verify PWA icons

### After Deployment
1. Open your site in different browsers
2. Try adding to home screen on mobile
3. Check tab icons across browsers

## Alternative: Use SVG

If your logo is available as SVG, you can also use:

```typescript
// In app/layout.tsx
icons: {
  icon: [
    { url: '/icon.svg', type: 'image/svg+xml' },
    { url: '/favicon.ico', sizes: '32x32' },
  ],
}
```

SVG icons are scalable and look sharp at any size!

## Quick Command Reference

```bash
# Check what you have
ls public/brand/

# Create icons directory
mkdir -p public/icons

# Verify generated icons
file public/*.png public/*.ico

# Test image dimensions
identify public/icon-*.png
```

## Need Help?

If you get stuck, these services can help:
- [favicon.io](https://favicon.io/) - Free, no signup
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Comprehensive
- [Squoosh](https://squoosh.app/) - Google's image optimizer
