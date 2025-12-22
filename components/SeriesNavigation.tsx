import Link from 'next/link';
import type { PostListItem } from '@/lib/posts';

type SeriesNavigationProps = {
  prev: PostListItem | null;
  next: PostListItem | null;
  allInSeries: PostListItem[];
  currentSlug: string;
};

export function SeriesNavigation({ prev, next, allInSeries, currentSlug }: SeriesNavigationProps) {
  if (allInSeries.length === 0) return null;

  const currentPost = allInSeries.find((p) => p.slug === currentSlug);
  const seriesName = currentPost?.series || 'Series';

  return (
    <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
      {/* Series Overview */}
      <div className="mb-6">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
          📚 Part of: {seriesName.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
        </h2>
        <div className="space-y-2">
          {allInSeries.map((post) => {
            const isCurrent = post.slug === currentSlug;
            return (
              <div
                key={post.slug}
                className={`flex items-center gap-2 text-sm ${
                  isCurrent
                    ? 'font-semibold text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <span className="text-xs">
                  {post.seriesOrder ? `Part ${post.seriesOrder}:` : '•'}
                </span>
                {isCurrent ? (
                  <span>{post.title}</span>
                ) : (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {post.title}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Previous/Next Navigation */}
      {(prev || next) && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group flex flex-col rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-500 dark:border-gray-800 dark:hover:border-blue-500"
            >
              <span className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                ← Previous
              </span>
              <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex flex-col rounded-lg border border-gray-200 p-4 text-right transition-colors hover:border-blue-500 dark:border-gray-800 dark:hover:border-blue-500"
            >
              <span className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Next →
              </span>
              <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
