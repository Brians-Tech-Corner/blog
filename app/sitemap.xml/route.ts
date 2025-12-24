import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const posts = await getAllPosts();

  const staticPages = [
    {
      url: '',
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 1.0,
    },
    {
      url: '/about',
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.8,
    },
    {
      url: '/blog',
      lastModified: posts[0]?.date || new Date().toISOString(),
      changeFreq: 'daily',
      priority: 0.9,
    },
  ];

  const postPages = posts.map((p) => ({
    url: `/blog/${p.slug}`,
    lastModified: p.date,
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
