# Setting Up Giscus Comments

This blog uses [Giscus](https://giscus.app) for comments - a GitHub Discussions-powered commenting system.

## Why Giscus?

- ✅ **Free and open source** - No costs, no ads
- 🔐 **Privacy-friendly** - Readers use GitHub accounts
- 🎨 **Theme-aware** - Automatically matches your site's light/dark mode
- 💾 **You own the data** - All comments stored in your repo's Discussions
- 🚀 **Easy setup** - No backend or database needed

## Setup Steps

### 1. Enable GitHub Discussions

1. Go to your blog repository on GitHub
2. Click **Settings** → **General**
3. Scroll down to **Features**
4. Check **Discussions**

### 2. Install Giscus App

1. Visit https://github.com/apps/giscus
2. Click **Install**
3. Select your blog repository
4. Grant permissions

### 3. Configure Giscus

1. Go to https://giscus.app
2. In the **Repository** section:
   - Enter your repository in format `username/repo`
   - Verify it meets requirements (public, Discussions enabled, giscus app installed)
3. In **Discussion Category**:
   - Choose a category (recommended: **Announcements** or **General**)
   - This is where blog post comments will be created
4. In **Features**:
   - ✅ Enable reactions
   - ✅ Place comment box above comments (recommended)
5. Scroll to **Enable giscus** section
6. Copy the configuration values:
   - `data-repo` → `NEXT_PUBLIC_GISCUS_REPO`
   - `data-repo-id` → `NEXT_PUBLIC_GISCUS_REPO_ID`
   - `data-category` → `NEXT_PUBLIC_GISCUS_CATEGORY`
   - `data-category-id` → `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

### 4. Add Environment Variables

Add to `.env.local` (for development):

```env
NEXT_PUBLIC_GISCUS_REPO=Brians-Tech-Corner/blog
NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxxxxxxxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxxxxxxx
```

For production (Vercel):
1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the same four variables
4. Redeploy your site

### 5. Test It Out

1. Start your dev server: `pnpm dev`
2. Navigate to any blog post
3. Scroll to the bottom - you should see the comment box
4. Try posting a comment (you'll need a GitHub account)

## How It Works

- Each blog post automatically gets a GitHub Discussion created when someone first comments
- The Discussion title matches your blog post title
- Comments sync in real-time between your blog and GitHub Discussions
- You can moderate comments directly on GitHub

## Troubleshooting

**Comments not showing up?**
- Check that all 4 environment variables are set correctly
- Verify GitHub Discussions is enabled on your repo
- Make sure the giscus app is installed for your repo
- Check browser console for errors

**Wrong theme colors?**
- The component automatically syncs with your site's theme toggle
- Test both light and dark modes

**Comments appearing on wrong Discussion?**
- Giscus uses pathname mapping by default
- Each unique URL gets its own Discussion thread

## Managing Comments

As the repository owner, you can:
- Edit or delete any comment in GitHub Discussions
- Pin important discussions
- Lock discussions to prevent new comments
- Mark discussions as answered

## Disabling Comments

To disable comments entirely:
1. Remove the environment variables from `.env.local` and Vercel
2. Redeploy

Comments will no longer appear on blog posts, but existing Discussion threads remain on GitHub.
