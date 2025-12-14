# Pre-Launch Checklist

Complete these tasks before going live with your blog.

## 🎨 Branding & Icons

- [ ] Generate all required icons (see [ICONS.md](ICONS.md))
  - [ ] favicon.ico (32x32)
  - [ ] icon-192.png (192x192)
  - [ ] icon-512.png (512x512)
  - [ ] apple-icon.png (180x180)
- [ ] Test favicon appears in browser tab
- [ ] Test "Add to Home Screen" on mobile

## 🔗 Social Media Links

Update social media URLs in [components/SiteFooter.tsx](components/SiteFooter.tsx):

- [ ] YouTube: Replace `https://youtube.com/@brianstechcorner` with your channel
- [ ] X/Twitter: Replace `https://x.com/brianstechcorner` with your handle
- [ ] Instagram: Replace `https://instagram.com/brianstechcorner` with your profile
- [ ] GitHub: Replace `https://github.com/btotharye` with your GitHub username

**Remove any social links you don't have** by deleting them from the `socialLinks` array.

## ⚙️ Environment Variables

- [ ] Set `NEXT_PUBLIC_SITE_URL` in Vercel to your production domain
- [ ] Update `.env.local` for local development (copy from `.env.example`)

## 📝 Content Review

- [ ] Review and update [app/about/page.tsx](app/about/page.tsx) with your bio
- [ ] Check first blog post is ready and `draft: false`
- [ ] Verify all frontmatter fields are correct
- [ ] Spellcheck blog posts
- [ ] Test all internal links work

## 🔍 SEO & Metadata

- [ ] Verify site title in [app/layout.tsx](app/layout.tsx)
- [ ] Check site description is accurate
- [ ] Confirm OpenGraph image exists at `/brand/X-Banner-Blue.jpg`
- [ ] Test RSS feed at `/rss.xml`
- [ ] Test sitemap at `/sitemap.xml`
- [ ] Verify robots.txt at `/robots.txt`

## 📱 Responsive Design

Test on multiple devices:
- [ ] Desktop (1920px+)
- [ ] Laptop (1280px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

Check:
- [ ] Header banner scales correctly
- [ ] Navigation is usable on mobile
- [ ] Blog cards are readable
- [ ] Footer looks good on all sizes

## 🚀 Performance

- [ ] Run Lighthouse audit (target: 90+ on all metrics)
- [ ] Check all images are optimized
- [ ] Verify no console errors in browser
- [ ] Test page load speed

## 🔐 Security & Privacy

- [ ] Add privacy policy if needed (optional for personal blog)
- [ ] Set up Vercel environment variables securely
- [ ] Review all external links use `rel="noopener noreferrer"`

## 🌐 Domain & Hosting

- [ ] Push code to GitHub repository
- [ ] Import repository to Vercel
- [ ] Configure custom domain in Vercel (if using one)
- [ ] Wait for DNS propagation
- [ ] Verify SSL certificate is active (https://)

## ✅ Final Checks

Before announcing:
- [ ] Test all pages load without errors
- [ ] Share a blog post link on social media to test preview cards
- [ ] Test RSS feed in a feed reader (Feedly, NewsBlur, etc.)
- [ ] Send test link to a friend for feedback
- [ ] Double-check spelling in header, footer, and first post

## 📊 Analytics (Optional)

Consider adding:
- [ ] Vercel Analytics (built-in, enable in dashboard)
- [ ] Google Analytics
- [ ] Plausible Analytics (privacy-focused)
- [ ] Umami (self-hosted option)

Add analytics script to [app/layout.tsx](app/layout.tsx) if desired.

## 📢 Launch!

Once everything is checked:
1. ✅ Deploy to production
2. ✅ Verify live site works perfectly
3. ✅ Announce on social media
4. ✅ Share RSS feed link
5. ✅ Start writing more content!

## Post-Launch

- [ ] Monitor Vercel deployment logs
- [ ] Check for any error reports
- [ ] Monitor site performance in Vercel dashboard
- [ ] Start tracking which posts get the most traffic
- [ ] Plan next blog posts

---

**Need help?** Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions and troubleshooting.
