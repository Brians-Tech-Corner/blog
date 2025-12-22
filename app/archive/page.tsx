import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Browse posts by year',
};

export default async function ArchiveIndexPage() {
  const isDev = process.env.NODE_ENV === 'development';
  const allPosts = await getAllPosts(isDev);

  // Group posts by year
  const archivesByYear = allPosts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<string, typeof allPosts>,
  );

  const sortedYears = Object.keys(archivesByYear).sort((a, b) => b.localeCompare(a));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/blog"
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
          Back to blog
        </Link>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight dark:text-zinc-100">
          Archive
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          All posts organized by year
        </p>
      </div>

      {/* Years Grid */}
      {sortedYears.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedYears.map((year) => {
            const count = archivesByYear[year].length;
            return (
              <Link
                key={year}
                href={`/archive/${year}`}
                className="group rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-zinc-400 dark:text-zinc-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-2xl font-semibold text-zinc-900 group-hover:text-zinc-950 dark:text-zinc-100 dark:group-hover:text-white">
                      {year}
                    </span>
                  </div>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    {count}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
          No posts found
        </div>
      )}
    </div>
  );
}
