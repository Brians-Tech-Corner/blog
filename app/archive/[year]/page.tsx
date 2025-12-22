import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';
import { BackLink } from '@/components/BackLink';
import { EmptyState } from '@/components/EmptyState';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ year: string }>;
};

export async function generateStaticParams() {
  // Always exclude drafts from static generation
  // Draft posts are accessible in dev mode via dynamic rendering
  const allPosts = await getAllPosts(false);
  const years = Array.from(new Set(allPosts.map((p) => new Date(p.date).getFullYear().toString()))).sort(
    (a, b) => Number(b) - Number(a),
  );

  return years.map((year) => ({
    year,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;

  return {
    title: `Posts from ${year}`,
    description: `All posts published in ${year}`,
  };
}

export default async function ArchiveYearPage({ params }: Props) {
  const { year } = await params;
  const isDev = process.env.NODE_ENV === 'development';
  const allPosts = await getAllPosts(isDev);

  const filteredPosts = allPosts.filter((p) => {
    const postYear = new Date(p.date).getFullYear().toString();
    return postYear === year;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <BackLink href="/archive">All archives</BackLink>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight dark:text-zinc-100">
          Posts from {year}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} published
        </p>
      </div>

      {/* Posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState message={`No posts found from ${year}`} />
      )}
    </div>
  );
}
