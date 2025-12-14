# Brian's Tech Corner — Next.js Blog

![CI](https://github.com/Brians-Tech-Corner/blog/actions/workflows/ci.yml/badge.svg)
![Deployment](https://img.shields.io/badge/deployed%20on-Vercel-black)

A developer-first blog for **brianstechcorner.com** using:

- Next.js 16 (App Router) + TypeScript
- React 19
- Tailwind CSS + typography
- MDX blog posts in `content/blog`
- Prism highlighting via `rehype-prism-plus`
- RSS + sitemap + robots
- GitHub Actions CI/CD
- Vercel preview deployments

## Prereqs

- Node.js 24+ (LTS)
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

## � Deployment Workflow

### Environments
- **Production**: `www.brianstechcorner.com` (auto-deploys from `main` branch)
- **PR Previews**: Auto-generated Vercel preview URLs for every pull request

### Development Workflow
```bash
# Create feature branch
git checkout -b feature/new-post

# Make changes and push
git push origin feature/new-post

# Open PR to main
# → CI runs automatically
# → Vercel creates preview URL (check PR comments)
# → Review preview, get approval
# → Merge to main = deploys to production
```

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

## 🔄 CI/CD & Workflows

### GitHub Actions
Every PR automatically runs:
- ✅ ESLint + TypeScript checks
- ✅ Build validation
- ✅ Content validation (frontmatter, drafts)
- ✅ Dependency security review

### Vercel Deployments
- **Production** (`main` branch): https://www.brianstechcorner.com
- **PR Previews**: Unique URL for each pull request

### Recommended Git Flow

```bash
# Feature development
git checkout -b feature/new-post
# ... make changes ...
git push origin feature/new-post

# Open PR to main → CI runs → Vercel creates preview
# Review preview URL → Get approval → Merge
# → Automatically deploys to www.brianstechcorner.com
```

## 🔒 Branch Protection

GitHub → Settings → Branches → Add rule for `main`:
- ✅ Require pull request before merging
- ✅ Require status checks: `Lint & Type Check`, `Build`, `Content Checks`, `vercel`
- ✅ Require conversation resolution before merging
- This prevents accidental direct pushes to production

## �🚀 Ready to Launch?

Follow the [PRE-LAUNCH.md](PRE-LAUNCH.md) checklist to ensure everything is ready:
- [ ] Icons generated
- [ ] Social media links updated
- [ ] Environment variables set
- [ ] Content reviewed
- [ ] Tested on multiple devices
