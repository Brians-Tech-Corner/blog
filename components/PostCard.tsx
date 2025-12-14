import Link from 'next/link';
import type { PostListItem } from '@/lib/posts';

export function PostCard({ post }: { post: PostListItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-zinc-200 bg-white p-5 no-underline shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="text-sm text-zinc-600">{new Date(post.date).toLocaleDateString()}</div>
      <div className="mt-2 text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-950">
        {post.title}
      </div>
      {post.description ? (
        <div className="mt-2 line-clamp-3 text-sm text-zinc-700">{post.description}</div>
      ) : null}
      {post.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-700"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
