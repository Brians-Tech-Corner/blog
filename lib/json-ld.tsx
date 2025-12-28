import type { PostMeta } from './posts';

// Site constants for SEO schemas
const SITE_NAME = "Brian's Tech Corner";
const SITE_DESCRIPTION =
  'Homelab, Home Automation, and coding — built in public.';
const SITE_LOGO_PATH = '/brand/X-Banner-Blue.jpg';
const SOCIAL_PROFILES = [
  'https://github.com/brians-tech-corner',
  'https://x.com/brianstechcorn',
  'https://www.youtube.com/@brianstechcorner',
];

/**
 * Get the site URL from environment or fallback
 */
function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://brianstechcorner.com';
}

/**
 * Organization schema for the site
 */
export function getOrganizationSchema() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: siteUrl,
    logo: `${siteUrl}${SITE_LOGO_PATH}`,
    description: SITE_DESCRIPTION,
    sameAs: SOCIAL_PROFILES,
  };
}

/**
 * WebSite schema for basic site information.
 * Note: SearchAction was removed because the blog's search is implemented as
 * a server-side filtering mechanism in a React Server Component, without dedicated
 * search result pages, dynamic metadata, or full SEO optimization for search results.
 */
export function getWebSiteSchema() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: siteUrl,
    description: SITE_DESCRIPTION,
  };
}

/**
 * BlogPosting schema for individual blog posts
 */
export function getBlogPostingSchema(post: PostMeta & { slug: string }) {
  const siteUrl = getSiteUrl();
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.image ? `${siteUrl}${post.image}` : `${siteUrl}${SITE_LOGO_PATH}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || post.title,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Brian',
      url: `${siteUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}${SITE_LOGO_PATH}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags?.join(', '),
  };
}

/**
 * BreadcrumbList schema for navigation
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

/**
 * Safely stringify data for embedding in a JSON-LD <script> tag.
 * Escapes characters that could break out of the script context.
 * Exported for testing purposes to ensure XSS protection.
 */
export function safeJsonLdStringify(data: unknown): string {
  const json = JSON.stringify(data);

  // Escape characters that can lead to XSS when embedding JSON in HTML,
  // including forward slashes to defend against </script> breakouts.
  // See: https://react.dev/reference/react-dom/components/script#preventing-xss-attacks
  return json
    .replace(/</g, '\\u003C')
    .replace(/>/g, '\\u003E')
    .replace(/&/g, '\\u0026')
    .replace(/\//g, '\\/');
}

/**
 * Helper to render JSON-LD script tag
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(data) }}
    />
  );
}
