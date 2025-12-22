import Link from 'next/link';
import Image from 'next/image';
import type { PostListItem } from '@/lib/posts';
import { formatDate } from '@/lib/formatDate';

export function PostCard({ post }: { post: PostListItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white no-underline shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:shadow-zinc-900/50"
    >
      {/* Thumbnail Image */}
      {post.image && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Date and Read Time */}
        <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          {/* Series Badge */}
          {post.series && (
            <>
              <div className="flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-0.5 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span className="text-xs font-medium">Part {post.seriesOrder || '?'}</span>
              </div>
              <span className="text-zinc-400 dark:text-zinc-600">•</span>
            </>
          )}
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{formatDate(post.date)}</span>
          </div>
          {post.readTime && (
            <>
              <span className="text-zinc-400 dark:text-zinc-600">•</span>
              <div className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{post.readTime} min read</span>
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <div className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-950 dark:text-zinc-100 dark:group-hover:text-white">
          {post.title}
        </div>

        {/* Description */}
        {post.description ? (
          <div className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {post.description}
          </div>
        ) : null}

        {/* Tags */}
        {post.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
