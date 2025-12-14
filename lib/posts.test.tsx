import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { getAllPosts, getAllPostSlugs } from './posts';
import * as fs from 'node:fs/promises';

// Mock the fs module
vi.mock('node:fs/promises', () => ({
  default: {
    readdir: vi.fn(),
    readFile: vi.fn(),
  },
  readdir: vi.fn(),
  readFile: vi.fn(),
}));

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

      (fs.default.readdir as Mock).mockResolvedValue(mockFiles as any);

      const slugs = await getAllPostSlugs();

      expect(slugs).toEqual([
        '2025-12-14-welcome',
        '2025-12-15-another-post',
      ]);
    });

    it('should handle empty directory', async () => {
      (fs.default.readdir as Mock).mockResolvedValue([] as any);

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

      (fs.default.readdir as Mock).mockResolvedValue(mockFiles as any);
      (fs.default.readFile as Mock).mockResolvedValue(mockPostContent);

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

      (fs.default.readdir as Mock).mockResolvedValue(mockFiles as any);
      (fs.default.readFile as Mock).mockResolvedValue(mockPostContent);

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

      (fs.default.readdir as Mock).mockResolvedValue(mockFiles as any);
      (fs.default.readFile as Mock).mockImplementation((path) => {
        const filename = path.toString().split('/').pop();
        const post = posts.find(p => filename?.includes(p.content));
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

      (fs.default.readdir as Mock).mockResolvedValue(mockFiles as any);
      (fs.default.readFile as Mock).mockResolvedValue(mockPostContent);

      const posts = await getAllPosts();

      expect(posts[0].slug).toBe('2025-12-14-my-post');
    });
  });
});
