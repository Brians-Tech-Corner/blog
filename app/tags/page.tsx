import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { BackLink } from '@/components/BackLink';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse all post tags',
};

export default async function TagsIndexPage() {
  const isDev = process.env.NODE_ENV === 'development';
  const allPosts = await getAllPosts(isDev);

  // Count posts per tag
  const tagCounts = allPosts.reduce(
    (acc, post) => {
      post.tags?.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  const sortedTags = Object.entries(tagCounts).sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <BackLink href="/blog">Back to blog</BackLink>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight dark:text-zinc-100">
          All Tags
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {sortedTags.length} {sortedTags.length === 1 ? 'tag' : 'tags'} across{' '}
          {allPosts.length} {allPosts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      {/* Tags Grid */}
      {sortedTags.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedTags.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="group rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-zinc-400 dark:text-zinc-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <span className="font-medium text-zinc-900 group-hover:text-zinc-950 dark:text-zinc-100 dark:group-hover:text-white">
                    {tag}
                  </span>
                </div>
                <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  {count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
          No tags found
        </div>
      )}
    </div>
  );
}
