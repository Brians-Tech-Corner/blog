import type { PostMeta as Meta } from '@/lib/posts';

export function PostMeta({ post }: { post: Meta }) {
  return (
    <header className="space-y-3">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{post.title}</h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-600">
        <span>{new Date(post.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</span>
        {post.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-700"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      {post.description ? <p className="max-w-prose text-zinc-600 dark:text-zinc-400">{post.description}</p> : null}
    </header>
  );
}
