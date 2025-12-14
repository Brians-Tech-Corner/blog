# Quick Start: Fixing Remaining Issues

Based on your validation output, here's how to fix the remaining issues:

## 1. Generate Icons (4 missing files)

You have 3 easy options:

### Option A: Using Sharp (Recommended - Automated)

```bash
# Install sharp
pnpm add -D sharp

# Generate all icons automatically
pnpm icons:generate
```

This will create all 4 required icon files from your existing `public/brand/BTC-Logo--Blue.jpg`.

### Option B: Using ImageMagick (Command Line)

```bash
# Install ImageMagick first
# macOS: brew install imagemagick
# Linux: apt-get install imagemagick

# Run this from project root:
convert public/brand/BTC-Logo--Blue.jpg -resize 32x32 -background white -gravity center -extent 32x32 public/favicon.ico
convert public/brand/BTC-Logo--Blue.jpg -resize 192x192 -background white -gravity center -extent 192x192 public/icon-192.png
convert public/brand/BTC-Logo--Blue.jpg -resize 512x512 -background white -gravity center -extent 512x512 public/icon-512.png
convert public/brand/BTC-Logo--Blue.jpg -resize 180x180 -background white -gravity center -extent 180x180 public/apple-icon.png
```

### Option C: Using Online Tool (No Install Required)

1. Go to https://realfavicongenerator.net/
2. Upload `public/brand/BTC-Logo--Blue.jpg`
3. Download the generated package
4. Extract and copy these files to `public/`:
   - `favicon.ico`
   - `icon-192.png` 
   - `icon-512.png`
   - `apple-icon.png` (rename from `apple-touch-icon.png`)

## 2. Update Social Media Links

Edit `components/SiteFooter.tsx` and update the placeholder URLs:

```tsx
const socialLinks = [
  {
    name: "YouTube",
    href: "https://youtube.com/@YOUR_CHANNEL", // Update this
    ...
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/YOUR_HANDLE", // Update this
    ...
  },
  {
    name: "Instagram",
    href: "https://instagram.com/YOUR_HANDLE", // Update this
    ...
  },
  {
    name: "GitHub",
    href: "https://github.com/YOUR_USERNAME", // Update this
    ...
  },
];
```

**Or** if you don't want to show certain social links, simply remove them from the array.

## 3. Verify Everything

After making the changes:

```bash
pnpm validate
```

You should see:
```
✓ Passed: 19
⚠ Warnings: 0
✗ Failed: 0
```

## 4. Test Locally

```bash
pnpm dev
```

Visit http://localhost:3000 and check:
- [ ] Favicon appears in browser tab
- [ ] Footer social links work
- [ ] Everything looks good

## 5. Deploy to Vercel

Once validation passes:

```bash
git add .
git commit -m "Add icons and update social links"
git push
```

Then follow the deployment steps in [DEPLOYMENT.md](DEPLOYMENT.md).

## Need Help?

Run `pnpm icons:help` to see all icon generation options with detailed commands.
