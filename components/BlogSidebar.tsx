'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type BlogSidebarProps = {
  allTags: string[];
  postCount: number;
  archivesByYear: { year: string; count: number }[];
};

export function BlogSidebar({ allTags, postCount, archivesByYear }: BlogSidebarProps) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag');
  const searchQuery = searchParams.get('q');

  const buildHref = (params: { tag?: string; q?: string }) => {
    const url = new URLSearchParams();
    if (params.q) url.set('q', params.q);
    if (params.tag) url.set('tag', params.tag);
    return `/blog${url.toString() ? `?${url.toString()}` : ''}`;
  };

  return (
    <aside className="space-y-8">
      {/* Quick Stats */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Stats
        </h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Total Posts</span>
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {postCount}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Tags</span>
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {allTags.length}
            </span>
          </div>
        </div>
      </div>

      {/* Tag Filters */}
      {allTags.length > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Tags
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={buildHref({ q: searchQuery || undefined })}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                !selectedTag
                  ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                  : 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600'
              }`}
            >
              All
            </Link>
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <Link
                  key={tag}
                  href={buildHref({ q: searchQuery || undefined, tag })}
                  className={`rounded-full border px-3 py-1.5 text-sm transition ${
                    isSelected
                      ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                      : 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600'
                  }`}
                >
                  {tag}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Archives by Year */}
      {archivesByYear.length > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Archives
          </h3>
          <div className="mt-4 space-y-2">
            {archivesByYear.map(({ year, count }) => (
              <div key={year} className="flex items-center justify-between text-sm">
                <span className="text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-100">
                  {year}
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">({count})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tag Cloud Visual */}
      <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-sm dark:border-zinc-700 dark:from-blue-950/30 dark:to-purple-950/30">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Popular Topics
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {allTags.slice(0, 6).map((tag) => {
            return (
              <Link
                key={tag}
                href={buildHref({ tag })}
                className="text-base font-medium text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
              >
                {tag}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
