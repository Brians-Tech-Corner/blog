import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getBlogPostingSchema,
  getBreadcrumbSchema,
  JsonLd,
} from './json-ld';
import type { PostMeta } from './posts';

describe('json-ld', () => {
  const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://test.example.com';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
  });

  describe('getOrganizationSchema', () => {
    it('should return valid Organization schema', () => {
      const schema = getOrganizationSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBe("Brian's Tech Corner");
      expect(schema.url).toBe('https://test.example.com');
      expect(schema.logo).toBe('https://test.example.com/brand/X-Banner-Blue.jpg');
      expect(schema.description).toContain('Homelab');
    });

    it('should include social media profiles in sameAs', () => {
      const schema = getOrganizationSchema();

      expect(schema.sameAs).toBeDefined();
      expect(Array.isArray(schema.sameAs)).toBe(true);
      expect(schema.sameAs).toContain('https://github.com/brians-tech-corner');
      expect(schema.sameAs).toContain('https://x.com/brianstechcorn');
      expect(schema.sameAs).toContain('https://www.youtube.com/@brianstechcorner');
    });

    it('should use fallback URL when NEXT_PUBLIC_SITE_URL is not set', () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      const schema = getOrganizationSchema();

      expect(schema.url).toBe('https://brianstechcorner.com');
    });
  });

  describe('getWebSiteSchema', () => {
    it('should return valid WebSite schema', () => {
      const schema = getWebSiteSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('WebSite');
      expect(schema.name).toBe("Brian's Tech Corner");
      expect(schema.url).toBe('https://test.example.com');
      expect(schema.description).toContain('Homelab');
    });

    it('should include SearchAction with correct target', () => {
      const schema = getWebSiteSchema();

      expect(schema.potentialAction).toBeDefined();
      expect(schema.potentialAction['@type']).toBe('SearchAction');
      expect(schema.potentialAction.target['@type']).toBe('EntryPoint');
      expect(schema.potentialAction.target.urlTemplate).toBe(
        'https://test.example.com/blog?q={search_term_string}',
      );
      expect(schema.potentialAction['query-input']).toBe(
        'required name=search_term_string',
      );
    });

    it('should use fallback URL when NEXT_PUBLIC_SITE_URL is not set', () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      const schema = getWebSiteSchema();

      expect(schema.url).toBe('https://brianstechcorner.com');
    });
  });

  describe('getBlogPostingSchema', () => {
    const mockPost: PostMeta & { slug: string } = {
      title: 'Test Post',
      date: '2025-12-24',
      description: 'Test description',
      tags: ['test', 'blog'],
      slug: 'test-post',
    };

    it('should return valid BlogPosting schema', () => {
      const schema = getBlogPostingSchema(mockPost);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BlogPosting');
      expect(schema.headline).toBe('Test Post');
      expect(schema.description).toBe('Test description');
      expect(schema.datePublished).toBe('2025-12-24');
      expect(schema.dateModified).toBe('2025-12-24');
    });

    it('should include author information', () => {
      const schema = getBlogPostingSchema(mockPost);

      expect(schema.author).toBeDefined();
      expect(schema.author['@type']).toBe('Person');
      expect(schema.author.name).toBe('Brian');
      expect(schema.author.url).toBe('https://test.example.com/about');
    });

    it('should include publisher information with logo', () => {
      const schema = getBlogPostingSchema(mockPost);

      expect(schema.publisher).toBeDefined();
      expect(schema.publisher['@type']).toBe('Organization');
      expect(schema.publisher.name).toBe("Brian's Tech Corner");
      expect(schema.publisher.logo['@type']).toBe('ImageObject');
      expect(schema.publisher.logo.url).toBe(
        'https://test.example.com/brand/X-Banner-Blue.jpg',
      );
    });

    it('should include mainEntityOfPage with post URL', () => {
      const schema = getBlogPostingSchema(mockPost);

      expect(schema.mainEntityOfPage).toBeDefined();
      expect(schema.mainEntityOfPage['@type']).toBe('WebPage');
      expect(schema.mainEntityOfPage['@id']).toBe(
        'https://test.example.com/blog/test-post',
      );
    });

    it('should use custom image when provided', () => {
      const postWithImage = { ...mockPost, image: '/images/custom.png' };
      const schema = getBlogPostingSchema(postWithImage);

      expect(schema.image).toBe('https://test.example.com/images/custom.png');
    });

    it('should use default image when no custom image provided', () => {
      const schema = getBlogPostingSchema(mockPost);

      expect(schema.image).toBe('https://test.example.com/brand/X-Banner-Blue.jpg');
    });

    it('should include keywords from tags', () => {
      const schema = getBlogPostingSchema(mockPost);

      expect(schema.keywords).toBe('test, blog');
    });

    it('should handle post without tags', () => {
      const postWithoutTags = { ...mockPost, tags: undefined };
      const schema = getBlogPostingSchema(postWithoutTags);

      expect(schema.keywords).toBeUndefined();
    });

    it('should use title as description fallback', () => {
      const postWithoutDescription = { ...mockPost, description: undefined };
      const schema = getBlogPostingSchema(postWithoutDescription);

      expect(schema.description).toBe('Test Post');
    });
  });

  describe('getBreadcrumbSchema', () => {
    it('should return valid BreadcrumbList schema', () => {
      const items = [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
      ];
      const schema = getBreadcrumbSchema(items);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(2);
    });

    it('should correctly map items with positions', () => {
      const items = [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: 'Post', url: '/blog/post' },
      ];
      const schema = getBreadcrumbSchema(items);

      expect(schema.itemListElement[0]).toEqual({
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://test.example.com/',
      });
      expect(schema.itemListElement[1]).toEqual({
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://test.example.com/blog',
      });
      expect(schema.itemListElement[2]).toEqual({
        '@type': 'ListItem',
        position: 3,
        name: 'Post',
        item: 'https://test.example.com/blog/post',
      });
    });

    it('should handle empty items array', () => {
      const schema = getBreadcrumbSchema([]);

      expect(schema.itemListElement).toHaveLength(0);
      expect(Array.isArray(schema.itemListElement)).toBe(true);
    });

    it('should handle single item', () => {
      const items = [{ name: 'Home', url: '/' }];
      const schema = getBreadcrumbSchema(items);

      expect(schema.itemListElement).toHaveLength(1);
      expect(schema.itemListElement[0].position).toBe(1);
    });
  });

  describe('JsonLd component', () => {
    it('should render script tag with JSON-LD data', () => {
      const data = { '@type': 'Organization', name: 'Test' };
      const { container } = render(<JsonLd data={data} />);

      const script = container.querySelector('script[type="application/ld+json"]');
      expect(script).toBeTruthy();
      expect(script?.textContent).toBe(JSON.stringify(data));
    });

    it('should render complex nested schema', () => {
      const data = getOrganizationSchema();
      const { container } = render(<JsonLd data={data} />);

      const script = container.querySelector('script[type="application/ld+json"]');
      expect(script).toBeTruthy();

      const parsed = JSON.parse(script?.textContent || '{}');
      expect(parsed['@type']).toBe('Organization');
      expect(parsed.name).toBe("Brian's Tech Corner");
    });

    it('should handle empty object', () => {
      const { container } = render(<JsonLd data={{}} />);

      const script = container.querySelector('script[type="application/ld+json"]');
      expect(script).toBeTruthy();
      expect(script?.textContent).toBe('{}');
    });
  });
});
