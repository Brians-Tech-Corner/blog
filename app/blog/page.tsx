import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';

export const metadata = {
  title: 'Blog',
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; q?: string }>;
}) {
  const allPosts = await getAllPosts();
  const { tag: selectedTag, q: searchQuery } = await searchParams;

  // Filter by search query and tag
  let posts = allPosts;
  
  // Apply search filter
  if (searchQuery && searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    posts = posts.filter((p) => {
      const titleMatch = p.title?.toLowerCase().includes(query);
      const descMatch = p.description?.toLowerCase().includes(query);
      const tagMatch = p.tags?.some((tag) => tag.toLowerCase().includes(query));
      return titleMatch || descMatch || tagMatch;
    });
  }
  
  // Apply tag filter
  if (selectedTag) {
    posts = posts.filter((p) => p.tags?.includes(selectedTag));
  }

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

      {/* Search bar */}
      <form method="GET" action="/blog" className="relative">
        <input
          type="search"
          name="q"
          defaultValue={searchQuery}
          placeholder="Search posts by title, description, or tags..."
          className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 pr-10 text-sm placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
        />
        <svg
          className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </form>

      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-zinc-600">Filter by tag:</span>
          <Link
            href={searchQuery ? `/blog?q=${encodeURIComponent(searchQuery)}` : '/blog'}
            className={`rounded-full border px-3 py-1 text-sm transition ${
              !selectedTag
                ? 'border-zinc-900 bg-zinc-900 text-white'
                : 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50'
            }`}
          >
            All
          </Link>
          {allTags.map((tag) => {
            const href = searchQuery
              ? `/blog?q=${encodeURIComponent(searchQuery)}&tag=${encodeURIComponent(tag)}`
              : `/blog?tag=${encodeURIComponent(tag)}`;
            return (
              <Link
                key={tag}
                href={href}
                className={`rounded-full border px-3 py-1 text-sm transition ${
                  selectedTag === tag
                    ? 'border-zinc-900 bg-zinc-900 text-white'
                    : 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50'
                }`}
              >
                {tag}
              </Link>
            );
          })}
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
          {searchQuery && selectedTag
            ? `No posts found matching "${searchQuery}" with tag "${selectedTag}"`
            : searchQuery
            ? `No posts found matching "${searchQuery}"`
            : `No posts found with tag "${selectedTag}"`}
        </div>
      )}
    </div>
  );
}
