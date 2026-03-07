# Blog Monetization Setup Guide

This guide walks you through setting up the monetization infrastructure for Brian's Tech Corner.

## What Changed

### Removed
- ✅ Google AdSense code (components/AdSense.tsx, app/AdSenseScript.tsx)
- ✅ NEXT_PUBLIC_ADSENSE_CLIENT environment variable
- ✅ AdSense banners from blog post pages

### Added
- ✅ **HomeHero Component** — New compelling homepage hero section
- ✅ **SubscribeCTA Component** — Improved newsletter signup (now appears on posts)
- ✅ **SponsorshipCTA Component** — Ready for sponsorship offers
- ✅ Better homepage layout with clear value proposition

---

## Setup Steps (Required)

### Step 1: Update Environment Variables

Edit your `.env.local` (or Vercel dashboard):

```bash
# Remove this (if present):
# NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx

# Keep or add these:
NEXT_PUBLIC_BEEHIIV_URL=https://yourname.beehiiv.com
NEXT_PUBLIC_SITE_URL=https://brianstechcorner.com
```

Check `.env.example` to see all available options.

---

### Step 2: Beehiiv Newsletter Setup (Already Done?)

The blog references `NEXT_PUBLIC_BEEHIIV_URL` in the SubscribeCTA component.

**If you haven't set this up yet:**

1. Go to https://beehiiv.com
2. Create a free newsletter account
3. Copy your newsletter URL (e.g., `https://yourname.beehiiv.com`)
4. Add it to `.env.local`:
   ```bash
   NEXT_PUBLIC_BEEHIIV_URL=https://yourname.beehiiv.com
   ```
5. Test locally: `npm run dev` → visit homepage, click "Subscribe"

**The SubscribeCTA component will:**
- Display on homepage (before latest posts section)
- Display at end of every blog post
- Link directly to your Beehiiv newsletter signup

---

### Step 3: Update SponsorshipCTA Email (REQUIRED)

The SponsorshipCTA component needs your email address.

**Edit `components/SponsorshipCTA.tsx`:**

Replace `hello@example.com` with your email:

```tsx
<Link
  href="mailto:your-email@example.com?subject=Sponsorship%20Inquiry"
  // ...
>
  Get in Touch
</Link>
```

---

### Step 4: Add Sponsorship Page (Optional but Recommended)

Create `app/sponsorships/page.tsx` with:

```tsx
import Link from 'next/link';

export const metadata = {
  title: 'Sponsor Brian\'s Tech Corner',
  description: 'Partner with our engineering blog.',
};

export default function SponsorshipsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-4xl font-bold">Sponsor Brian's Tech Corner</h1>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Reach 10k+ Engineering Professionals</h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-300">
          Our audience: Platform engineers, DevOps, staff-level ICs, and technical leaders.
          People who make infrastructure decisions.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Sponsorship Options</h2>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-semibold">Featured Post Sponsorship</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Your product featured in a post written specifically for your audience.
              <strong> $2,500 - $5,000</strong>
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Sidebar Sponsorship</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Logo + link in blog sidebar for one month.
              <strong> $500 - $1,000/month</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <p>
          Interested? <Link href="mailto:your-email@example.com" className="underline">Get in touch</Link>
        </p>
      </section>
    </main>
  );
}
```

Then add link to the footer or About page.

---

## Monetization Strategy Overview

### Email Newsletter (SubscribeCTA)
- **Current:** Free tier via Beehiiv
- **Future:** Add paid tier ($10/month) for early access, bonus content
- **Timeline:** Build to 500+ subscribers first, then launch paid tier

### Sponsorships (SponsorshipCTA)
- **Pricing:** $1,500-$5,000 per featured post
- **Targets:** Port, Railway, Vercel, SonarCloud, LaunchDarkly
- **Action:** When you're ready, reach out to these companies
- **Example:** "I wrote about your tool, would you like to sponsor the post?"

### Affiliate Commissions
- **Setup:** Add affiliate links in blog posts
- **Examples:** Railway ($100/referral), Vercel, AWS
- **Passive:** No extra work, just add links naturally

---

## Code Organization

### Components Added
- `components/HomeHero.tsx` — Homepage hero section
- `components/SponsorshipCTA.tsx` — Sponsorship signup block
- `components/SubscribeCTA.tsx` — (Already existed, improved)

### Components Removed
- `components/AdSense.tsx` ✓
- `app/AdSenseScript.tsx` ✓

### Files Updated
- `app/layout.tsx` — Removed AdSenseScript import/usage
- `app/page.tsx` — Added HomeHero, improved layout
- `app/blog/[slug]/page.tsx` — Replaced AdSense with SubscribeCTA
- `.env.example` — Removed NEXT_PUBLIC_ADSENSE_CLIENT

---

## Testing Locally

```bash
# Set environment variables
export NEXT_PUBLIC_BEEHIIV_URL=https://yourname.beehiiv.com
export NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Run dev server
npm run dev

# Visit:
# - Homepage: http://localhost:3000 (should see new hero)
# - Blog post: http://localhost:3000/blog/2026-03-03-platform-engineering-solo-saas
#   (should see SubscribeCTA at bottom instead of AdSense)
```

---

## Deploy to Production

1. **Update environment variables in Vercel dashboard:**
   - Go to Settings → Environment Variables
   - Add/update `NEXT_PUBLIC_BEEHIIV_URL`
   - Remove `NEXT_PUBLIC_ADSENSE_CLIENT` (if present)

2. **Push to main:**
   ```bash
   git push origin feat/monetization-setup
   # Create PR, merge after review
   ```

3. **Redeploy on Vercel:**
   - Automatic if branch is pushed
   - Or manually trigger redeploy from Vercel dashboard

---

## Next Steps (After Merging)

1. **Verify SubscribeCTA works** — Test Beehiiv link on production
2. **Add sponsorship email** — Update SponsorshipCTA with your email
3. **Create sponsorships page** — Optional, but recommended
4. **Start reaching out** — Email 5-10 companies about sponsorships
5. **Monitor email growth** — Track Beehiiv subscribers
6. **Add affiliate links** — In blog posts naturally (no new component needed)

---

## FAQ

**Q: Will the newsletter setup happen automatically?**  
A: Not until you set `NEXT_PUBLIC_BEEHIIV_URL`. The component will show nothing if not configured.

**Q: Can I use a different newsletter service?**  
A: Yes. Update `components/SubscribeCTA.tsx` to use your service (Substack, Mailchimp, etc).

**Q: Where should sponsorships appear?**  
A: This PR adds SponsorshipCTA (amber box). You can add it to:
- Homepage (after hero)
- Blog post sidebar
- Dedicated sponsorships page

**Q: How do I actually make money?**  
A: Three ways:
1. **Sponsorships** ($2-5k per post) — Email companies offering their tools
2. **Newsletter paid tier** ($5-10/month) — After you have 500+ subscribers
3. **Affiliate links** ($100-500/month) — Natural links to tools you mention

---

## Support

If something's not working:
1. Check your `.env.local` has `NEXT_PUBLIC_BEEHIIV_URL`
2. Verify Beehiiv URL is correct (should be a valid link)
3. Run `npm run dev` and test locally
4. Check browser console for errors

---

That's it! The monetization infrastructure is now in place and ready to use. 🚀
