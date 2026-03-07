# Brian's Tech Corner

A technical blog covering platform engineering, AI agents, infrastructure, and open source.

**Live:** https://www.brianstechcorner.com  
**Built with:** Next.js, TypeScript, MDX, Tailwind CSS

---

## About

This is the source code for Brian's Tech Corner — a blog for platform engineers, staff-level ICs, and technical leaders. Posts cover:

- **Platform Engineering** — Internal developer platforms, developer experience, IDP at scale
- **AI & Agents** — OpenClaw, Greybeard, AI-assisted development workflows
- **Infrastructure** — Kubernetes, Terraform, DevOps, SRE
- **Open Source** — Building and maintaining tools

---

## Running Locally

### Prerequisites
- Node.js 18+ (v22 recommended)
- npm or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/Brians-Tech-Corner/blog.git
cd blog

# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env.local

# (Optional) Configure Beehiiv newsletter
# Edit .env.local and add your Beehiiv URL:
# NEXT_PUBLIC_BEEHIIV_URL=https://yourname.beehiiv.com

# Start development server
pnpm dev

# Open browser
# http://localhost:3000
```

### Environment Variables

See `.env.example` for all available options:

```bash
# Newsletter (Beehiiv)
NEXT_PUBLIC_BEEHIIV_URL=https://yourname.beehiiv.com

# Site URL (for RSS, sitemaps, OG images)
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # dev
NEXT_PUBLIC_SITE_URL=https://brianstechcorner.com  # production

# Analytics (Google Analytics 4)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Comments (Giscus + GitHub Discussions)
NEXT_PUBLIC_GISCUS_REPO=owner/repo
NEXT_PUBLIC_GISCUS_REPO_ID=R_xxx
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxx
```

---

## Project Structure

```
.
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout (header, footer, theme)
│   ├── page.tsx             # Homepage
│   └── blog/
│       └── [slug]/page.tsx  # Blog post pages
├── components/              # React components
│   ├── HomeHero.tsx         # Homepage hero section
│   ├── SubscribeCTA.tsx     # Newsletter signup
│   ├── SponsorshipCTA.tsx   # Sponsorship block
│   ├── TableOfContents.tsx  # Post TOC
│   ├── SeriesNavigation.tsx # Series navigation
│   ├── RelatedPosts.tsx     # Related post cards
│   └── ...
├── content/blog/            # MDX blog posts
│   └── YYYY-MM-DD-title.mdx
├── lib/                     # Utilities
│   ├── posts.ts            # Post metadata + compilation
│   ├── formatDate.ts       # Date formatting
│   └── json-ld.ts          # Structured data
├── public/                  # Static assets
│   ├── post-images/        # Hero images + screenshots
│   └── ...
├── .env.example            # Environment variables template
└── MONETIZATION_SETUP.md   # Monetization configuration guide
```

---

## Writing Posts

### Create a New Post

1. **Create file:** `content/blog/YYYY-MM-DD-slug.mdx`

2. **Add frontmatter:**

```mdx
---
title: "Post Title"
date: "2026-03-07"
description: "Brief description for preview and SEO"
tags: ["platform-engineering", "kubernetes"]
image: "/post-images/post-hero.jpg"  # (optional)
series: "my-series"                   # (optional, for multi-part posts)
seriesOrder: 1                        # (optional)
draft: false                          # (optional, default: false)
---

## Section

Your content here...
```

3. **Use MDX features:**

```mdx
# Headings

**Bold** *italic* `code`

[Link text](https://example.com)

![Alt text](/path/to/image.jpg)

> Blockquotes

```bash
# Code blocks with syntax highlighting
echo "hello"
```

<Callout type="info">
Info callout — info, warning, error, success
</Callout>

<Mermaid>
{`graph TD
    A[Start] --> B[End]`}
</Mermaid>
```

### Post Metadata

| Field | Required | Purpose |
|-------|----------|---------|
| `title` | ✓ | Post title (used in HTML title, OG) |
| `date` | ✓ | Publication date (ISO format) |
| `description` | ✓ | SEO + preview text |
| `tags` | ✓ | Categorization + filtering |
| `image` | | Hero image (OG card, social share) |
| `series` | | Series name (for multi-part posts) |
| `seriesOrder` | | Position in series |
| `draft` | | Hide from production (dev-only) |

### Draft Posts

Posts with `draft: true` will:
- ✅ Show in dev mode (`pnpm dev`)
- ❌ NOT show in production builds
- ❌ NOT appear in post lists

Use drafts for work-in-progress posts before publishing.

---

## Development

### Build Commands

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Preview production build locally
pnpm build
pnpm start

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Testing
pnpm test
```

### Project Stack

- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** MDX (Markdown + JSX)
- **Analytics:** Vercel Analytics + Google Analytics 4
- **Comments:** Giscus (GitHub Discussions)
- **Newsletter:** Beehiiv
- **Deployment:** Vercel

---

## Monetization

The blog includes infrastructure for:

1. **Email Newsletter** — Beehiiv integration (sign up on homepage + posts)
2. **Sponsorships** — Companies can sponsor featured posts ($1.5-5k per post)
3. **Affiliates** — Natural links to tools mentioned (passive income)

See `MONETIZATION_SETUP.md` for configuration details.

---

## Deployment

### Deploy to Vercel

This repo is configured for automatic deployment to Vercel.

1. **Connect to Vercel:**
   - Import repo at https://vercel.com/new
   - Select Brians-Tech-Corner/blog

2. **Set environment variables:**
   - Go to Settings → Environment Variables
   - Add all variables from `.env.example`

3. **Deploy:**
   - Automatic on every push to `main`
   - Or manually trigger from Vercel dashboard

### Custom Domain

Domain is configured in Vercel dashboard: `brianstechcorner.com`

---

## Contributing

### Fixing Typos or Issues

1. Fork the repository
2. Create a branch: `git checkout -b fix/typo-in-post-title`
3. Make changes
4. Commit: `git commit -am "fix: correct typo in X post"`
5. Push: `git push origin fix/typo-in-post-title`
6. Create a Pull Request

### Contributing Posts

For guest posts or corrections, please open an issue first to discuss.

### Code of Conduct

Be respectful. We're all here to learn and share knowledge.

---

## License

### Content
Blog posts in `/content/blog/` are **All Rights Reserved**.  
You may not republish, distribute, or reproduce without permission.

### Code
Code in `/app`, `/components`, `/lib` is licensed under the **MIT License**.  
You're free to use, modify, and distribute for any purpose (including commercial).

See `LICENSE` file for details.

```
MIT License

Copyright (c) 2024-2026 Brian

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## Quick Links

- **Site:** https://www.brianstechcorner.com
- **GitHub:** https://github.com/Brians-Tech-Corner/blog
- **Newsletter:** https://brianstechcorner.beehiiv.com
- **Author:** https://github.com/btotharye

---

## Questions?

- **Setup issues?** Check `.env.example` and `MONETIZATION_SETUP.md`
- **MDX syntax?** See components in `components/` directory
- **Deployment?** See Vercel docs at https://vercel.com/docs

---

Built with ❤️ for engineers who ship.
