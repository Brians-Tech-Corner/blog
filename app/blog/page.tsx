import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';

export const metadata = {
  title: 'Blog',
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const allPosts = await getAllPosts();
  const { tag: selectedTag } = await searchParams;

  // Filter by tag if provided
  const posts = selectedTag
    ? allPosts.filter((p) => p.tags?.includes(selectedTag))
    : allPosts;

  // Get all unique tags from all posts
  const allTags = Array.from(
    new Set(allPosts.flatMap((p) => p.tags ?? []))
  ).sort();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="mt-2 max-w-prose text-zinc-700">
          Practical guides and build logs. Mostly homelab, automation, DevOps, and coding.
        </p>
      </div>

      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-zinc-600">Filter by tag:</span>
          <Link
            href="/blog"
            className={`rounded-full border px-3 py-1 text-sm transition ${
              !selectedTag
                ? 'border-zinc-900 bg-zinc-900 text-white'
                : 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50'
            }`}
          >
            All
          </Link>
          {allTags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className={`rounded-full border px-3 py-1 text-sm transition ${
                selectedTag === tag
                  ? 'border-zinc-900 bg-zinc-900 text-white'
                  : 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50'
              }`}
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      {/* Posts grid */}
      {posts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center text-zinc-600">
          No posts found with tag &quot;{selectedTag}&quot;
        </div>
      )}
    </div>
  );
}
