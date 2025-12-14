# Vercel Deployment Checklist

## Pre-Deployment

- [ ] All blog posts have required frontmatter fields (`title`, `date`)
- [ ] Draft posts are marked with `draft: true`
- [ ] Brand images exist in `/public/brand/`
- [ ] Site URL is configured in environment variables

## Vercel Setup

### 1. Connect Repository
- Push code to GitHub
- Go to [vercel.com](https://vercel.com)
- Click "Add New..." → "Project"
- Import your GitHub repository

### 2. Configure Project
- **Framework Preset**: Next.js (auto-detected)
- **Build Command**: `pnpm build` (auto-configured)
- **Output Directory**: `.next` (auto-configured)
- **Install Command**: `pnpm install` (auto-configured)

### 3. Set Environment Variables
Add the following in Vercel dashboard under "Settings" → "Environment Variables":

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://brianstechcorner.com` | Production, Preview |

**Important**: Replace with your actual domain!

### 4. Custom Domain (Optional)
- Go to "Settings" → "Domains"
- Add your custom domain: `brianstechcorner.com`
- Follow DNS configuration instructions
- Wait for DNS propagation (can take up to 48 hours)

## Post-Deployment

### Verify Everything Works
- [ ] Homepage loads correctly
- [ ] Blog listing shows all posts
- [ ] Individual blog posts render properly
- [ ] Tag filtering works on `/blog?tag=<tag>`
- [ ] RSS feed accessible at `/rss.xml`
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Images load properly
- [ ] Header banner displays correctly on all screen sizes

### Test Social Sharing
Use these tools to verify OpenGraph/Twitter cards:

1. **Twitter Card Validator**
   - https://cards-dev.twitter.com/validator
   - Test a blog post URL

2. **LinkedIn Post Inspector**
   - https://www.linkedin.com/post-inspector/
   - Test a blog post URL

3. **Facebook Sharing Debugger**
   - https://developers.facebook.com/tools/debug/
   - Test a blog post URL

### Performance Check
- [ ] Run Lighthouse audit in Chrome DevTools
- [ ] Check Core Web Vitals in Vercel Analytics
- [ ] Verify images are optimized (Next.js Image component)

## Continuous Deployment

Once set up, every push to your main branch will:
1. Trigger an automatic build on Vercel
2. Run the build process
3. Deploy to production if successful
4. Generate RSS/sitemap automatically

Preview deployments are created for:
- Pull requests
- Other branches (if configured)

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Test `pnpm build` locally first

### Missing Environment Variables
- Double-check `NEXT_PUBLIC_SITE_URL` is set
- Environment variables are case-sensitive

### Images Not Loading
- Verify images exist in `/public` directory
- Check image paths don't have leading `/public/`
- Image paths should be `/brand/image.jpg` not `/public/brand/image.jpg`

### RSS/Sitemap Shows localhost
- Ensure `NEXT_PUBLIC_SITE_URL` is set in Vercel
- Redeploy after adding environment variables

## Monitoring

### Vercel Analytics (Built-in)
- View real-time traffic
- Monitor Core Web Vitals
- Track deployment status

### Optional Additions
- Google Analytics (add to layout.tsx)
- Plausible Analytics (privacy-focused alternative)
- Sentry for error tracking
