import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

function escapeXml(unsafe: string) {
  return unsafe
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const posts = await getAllPosts();

  const items = posts
    .map((p) => {
      const url = `${siteUrl}/blog/${p.slug}`;
      return `
        <item>
          <title>${escapeXml(p.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(p.date).toUTCString()}</pubDate>
          <description>${escapeXml(p.description ?? '')}</description>
        </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Brian's Tech Corner</title>
      <link>${siteUrl}</link>
      <description>Homelab, home automation, DevOps, platform engineering, and coding.</description>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
