import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateStaticParams() {
  const isDev = process.env.NODE_ENV === 'development';
  const allPosts = await getAllPosts(isDev);
  const years = Array.from(new Set(allPosts.map((p) => new Date(p.date).getFullYear().toString()))).sort(
    (a, b) => Number(b) - Number(a),
  );

  return years.map((year) => ({
    year,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;

  return {
    title: `Posts from ${year}`,
    description: `All posts published in ${year}`,
  };
}

export default async function ArchiveYearPage({ params }: Props) {
  const { year } = await params;
  const isDev = process.env.NODE_ENV === 'development';
  const allPosts = await getAllPosts(isDev);

  const filteredPosts = allPosts.filter((p) => {
    const postYear = new Date(p.date).getFullYear().toString();
    return postYear === year;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/archive"
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
          All archives
        </Link>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight dark:text-zinc-100">
          Posts from {year}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} published
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
          No posts found from {year}
        </div>
      )}
    </div>
  );
}
