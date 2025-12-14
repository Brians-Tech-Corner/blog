import Link from 'next/link';
import type { PostListItem } from '@/lib/posts';
import { formatDate } from '@/lib/formatDate';
export function PostCard({ post }: { post: PostListItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-zinc-200 bg-white p-6 no-underline shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Date and Read Time */}
      <div className="flex items-center gap-3 text-sm text-zinc-600">
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
            <span className="text-zinc-400">•</span>
            <div className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
      <div className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-950">
        {post.title}
      </div>

      {/* Description */}
      {post.description ? (
        <div className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-700">
          {post.description}
        </div>
      ) : null}

      {/* Tags */}
      {post.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
