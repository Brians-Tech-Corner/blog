import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { compilePostBySlug, getAllPostSlugs } from '@/lib/posts';
import { Prose } from '@/components/Prose';
import { PostMeta } from '@/components/PostMeta';
import { TableOfContents } from '@/components/TableOfContents';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brianstechcorner.com';

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await compilePostBySlug(slug);
  if (!post) return {};

  const { meta } = post;
  const postUrl = `${siteUrl}/blog/${slug}`;
  const ogImage = meta.image
    ? `${siteUrl}${meta.image}`
    : `${siteUrl}/brand/X-Banner-Black.jpg`;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: postUrl,
      siteName: "Brian's Tech Corner",
      type: 'article',
      publishedTime: meta.date,
      authors: ['Brian'],
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await compilePostBySlug(slug);
  if (!post) return notFound();

  // Only show TOC if there are 3 or more headings
  const showToc = post.headings.length >= 3;

  return (
    <div className="relative">
      <div
        className={
          showToc
            ? 'mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]'
            : ''
        }
      >
        <article className="min-w-0 space-y-8">
          <PostMeta post={post.meta} />

          <Prose>{post.content}</Prose>
        </article>

        {showToc && (
          <aside className="hidden lg:block">
            <TableOfContents headings={post.headings} />
          </aside>
        )}
      </div>
    </div>
  );
}
