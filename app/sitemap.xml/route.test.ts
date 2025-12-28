import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllPosts } from '@/lib/posts';
import { GET } from './route';

vi.mock('@/lib/posts');

// Setup default mock data for tests
const mockPosts = [
  {
    slug: '2025-12-14-welcome-to-brians-tech-corner',
    title: 'Welcome to Brian\'s Tech Corner',
    date: '2025-12-14',
    description: 'What this blog is about and what you can expect going forward',
    tags: ['announcement', 'blog', 'welcome'],
  },
];

beforeEach(() => {
  // Reset and setup default mock for most tests
  vi.mocked(getAllPosts).mockResolvedValue(mockPosts as any);
});

// We need to extract and test the toISODateTime function
// Since it's not exported, we'll create a standalone version for testing
function toISODateTime(dateString: string): string {
  // If already in ISO format with timezone, return as-is
  if (dateString.includes('T')) {
    return dateString;
  }

  // Validate YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    throw new Error(`Invalid date format: ${dateString}. Expected YYYY-MM-DD`);
  }

  // Convert YYYY-MM-DD to ISO 8601 datetime at midnight UTC
  const date = new Date(`${dateString}T00:00:00.000Z`);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date value: ${dateString}`);
  }

  return date.toISOString();
}

describe('sitemap.xml route', () => {
  describe('toISODateTime', () => {
    it('should convert YYYY-MM-DD to ISO 8601 format', () => {
      const result = toISODateTime('2025-12-14');
      expect(result).toBe('2025-12-14T00:00:00.000Z');
    });

    it('should return ISO format as-is if already formatted', () => {
      const isoDate = '2025-12-14T10:30:00.000Z';
      const result = toISODateTime(isoDate);
      expect(result).toBe(isoDate);
    });

    it('should handle dates at midnight UTC', () => {
      const result = toISODateTime('2025-01-01');
      expect(result).toBe('2025-01-01T00:00:00.000Z');
    });

    it('should throw error for invalid date format', () => {
      expect(() => toISODateTime('12/14/2025')).toThrow('Invalid date format');
      expect(() => toISODateTime('2025-12-14-extra')).toThrow('Invalid date format');
      expect(() => toISODateTime('not-a-date')).toThrow('Invalid date format');
      expect(() => toISODateTime('')).toThrow('Invalid date format');
    });

    it('should handle month overflow (JavaScript Date behavior)', () => {
      // JavaScript Date auto-corrects invalid dates
      // 2025-02-30 becomes 2025-03-02 (February only has 28 days in 2025)
      const result = toISODateTime('2025-02-30');
      expect(result).toBe('2025-03-02T00:00:00.000Z');
    });

    it('should handle non-leap year February 29', () => {
      // 2025-02-29 becomes 2025-03-01 (2025 is not a leap year)
      const result = toISODateTime('2025-02-29');
      expect(result).toBe('2025-03-01T00:00:00.000Z');
    });

    it('should handle leap years correctly', () => {
      const result = toISODateTime('2024-02-29');
      expect(result).toBe('2024-02-29T00:00:00.000Z');
    });

    it('should handle edge case dates', () => {
      expect(toISODateTime('1970-01-01')).toBe('1970-01-01T00:00:00.000Z');
      expect(toISODateTime('2099-12-31')).toBe('2099-12-31T00:00:00.000Z');
    });
  });

  describe('sitemap generation', () => {
    it('should include all required URLs', async () => {
      const response = await GET();
      const xml = await response.text();

      // Static pages
      expect(xml).toContain('<loc>https://brianstechcorner.com</loc>');
      expect(xml).toContain('<loc>https://brianstechcorner.com/about</loc>');
      expect(xml).toContain('<loc>https://brianstechcorner.com/blog</loc>');
      expect(xml).toContain('<loc>https://brianstechcorner.com/tags</loc>');
      expect(xml).toContain('<loc>https://brianstechcorner.com/archive</loc>');

      // Should have proper XML structure
      expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    });

    it('should include blog posts', async () => {
      const response = await GET();
      const xml = await response.text();

      expect(xml).toContain('<loc>https://brianstechcorner.com/blog/');
    });

    it('should include tag pages for all tags', async () => {
      const response = await GET();
      const xml = await response.text();

      // Should have tag URLs with valid characters (matching non-encoded tag paths)
      expect(xml).toMatch(/<loc>https:\/\/brianstechcorner\.com\/tags\/[\w .-]+<\/loc>/);
    });

    it('should handle tags with spaces and hyphens correctly', async () => {
      vi.mocked(getAllPosts).mockResolvedValueOnce([
        {
          ...mockPosts[0],
          tags: ['hello world', 'dev-tools', ' spaced-tag '],
        },
      ]);

      const response = await GET();
      const xml = await response.text();

      expect(xml).toContain('<loc>https://brianstechcorner.com/tags/hello%20world</loc>');
      expect(xml).toContain('<loc>https://brianstechcorner.com/tags/dev-tools</loc>');
      expect(xml).toContain('<loc>https://brianstechcorner.com/tags/%20spaced-tag%20</loc>');
    });
    it('should include archive year pages', async () => {
      const response = await GET();
      const xml = await response.text();

      // Should have archive URLs with years
      expect(xml).toMatch(/<loc>https:\/\/brianstechcorner\.com\/archive\/\d{4}<\/loc>/);
    });

    it('should have proper lastmod dates', async () => {
      const response = await GET();
      const xml = await response.text();

      // All URLs should have lastmod tags in ISO format
      expect(xml).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z<\/lastmod>/);
    });

    it('should have proper priority values', async () => {
      const response = await GET();
      const xml = await response.text();

      // Homepage should have highest priority
      expect(xml).toContain('<priority>1</priority>');
      // Blog posts should have medium priority
      expect(xml).toContain('<priority>0.7</priority>');
      // Tags and archives should have lower priority
      expect(xml).toContain('<priority>0.5</priority>');
    });

    it('should return proper content-type header', async () => {
      const response = await GET();

      expect(response.headers.get('Content-Type')).toBe(
        'application/xml; charset=utf-8',
      );
    });

    it('should handle empty posts array with default lastmod dates', async () => {
      // Mock getAllPosts to return empty array for this test
      vi.mocked(getAllPosts).mockResolvedValueOnce([]);

      const response = await GET();
      const xml = await response.text();

      // Should still include static pages
      expect(xml).toContain('<loc>https://brianstechcorner.com</loc>');
      expect(xml).toContain('<loc>https://brianstechcorner.com/blog</loc>');
      expect(xml).toContain('<loc>https://brianstechcorner.com/tags</loc>');
      expect(xml).toContain('<loc>https://brianstechcorner.com/archive</loc>');

      // Blog, tags, and archive pages should use default lastmod (2024-01-01)
      const blogMatch = xml.match(
        /<url>[\s\S]*?<loc>https:\/\/brianstechcorner\.com\/blog<\/loc>[\s\S]*?<lastmod>(.*?)<\/lastmod>/,
      );
      expect(blogMatch).toBeTruthy();
      expect(blogMatch?.[1]).toBe('2024-01-01T00:00:00.000Z');

      const tagsMatch = xml.match(
        /<url>[\s\S]*?<loc>https:\/\/brianstechcorner\.com\/tags<\/loc>[\s\S]*?<lastmod>(.*?)<\/lastmod>/,
      );
      expect(tagsMatch).toBeTruthy();
      expect(tagsMatch?.[1]).toBe('2024-01-01T00:00:00.000Z');

      const archiveMatch = xml.match(
        /<url>[\s\S]*?<loc>https:\/\/brianstechcorner\.com\/archive<\/loc>[\s\S]*?<lastmod>(.*?)<\/lastmod>/,
      );
      expect(archiveMatch).toBeTruthy();
      expect(archiveMatch?.[1]).toBe('2024-01-01T00:00:00.000Z');

      // Should not have any blog post, tag, or archive year URLs
      expect(xml).not.toMatch(/<loc>https:\/\/brianstechcorner\.com\/blog\/[^<]+<\/loc>/);
      expect(xml).not.toMatch(/<loc>https:\/\/brianstechcorner\.com\/tags\/[^<]+<\/loc>/);
      expect(xml).not.toMatch(/<loc>https:\/\/brianstechcorner\.com\/archive\/\d{4}<\/loc>/);
    });

    it('should handle posts without tags', async () => {
      // Mock posts with no tags to test tag page generation with posts
      vi.mocked(getAllPosts).mockResolvedValueOnce([
        {
          slug: 'test-post',
          title: 'Test Post',
          date: '2025-12-15',
          description: 'Test',
          tags: undefined,
        },
      ] as any);

      const response = await GET();
      const xml = await response.text();

      // Should include the blog post
      expect(xml).toContain('<loc>https://brianstechcorner.com/blog/test-post</loc>');
      // Should not have any tag pages since there are no tags
      expect(xml).not.toMatch(/<loc>https:\/\/brianstechcorner\.com\/tags\/[^<]+<\/loc>/);
      // Should have archive page for 2025
      expect(xml).toContain('<loc>https://brianstechcorner.com/archive/2025</loc>');
    });
  });
});
