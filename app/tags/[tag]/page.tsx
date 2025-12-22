import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const isDev = process.env.NODE_ENV === 'development';
  const allPosts = await getAllPosts(isDev);
  const tags = Array.from(new Set(allPosts.flatMap((p) => p.tags ?? []))).sort();

  return tags.map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `Posts tagged with "${decodedTag}"`,
    description: `All posts tagged with ${decodedTag}`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const isDev = process.env.NODE_ENV === 'development';
  const allPosts = await getAllPosts(isDev);

  const filteredPosts = allPosts.filter((p) => p.tags?.includes(decodedTag));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/tags"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          All tags
        </Link>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight dark:text-zinc-100">
          Posts tagged with &ldquo;{decodedTag}&rdquo;
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
        </p>
      </div>

      {/* Posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
          No posts found with tag &ldquo;{decodedTag}&rdquo;
        </div>
      )}
    </div>
  );
}
