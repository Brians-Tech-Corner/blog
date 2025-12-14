# Brian's Tech Corner — Next.js Blog Starter

This is a developer-first blog starter for **brianstechcorner.com** using:

- Next.js (App Router) + TypeScript
- Tailwind CSS + typography
- MDX blog posts in `content/blog`
- Prism highlighting via `rehype-prism-plus`
- RSS + sitemap + robots

## Prereqs

- Node.js 20+
- pnpm (`corepack enable`)

## Setup

```bash
corepack enable
pnpm install
cp .env.example .env.local
pnpm dev
```

Open http://localhost:3000

## Writing posts

Create a new file under `content/blog/`:

- `2025-12-15-my-post.mdx`

Frontmatter fields:

- `title` (required)
- `date` (required, YYYY-MM-DD format)
- `description` (optional, for SEO and preview cards)
- `tags` (optional, array for categorization)
- `draft` (optional, set to `true` to hide from production)
- `image` (optional, path to custom OpenGraph image)

Example:

```mdx
---
title: "Setting Up a Kubernetes Homelab"
date: "2025-12-15"
description: "A complete guide to running K3s on Raspberry Pi"
tags: ["kubernetes", "homelab", "raspberry-pi"]
draft: false
image: "/images/k8s-homelab.png"
---

Your content here...
```

## Features

### Draft Posts
Set `draft: true` in frontmatter to hide posts from production. They'll only show in development.

### Tag Filtering
Tags automatically appear as filters on `/blog`. Click any tag to filter posts.

### SEO & Social
- OpenGraph and Twitter Card metadata automatically generated for each post
- RSS feed at `/rss.xml`
- Sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`

## Deploy to Vercel

1. Push to GitHub
2. Import repository in Vercel
3. Set environment variable in Vercel dashboard:
   - `NEXT_PUBLIC_SITE_URL` = `https://brianstechcorner.com` (or your domain)
4. Deploy!

Vercel will automatically:
- Build the static site
- Generate all MDX pages
- Create RSS and sitemap
- Optimize images

## Assets

Brand images live in `public/brand/`.

## Project Structure

```
app/
  ├── blog/              # Blog listing and posts
  ├── about/             # About page
  └── layout.tsx         # Root layout with header/footer
components/              # Reusable UI components
content/blog/           # MDX blog posts
lib/posts.tsx           # Post fetching and compilation logic
public/                 # Static assets
  ├── brand/           # Logo and banner images
  └── manifest.json    # PWA manifest
scripts/                # Helper scripts
```

## 📚 Additional Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete Vercel deployment guide with troubleshooting
- **[ICONS.md](ICONS.md)** - How to generate favicons and app icons from your logo
- **[PRE-LAUNCH.md](PRE-LAUNCH.md)** - Comprehensive checklist before going live

## 🎨 Icons & Branding

Generate your favicon and app icons:

```bash
# Option 1: Using the provided script
pnpm add -D sharp
node scripts/generate-icons.js

# Option 2: Use an online tool (easiest)
# Upload public/brand/BTC-Logo--Blue.jpg to https://favicon.io/
```

See [ICONS.md](ICONS.md) for detailed instructions.

## 🚀 Ready to Launch?

Follow the [PRE-LAUNCH.md](PRE-LAUNCH.md) checklist to ensure everything is ready:
- [ ] Icons generated
- [ ] Social media links updated
- [ ] Environment variables set
- [ ] Content reviewed
- [ ] Tested on multiple devices
