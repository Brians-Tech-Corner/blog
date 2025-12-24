import Link from 'next/link';
import { formatDate } from '@/lib/formatDate';
import type { PostListItem } from '@/lib/posts';

type RelatedPostsProps = {
  posts: PostListItem[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">Related Posts</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:border-neutral-700 dark:hover:bg-neutral-900"
          >
            <h3 className="mb-2 font-semibold text-neutral-900 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
              {post.title}
            </h3>
            {post.description && (
              <p className="mb-3 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                {post.description}
              </p>
            )}
            <div className="mt-auto flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-500">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.readTime && (
                <>
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                </>
              )}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
