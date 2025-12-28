import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';
import { BackLink } from '@/components/BackLink';
import { EmptyState } from '@/components/EmptyState';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  // Always exclude drafts from static generation
  // Draft posts are accessible in dev mode via dynamic rendering
  const allPosts = await getAllPosts(false);
  const tags = Array.from(
    new Set(
      allPosts
        .flatMap((p) => p.tags ?? [])
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    ),
  ).sort();

  return tags.map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `Posts tagged with "${decodedTag}"`,
    description: `All posts tagged with ${decodedTag}`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const isDev = process.env.NODE_ENV === 'development';
  const allPosts = await getAllPosts(isDev);

  const filteredPosts = allPosts.filter((p) => p.tags?.includes(decodedTag));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <BackLink href="/tags">All tags</BackLink>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight dark:text-zinc-100">
          Posts tagged with &ldquo;{decodedTag}&rdquo;
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
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
        <EmptyState message={`No posts found with tag \u201c${decodedTag}\u201d`} />
      )}
    </div>
  );
}
