import type { PostMeta } from './posts';

/**
 * Get the site URL from environment or fallback
 */
function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brianstechcorner.com';
}

/**
 * Organization schema for the site
 */
export function getOrganizationSchema() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: "Brian's Tech Corner",
    url: siteUrl,
    logo: `${siteUrl}/brand/X-Banner-Blue.jpg`,
    description:
      'Homelab, home automation, DevOps, platform engineering, and coding — built in public.',
    sameAs: [
      'https://github.com/Brians-Tech-Corner',
      'https://x.com/brianstechcorn',
      'https://www.youtube.com/@brianstechcorner',
    ],
  };
}

/**
 * WebSite schema with search capability
 */
export function getWebSiteSchema() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Brian's Tech Corner",
    url: siteUrl,
    description:
      'Homelab, home automation, DevOps, platform engineering, and coding — built in public.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * BlogPosting schema for individual blog posts
 */
export function getBlogPostingSchema(post: PostMeta & { slug: string }) {
  const siteUrl = getSiteUrl();
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.image
    ? `${siteUrl}${post.image}`
    : `${siteUrl}/brand/X-Banner-Blue.jpg`;

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
      name: "Brian's Tech Corner",
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/brand/X-Banner-Blue.jpg`,
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
 * Helper to render JSON-LD script tag
 */
export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
