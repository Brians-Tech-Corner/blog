# Copilot Instructions for Brian's Tech Corner Blog

## Project Overview

This is a developer-first blog built with:
- **Next.js 16** (App Router) + **TypeScript**
- **React 19**
- **Tailwind CSS** with typography plugin
- **MDX** for blog posts in `content/blog/`
- **Vitest** for testing with co-located test files
- **pnpm** as the package manager (required)
- **Make** for command shortcuts

## Architecture & Structure

```
app/                 # Next.js App Router pages
  ├── blog/         # Blog listing and individual posts
  ├── about/        # About page
  └── layout.tsx    # Root layout with header/footer
components/         # Reusable React components
content/blog/       # MDX blog posts with frontmatter
lib/                # Utilities (e.g., posts.tsx for MDX processing)
public/             # Static assets (images, brand assets)
scripts/            # Helper scripts (validation, icon generation)
```

## Development Commands

Always use the Makefile commands or pnpm scripts:

```bash
make dev          # Start development server (pnpm dev)
make build        # Production build (pnpm build)
make lint         # Run ESLint (pnpm lint)
make typecheck    # TypeScript type checking (pnpm typecheck)
make test         # Run all tests (pnpm test)
make test-watch   # Tests in watch mode (pnpm test:watch)
make validate     # Validate blog post frontmatter (pnpm validate)
make check-all    # Run all checks before commit
```

## Coding Standards

### TypeScript
- Use **strict mode** (enabled in tsconfig.json)
- Define explicit types; avoid `any`
- Use `@/*` path alias for imports (e.g., `import { getPosts } from '@/lib/posts'`)
- Server components by default; use `'use client'` directive only when needed

### React Components
- Prefer **React Server Components** (default in Next.js App Router)
- Use Client Components (`'use client'`) only for:
  - Interactive elements (onClick, useState, useEffect)
  - Browser APIs (window, localStorage)
  - Third-party libraries requiring client-side JS
- Use functional components with TypeScript interfaces for props
- Co-locate components with their styles and tests

### Styling
- Use **Tailwind CSS** utility classes
- Follow existing component patterns for consistency
- Use `@tailwindcss/typography` prose classes for MDX content
- Keep custom CSS in `app/globals.css` minimal

### File Naming
- Components: PascalCase (e.g., `PostCard.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Tests: Same name as file with `.test.tsx` suffix (e.g., `PostCard.test.tsx`)
- MDX posts: kebab-case with date prefix (e.g., `2025-12-15-my-post.mdx`)

## Testing Guidelines

### Test Framework: Vitest
- Tests are **co-located** with source files (e.g., `posts.test.tsx` next to `posts.tsx`)
- Use `@testing-library/react` for component tests
- Run `make test` before committing
- Aim for meaningful test coverage, not 100% coverage

### Writing Tests
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName prop="value" />);
    expect(screen.getByText('value')).toBeInTheDocument();
  });
});
```

### Test Best Practices
- Test behavior, not implementation details
- Use descriptive test names that explain what is being tested
- Mock external dependencies (file system, APIs)
- Keep tests simple and focused on one thing

## MDX Blog Posts

### Frontmatter Schema
All posts in `content/blog/` must include:
```yaml
---
title: "Post Title"           # Required
date: "YYYY-MM-DD"            # Required
description: "SEO description" # Optional but recommended
tags: ["tag1", "tag2"]        # Optional
draft: false                  # Optional (true hides from production)
image: "/images/custom.png"   # Optional OpenGraph image
---
```

### Post Naming Convention
- Format: `YYYY-MM-DD-slug.mdx`
- Example: `2025-12-15-kubernetes-homelab.mdx`
- Use lowercase and hyphens for slugs

### Content Validation
- Run `make validate` to check frontmatter integrity
- Validation runs automatically in CI on every PR

## Git Workflow

### Branch Protection
- Main branch requires PR approval
- All CI checks must pass (lint, typecheck, build, tests)
- Conversation must be resolved before merging

### Before Committing
```bash
make check-all  # Runs lint, typecheck, test, and validate
```

### Pull Request Process
1. Create feature branch from `main`
2. Make changes and commit with descriptive messages
3. Push and open PR
4. CI automatically runs checks
5. Vercel creates preview deployment (check PR comments)
6. Request review and merge when approved

## CI/CD Pipeline

### GitHub Actions
Every PR automatically runs:
- ESLint and TypeScript checks
- Build validation
- Vitest tests with coverage
- Content validation (frontmatter checks)
- Dependency security review

### Vercel Deployments
- **Production**: Auto-deploys from `main` branch
- **PR Previews**: Unique URL for each pull request

## Common Tasks

### Adding a New Blog Post
1. Create file: `content/blog/YYYY-MM-DD-slug.mdx`
2. Add required frontmatter (title, date)
3. Write content in MDX
4. Run `make validate` to check frontmatter
5. Test locally with `make dev`
6. Submit PR

### Creating a New Component
1. Create `ComponentName.tsx` in `components/`
2. Define TypeScript interface for props
3. Create co-located test file: `ComponentName.test.tsx`
4. Write tests covering key functionality
5. Run `make test` to verify
6. Import and use component where needed

### Updating Dependencies
- Use `pnpm add <package>` to add dependencies
- Use `pnpm add -D <package>` for dev dependencies
- Run `make test` after updating to ensure nothing breaks
- Check `pnpm-lock.yaml` is updated in git

## Important Notes

### Do NOT:
- Use `npm` or `yarn` (this is a pnpm project)
- Modify `pnpm-lock.yaml` manually
- Skip tests or validation before committing
- Use `any` type in TypeScript without justification
- Add unnecessary dependencies
- Create client components without the `'use client'` directive when needed

### Always:
- Run `make check-all` before opening a PR
- Write tests for new functionality
- Follow existing code patterns and structure
- Use TypeScript strict mode
- Document complex logic with comments
- Keep commits atomic and well-described

## Environment Variables

Required for development (create `.env.local` from `.env.example`):
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production (set in Vercel dashboard):
```
NEXT_PUBLIC_SITE_URL=https://brianstechcorner.com
```

## Performance Considerations

- Use Next.js Image component for images (`next/image`)
- Implement proper meta tags for SEO
- Keep bundle size small (check with `pnpm build`)
- Use React Server Components by default for better performance
- Lazy load client-side components when appropriate

## Accessibility

- Use semantic HTML elements
- Include `alt` text for all images
- Ensure proper heading hierarchy (h1 → h2 → h3)
- Test with keyboard navigation
- Use ARIA labels when needed

## Documentation

- Update README.md for significant feature changes
- Add inline comments for complex logic
- Keep docs/ folder up to date (TESTING.md, CODECOV.md)
- Document breaking changes in PR description
