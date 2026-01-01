# Brian's Tech Corner — Next.js Blog

![CI](https://github.com/Brians-Tech-Corner/blog/actions/workflows/ci.yml/badge.svg)
![Deployment](https://img.shields.io/badge/deployed%20on-Vercel-black)
[![codecov](https://codecov.io/gh/Brians-Tech-Corner/blog/branch/main/graph/badge.svg)](https://codecov.io/gh/Brians-Tech-Corner/blog)

A developer-first blog for **brianstechcorner.com** using:

- Next.js 16 (App Router) + TypeScript
- React 19
- Tailwind CSS + typography
- MDX blog posts in `content/blog`
- Prism highlighting via `rehype-prism-plus`
- RSS + sitemap + robots
- GitHub Actions CI/CD
- Vercel preview deployments

## Quick Reference

| Command | Description |
|---------|-------------|
| `make dev` | Start development server |
| `make test` | Run all tests |
| `make lint` | Run linter |
| `make check-all` | Run all checks before commit |
| `make help` | See all available commands |

## Prereqs

- Node.js 24+ (LTS)
- pnpm (`corepack enable`)
- make (usually pre-installed on Linux/macOS)

## Setup

```bash
corepack enable
pnpm install
cp .env.example .env.local
pnpm dev
```

Open http://localhost:3000

### Using Make

A Makefile is provided for convenience:

```bash
# See all available commands
make help

# Quick start
make install    # Install dependencies
make dev        # Start development server

# Code quality
make lint       # Run ESLint
make typecheck  # Run TypeScript checks
make test       # Run all tests
make check-all  # Run all checks (lint, typecheck, test, validate)
```

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
  - Shown as the post hero image, blog card thumbnail, and OG preview when provided
- `series` (optional, series identifier like "kubernetes-homelab")
- `seriesOrder` (optional, position in series: 1, 2, 3, etc.)

Example:

```mdx
---
title: "Setting Up a Kubernetes Homelab"
date: "2025-12-15"
description: "A complete guide to running K3s on Raspberry Pi"
tags: ["kubernetes", "homelab", "raspberry-pi"]
draft: false
image: "/images/k8s-homelab.png"
series: "kubernetes-homelab"
seriesOrder: 1
---

Your content here...
```

### Image Guidelines

- Recommended size: 1600×900 (or 1200×675 minimum)
- Aspect ratio: 16:9 (works well for both hero and card thumbnails)
- Format: Prefer WebP (smaller) or optimized JPEG
- Location: place files in `public/post-images/`
- Naming: lowercase, hyphenated, no spaces — e.g. `2025-12-14-welcome.webp`
- Frontmatter example:

```yaml
image: "/post-images/2025-12-14-welcome.webp"
```

Notes:
- Images are optional. If omitted, posts render cleanly without them.
- If `image` is set, that single image is used in three places: as the hero (post page), as the thumbnail (card), and as the OpenGraph (OG) image for social sharing. Setting `image` disables dynamic OG image generation for that post and uses the provided static image instead.


### Social Sharing (OpenGraph Images)

Every post automatically gets a dynamic OpenGraph (OG) image for social media sharing (Twitter, LinkedIn, Discord, etc.). The image is generated on-demand with:
- Your post title
- Post description (if provided)
- Branded "Brian's Tech Corner" design
- Standard 1200x630 social sharing size

**Automatic OG Images:**
By default, posts use dynamically generated images based on the title and description:
```
/api/og?title=Your Post Title&description=Your description
```

**Custom OG Images:**
To use a custom image instead, add the `image` field to frontmatter:
```yaml
---
title: "My Post"
date: "2025-12-15"
image: "/images/custom-og.png"  # Use this instead of dynamic
---
```

**Testing OG Images:**
- **Locally:** Visit `http://localhost:3000/api/og?title=Test`
- **Production:** Use social media card validators:
  - Twitter: https://cards-dev.twitter.com/validator
  - LinkedIn: https://www.linkedin.com/post-inspector/
  - Facebook: https://developers.facebook.com/tools/debug/

## Testing

This project uses [Vitest](https://vitest.dev/) for unit and component testing with [Codecov](https://codecov.io) for coverage tracking.

```bash
# Run tests once
make test
# or
pnpm test

# Watch mode (re-runs on changes)
make test-watch
# or
pnpm test:watch

# Test UI
make test-ui
# or
pnpm test:ui

# Coverage report
make test-coverage
# or
pnpm test:coverage
```

**Coverage:** Open `coverage/index.html` after running coverage to see detailed reports.

Tests are co-located with the code (`*.test.tsx`). See [docs/TESTING.md](docs/TESTING.md) for testing guide and [docs/CODECOV.md](docs/CODECOV.md) for coverage setup.

## Features

### Code Copy Button
All code blocks include a copy-to-clipboard button:
- Hover over any code block to reveal the copy button
- Click to copy the code to your clipboard
- Visual feedback with "Copied!" confirmation
- Automatically reverts after 2 seconds
- Works in both light and dark themes
- Optional filename badges (use `CodeBlock` component directly with `filename` prop)

### Mermaid Diagrams
Create diagrams using Mermaid syntax for architecture, flows, sequences, and more:

```jsx
<Mermaid>
{`graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action]
    B -->|No| D[Alternative]`}
</Mermaid>
```

**Supported diagram types:**
- **Flowcharts** (`graph TD`, `graph LR`) - Process flows and decision trees
- **Sequence diagrams** (`sequenceDiagram`) - API calls and interactions
- **State diagrams** (`stateDiagram-v2`) - State machines and lifecycles
- **Network diagrams** - Visualize network architecture and VLAN setups
- **Class diagrams**, **ER diagrams**, and more - See [Mermaid docs](https://mermaid.js.org/)

**Example use cases:**
- Kubernetes architecture diagrams
- Network topology and VLAN configurations
- CI/CD pipelines
- Application flow and request sequences
- Database schemas

See the [showcase post](http://localhost:3000/blog/9999-12-31-showcase-features) (dev mode) for live examples.

### Series Posts
Group related posts into a series with automatic navigation:
- Set `series: "your-series-name"` and `seriesOrder: 1` in frontmatter
- Posts in a series display a navigation component at the bottom
- Previous/Next links for easy sequential reading
- Series overview showing all parts
- "Part X" badge on post cards

### Comments (Giscus)
GitHub Discussions-powered commenting system:
- Readers comment using GitHub accounts
- Automatically matches light/dark theme
- Comments stored in your repo's Discussions

**Setup:**
1. Enable GitHub Discussions on your repository
2. Install [Giscus app](https://github.com/apps/giscus) for your repo
3. Visit https://giscus.app and configure:
   - Enter your repository (e.g., `username/repo`)
   - Choose Discussion category (e.g., "General" or "Announcements")
   - Copy the generated values
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GISCUS_REPO=username/repo
   NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxx
   NEXT_PUBLIC_GISCUS_CATEGORY=General
   NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxx
   ```
5. Comments will automatically appear at the bottom of all blog posts

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
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SITE_URL` = `https://brianstechcorner.com` (or your domain)
   - `NEXT_PUBLIC_GISCUS_REPO` = your repo (e.g., `username/repo`)
   - `NEXT_PUBLIC_GISCUS_REPO_ID` = from giscus.app
   - `NEXT_PUBLIC_GISCUS_CATEGORY` = your discussion category
   - `NEXT_PUBLIC_GISCUS_CATEGORY_ID` = from giscus.app
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

## 🚀 Deployment Workflow

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

## 🔒 Branch Protection

GitHub → Settings → Branches → Add rule for `main`:
- ✅ Require pull request before merging
- ✅ Require status checks: `Lint & Type Check`, `Build`, `Content Checks`, `vercel`
- ✅ Require conversation resolution before merging
- This prevents accidental direct pushes to production

## 🚀 Ready to Launch?

Follow the [PRE-LAUNCH.md](PRE-LAUNCH.md) checklist to ensure everything is ready:
- [ ] Icons generated
- [ ] Social media links updated
- [ ] Environment variables set
- [ ] Content reviewed
- [ ] Tested on multiple devices
