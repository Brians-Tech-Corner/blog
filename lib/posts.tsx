import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import removeMd from 'remove-markdown';
import { mdxComponents } from '@/components/mdx';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type PostMeta = {
  title: string;
  date: string; // ISO-ish: YYYY-MM-DD
  description?: string;
  tags?: string[];
  draft?: boolean;
  image?: string; // OpenGraph image path
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
          rehypePlugins: [rehypePrism],
        },
      },
    });

    return { meta: { ...(meta as any), slug }, content: compiled.content };
  } catch {
    return null;
  }
}
