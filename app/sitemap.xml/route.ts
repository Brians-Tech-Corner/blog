import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

/**
 * Convert YYYY-MM-DD date to ISO 8601 datetime format
 * @param dateString - Date in YYYY-MM-DD format
 * @returns ISO 8601 datetime string (e.g., 2025-12-14T00:00:00.000Z)
 */
function toISODateTime(dateString: string): string {
  // If already in ISO format, return as-is
  if (dateString.includes('T')) {
    return dateString;
  }
  // Convert YYYY-MM-DD to ISO 8601 datetime at midnight UTC
  return new Date(`${dateString}T00:00:00.000Z`).toISOString();
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brianstechcorner.com';
  const posts = await getAllPosts();

  const defaultStaticLastModified = '2024-01-01T00:00:00.000Z';
  // Find the most recent post date, returns undefined if no posts exist
  const latestPostLastModified = posts.reduce<string | undefined>((latest, post) => {
    if (!latest) return post.date;
    return post.date > latest ? post.date : latest;
  }, undefined);

  const staticPages = [
    {
      url: '',
      lastModified: defaultStaticLastModified,
      changeFreq: 'weekly',
      priority: 1.0,
    },
    {
      url: '/about',
      lastModified: defaultStaticLastModified,
      changeFreq: 'monthly',
      priority: 0.8,
    },
    {
      url: '/blog',
      // Falls back to defaultStaticLastModified if no posts exist
      lastModified: latestPostLastModified
        ? toISODateTime(latestPostLastModified)
        : defaultStaticLastModified,
      changeFreq: 'daily',
      priority: 0.9,
    },
  ];

  const postPages = posts.map((p) => ({
    url: `/blog/${p.slug}`,
    lastModified: toISODateTime(p.date),
    changeFreq: 'monthly',
    priority: 0.7,
  }));

  const allPages = [...staticPages, ...postPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPages
      .map(
        (page) => `
      <url>
        <loc>${siteUrl}${page.url}</loc>
        <lastmod>${page.lastModified}</lastmod>
        <changefreq>${page.changeFreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>`,
      )
      .join('\n')}
  </urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
