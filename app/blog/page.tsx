import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';
import { BlogSidebar } from '@/components/BlogSidebar';

export const metadata = {
  title: 'Blog',
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; q?: string; year?: string }>;
}) {
  const isDev = process.env.NODE_ENV === 'development';
  const allPosts = await getAllPosts(isDev);
  const { tag: selectedTag, q: searchQuery, year: selectedYear } = await searchParams;

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

  // Apply year filter
  if (selectedYear) {
    posts = posts.filter((p) => {
      const postYear = new Date(p.date).getFullYear().toString();
      return postYear === selectedYear;
    });
  }

  // Get all unique tags from all posts
  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags ?? []))).sort();

  // Calculate archives by year
  const archivesByYear = allPosts
    .reduce(
      (acc, post) => {
        const year = new Date(post.date).getFullYear().toString();
        const existing = acc.find((a) => a.year === year);
        if (existing) {
          existing.count++;
        } else {
          acc.push({ year, count: 1 });
        }
        return acc;
      },
      [] as { year: string; count: number }[],
    )
    .sort((a, b) => b.year.localeCompare(a.year));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight dark:text-zinc-100">Blog</h1>
        <p className="mt-2 max-w-prose text-zinc-700 dark:text-zinc-300">
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
          className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 pr-10 text-sm placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600"
        />
        <svg
          className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
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

      {/* Two-column layout: Sidebar + Content */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sticky Sidebar - Hidden on mobile, visible on lg+ screens */}
        <div className="hidden lg:block lg:w-80">
          <div className="sticky top-6">
            <BlogSidebar
              allTags={allTags}
              postCount={allPosts.length}
              archivesByYear={archivesByYear}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Mobile Tag Filters (shown only on small screens) */}
          <div className="lg:hidden">
            {allTags.length > 0 && (
              <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Filter by Tag
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {allTags.map((tag) => {
                    const isSelected = selectedTag === tag;
                    const href = searchQuery
                      ? `/blog?q=${encodeURIComponent(searchQuery)}&tag=${encodeURIComponent(tag)}`
                      : `/blog?tag=${encodeURIComponent(tag)}`;
                    return (
                      <a
                        key={tag}
                        href={href}
                        className={`rounded-full border px-3 py-1.5 text-sm transition ${
                          isSelected
                            ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                            : 'border-zinc-200 bg-white text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'
                        }`}
                      >
                        {tag}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Posts grid */}
          {posts.length > 0 ? (
            <div className="grid gap-6">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              {searchQuery && selectedTag
                ? `No posts found matching "${searchQuery}" with tag "${selectedTag}"`
                : searchQuery
                  ? `No posts found matching "${searchQuery}"`
                  : `No posts found with tag "${selectedTag}"`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
