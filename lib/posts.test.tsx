import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllPosts, getAllPostSlugs } from './posts';

// Mock the fs module
vi.mock('node:fs/promises', () => ({
  default: {
    readdir: vi.fn(),
    readFile: vi.fn(),
  },
}));

// Import the mocked module to get access to the mock functions
import fs from 'node:fs/promises';

describe('posts', () => {
  describe('getAllPostSlugs', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should return slugs from MDX files', async () => {
      const mockFiles = [
        '2025-12-14-welcome.mdx',
        '2025-12-15-another-post.mdx',
        'README.md', // Should be filtered out
      ];

      vi.mocked(fs.readdir).mockResolvedValue(mockFiles as any);

      const slugs = await getAllPostSlugs();

      expect(slugs).toEqual(['2025-12-14-welcome', '2025-12-15-another-post']);
    });

    it('should handle empty directory', async () => {
      vi.mocked(fs.readdir).mockResolvedValue([] as any);

      const slugs = await getAllPostSlugs();

      expect(slugs).toEqual([]);
    });
  });

  describe('getAllPosts', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should filter out draft posts by default', async () => {
      const mockFiles = ['post1.mdx', 'post2.mdx'];
      const mockPostContent = `---
title: "Test Post"
date: "2025-12-14"
description: "A test post"
tags: ["test"]
draft: true
---

Content here`;

      vi.mocked(fs.readdir).mockResolvedValue(mockFiles as any);
      vi.mocked(fs.readFile).mockResolvedValue(mockPostContent);

      const posts = await getAllPosts();

      expect(posts).toEqual([]);
    });

    it('should include draft posts when explicitly requested', async () => {
      const mockFiles = ['post1.mdx'];
      const mockPostContent = `---
title: "Draft Post"
date: "2025-12-14"
description: "A draft post"
tags: ["test"]
draft: true
---

Content here`;

      vi.mocked(fs.readdir).mockResolvedValue(mockFiles as any);
      vi.mocked(fs.readFile).mockResolvedValue(mockPostContent);

      const posts = await getAllPosts(true);

      expect(posts).toHaveLength(1);
      expect(posts[0].title).toBe('Draft Post');
      expect(posts[0].draft).toBe(true);
    });

    it('should sort posts by date (newest first)', async () => {
      const mockFiles = ['old.mdx', 'new.mdx', 'middle.mdx'];

      const posts = [
        { date: '2025-01-01', content: 'old' },
        { date: '2025-12-14', content: 'new' },
        { date: '2025-06-15', content: 'middle' },
      ];

      vi.mocked(fs.readdir).mockResolvedValue(mockFiles as any);
      vi.mocked(fs.readFile).mockImplementation((path) => {
        const filename = path.toString().split('/').pop();
        const post = posts.find((p) => filename?.includes(p.content));
        return Promise.resolve(`---
title: "${post?.content}"
date: "${post?.date}"
---

Content`) as any;
      });

      const result = await getAllPosts();

      expect(result[0].title).toBe('new');
      expect(result[1].title).toBe('middle');
      expect(result[2].title).toBe('old');
    });

    it('should include slug in returned posts', async () => {
      const mockFiles = ['2025-12-14-my-post.mdx'];
      const mockPostContent = `---
title: "My Post"
date: "2025-12-14"
description: "Test"
---

Content`;

      vi.mocked(fs.readdir).mockResolvedValue(mockFiles as any);
      vi.mocked(fs.readFile).mockResolvedValue(mockPostContent);

      const posts = await getAllPosts();

      expect(posts[0].slug).toBe('2025-12-14-my-post');
    });

    it('should calculate read time based on plain text, not markdown syntax', async () => {
      const mockFiles = ['post-with-markdown.mdx'];
      // Content with markdown syntax: links, bold, italic, code blocks, etc.
      // Plain text would be much shorter than raw content with all the syntax
      const mockPostContent = `---
title: "Post with Markdown"
date: "2025-12-14"
description: "Testing read time calculation"
---

## This is a heading

This is **bold text** and this is *italic text*.

Here's a [link](https://example.com) and some \`inline code\`.

\`\`\`javascript
function example() {
  return "This is a code block";
}
\`\`\`

<Callout type="info">
This is a custom MDX component with some text inside.
</Callout>

- List item 1
- List item 2
- List item 3`;

      vi.mocked(fs.readdir).mockResolvedValue(mockFiles as any);
      vi.mocked(fs.readFile).mockResolvedValue(mockPostContent);

      const posts = await getAllPosts();

      // The readTime should be calculated based on the plain text content
      // After stripping markdown, the word count should be much lower
      expect(posts[0].readTime).toBeDefined();
      expect(posts[0].readTime).toBeGreaterThan(0);

      // With ~50-60 plain words after stripping, should be 1 minute at 200 wpm
      expect(posts[0].readTime).toBe(1);
    });
  });

  describe('compilePostBySlug', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should compile a valid post with headings', async () => {
      const { compilePostBySlug } = await import('./posts');
      const mockPostContent = `---
title: "Test Post"
date: "2025-12-14"
description: "A test post"
tags: ["test"]
---

## First Heading

Some content here.

## Second Heading

More content here.`;

      vi.mocked(fs.readFile).mockResolvedValue(mockPostContent);

      const result = await compilePostBySlug('test-post');

      expect(result).toBeTruthy();
      expect(result?.meta.title).toBe('Test Post');
      expect(result?.meta.slug).toBe('test-post');
      expect(result?.content).toBeDefined();
      expect(result?.headings).toHaveLength(2);
      expect(result?.headings[0].text).toBe('First Heading');
    });

    it('should return null for post without title', async () => {
      const { compilePostBySlug } = await import('./posts');
      const mockPostContent = `---
date: "2025-12-14"
---

Content without title`;

      vi.mocked(fs.readFile).mockResolvedValue(mockPostContent);

      const result = await compilePostBySlug('invalid-post');

      expect(result).toBeNull();
    });

    it('should return null for post without date', async () => {
      const { compilePostBySlug } = await import('./posts');
      const mockPostContent = `---
title: "Test Post"
---

Content without date`;

      vi.mocked(fs.readFile).mockResolvedValue(mockPostContent);

      const result = await compilePostBySlug('invalid-post');

      expect(result).toBeNull();
    });

    it('should return null when file read fails', async () => {
      const { compilePostBySlug } = await import('./posts');

      vi.mocked(fs.readFile).mockRejectedValue(new Error('File not found'));

      const result = await compilePostBySlug('nonexistent-post');

      expect(result).toBeNull();
    });

    it('should extract headings correctly', async () => {
      const { compilePostBySlug } = await import('./posts');
      const mockPostContent = `---
title: "Post with Multiple Headings"
date: "2025-12-14"
---

## Main Section

### Subsection

## Another Section

Regular content.`;

      vi.mocked(fs.readFile).mockResolvedValue(mockPostContent);

      const result = await compilePostBySlug('test-post');

      expect(result?.headings).toHaveLength(3);
      expect(result?.headings[0].level).toBe(2);
      expect(result?.headings[1].level).toBe(3);
      expect(result?.headings[2].level).toBe(2);
    });
  });
});
