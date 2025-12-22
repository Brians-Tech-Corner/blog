import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { compilePostBySlug, getAllPostSlugs, getSeriesNavigation } from '@/lib/posts';
import { Prose } from '@/components/Prose';
import { PostMeta } from '@/components/PostMeta';
import { TableOfContents } from '@/components/TableOfContents';
import { SeriesNavigation } from '@/components/SeriesNavigation';
import { Comments } from '@/components/Comments';

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

  // Get series navigation if this post is part of a series
  const seriesNav = await getSeriesNavigation(slug);

  // Only show TOC if there are 3 or more headings
  const showToc = post.headings.length >= 3;

  // Giscus configuration from environment variables
  const giscusConfig = {
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO || '',
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '',
    category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || '',
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '',
  };

  const commentsEnabled =
    giscusConfig.repo && giscusConfig.repoId && giscusConfig.category && giscusConfig.categoryId;

  return (
    <div className="relative">
      <div
        className={
          showToc
            ? 'mx-auto max-w-7xl grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]'
            : 'mx-auto max-w-7xl'
        }
      >
        <article className="min-w-0 space-y-8">
          <PostMeta post={post.meta} />

          <Prose>{post.content}</Prose>

          {/* Series Navigation */}
          {seriesNav.allInSeries.length > 0 && (
            <SeriesNavigation
              prev={seriesNav.prev}
              next={seriesNav.next}
              allInSeries={seriesNav.allInSeries}
              currentSlug={slug}
            />
          )}

          {/* Comments */}
          {commentsEnabled && (
            <Comments
              repo={giscusConfig.repo}
              repoId={giscusConfig.repoId}
              category={giscusConfig.category}
              categoryId={giscusConfig.categoryId}
            />
          )}
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
