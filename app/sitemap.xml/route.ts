import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const posts = await getAllPosts();

  const defaultStaticLastModified = '2024-01-01T00:00:00.000Z';
  const latestPostLastModified = posts.reduce<string | undefined>(
    (latest, post) => {
      if (!latest) return post.date;
      return post.date > latest ? post.date : latest;
    },
    undefined,
  );

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
      lastModified: latestPostLastModified ?? defaultStaticLastModified,
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
