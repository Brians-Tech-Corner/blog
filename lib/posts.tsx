import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '@/components/mdx';
import { extractTocHeadings, type TocHeading } from './toc';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type PostMeta = {
  title: string;
  date: string; // ISO-ish: YYYY-MM-DD
  updated?: string; // Last modified date (ISO-ish: YYYY-MM-DD)
  description?: string;
  tags?: string[];
  draft?: boolean;
  image?: string; // OpenGraph image path
  series?: string; // Series identifier (e.g., "kubernetes-homelab")
  seriesOrder?: number; // Position in series (1, 2, 3, etc.)
};

export type PostListItem = PostMeta & { slug: string; readTime?: number };

// Calculate estimated read time in minutes
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes); // At least 1 minute
}

async function readPostFile(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, 'utf-8');
  return raw;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const files = await fs.readdir(BLOG_DIR);
  return files.filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''));
}

export async function getAllPosts(includeDrafts = false): Promise<PostListItem[]> {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await readPostFile(slug);
      const { data, content } = matter(raw);
      const meta = data as PostMeta;
      const readTime = calculateReadTime(content);
      return { ...meta, slug, readTime };
    }),
  );

  // Filter out drafts unless explicitly included
  const filtered = includeDrafts ? posts : posts.filter((p) => !p.draft);

  // newest first
  return filtered.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function compilePostBySlug(slug: string): Promise<{
  meta: PostMeta & { slug: string };
  content: React.ReactNode;
  headings: TocHeading[];
} | null> {
  try {
    const raw = await readPostFile(slug);
    const { data, content } = matter(raw);
    const meta = data as PostMeta;

    // Basic guardrails (avoid silent undefined)
    if (!meta?.title || !meta?.date) return null;

    const compiled = await compileMDX({
      source: content,
      components: mdxComponents,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypePrism, { showLineNumbers: false, ignoreMissing: true }],
          ],
        },
      },
    });

    // Extract TOC headings from the raw content
    const headings = extractTocHeadings(content);

    return { meta: { ...(meta as any), slug }, content: compiled.content, headings };
  } catch {
    return null;
  }
}

// Get all posts in a specific series, sorted by seriesOrder
export async function getSeriesPosts(
  seriesName: string,
  includeDrafts = false,
): Promise<PostListItem[]> {
  const allPosts = await getAllPosts(includeDrafts);
  const seriesPosts = allPosts.filter((p) => p.series === seriesName);
  return seriesPosts.sort((a, b) => {
    const orderA = a.seriesOrder ?? 999;
    const orderB = b.seriesOrder ?? 999;
    return orderA - orderB;
  });
}

// Get the previous and next posts in a series
export async function getSeriesNavigation(
  slug: string,
): Promise<{
  prev: PostListItem | null;
  next: PostListItem | null;
  allInSeries: PostListItem[];
}> {
  const isDev = process.env.NODE_ENV === 'development';
  const allPosts = await getAllPosts(isDev);
  const currentPost = allPosts.find((p) => p.slug === slug);

  if (!currentPost?.series) {
    return { prev: null, next: null, allInSeries: [] };
  }

  const seriesPosts = await getSeriesPosts(currentPost.series, isDev);
  const currentIndex = seriesPosts.findIndex((p) => p.slug === slug);

  return {
    prev: currentIndex > 0 ? seriesPosts[currentIndex - 1] : null,
    next: currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null,
    allInSeries: seriesPosts,
  };
}

/**
 * Get related posts based on shared tags and recency
 * @param slug - Current post slug to find related posts for
 * @param limit - Maximum number of related posts to return (default: 3)
 * @returns Array of related posts, sorted by relevance
 */
export async function getRelatedPosts(slug: string, limit = 3): Promise<PostListItem[]> {
  const isDev = process.env.NODE_ENV === 'development';
  const allPosts = await getAllPosts(isDev);
  const currentPost = allPosts.find((p) => p.slug === slug);

  if (!currentPost) {
    return [];
  }

  // Calculate relevance score for each post
  const postsWithScores = allPosts
    .filter((p) => p.slug !== slug) // Exclude current post
    .map((post) => {
      let score = 0;

      // Score based on shared tags (most important factor)
      if (currentPost.tags && post.tags) {
        const sharedTags = currentPost.tags.filter((tag) => post.tags?.includes(tag));
        score += sharedTags.length * 10; // 10 points per shared tag
      }

      // Bonus for posts in the same series
      if (currentPost.series && post.series === currentPost.series) {
        score += 15;
      }

      // Small recency bonus (newer posts get slight preference)
      const daysSincePublished = Math.floor(
        (new Date().getTime() - new Date(post.date).getTime()) / (1000 * 60 * 60 * 24),
      );
      const recencyScore = Math.max(0, 5 - daysSincePublished / 100); // Up to 5 points
      score += recencyScore;

      return { post, score };
    })
    .filter((item) => item.score > 0) // Only include posts with some relevance
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, limit) // Take top N
    .map((item) => item.post);

  return postsWithScores;
}
