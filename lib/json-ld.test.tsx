import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getBlogPostingSchema,
  getBreadcrumbSchema,
  JsonLd,
  safeJsonLdStringify,
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

    it('should not include SearchAction (removed due to insufficient search implementation)', () => {
      const schema = getWebSiteSchema();

      // SearchAction was removed because the blog's search is primarily
      // a client-side filtering mechanism without dedicated search result pages
      expect('potentialAction' in schema).toBe(false);
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

  describe('safeJsonLdStringify (XSS Prevention)', () => {
    it('should escape less-than signs to prevent script injection', () => {
      const data = { title: '<script>alert("xss")</script>' };
      const result = safeJsonLdStringify(data);

      expect(result).toContain('\\u003Cscript\\u003E');
      expect(result).not.toContain('<script>');
    });

    it('should escape greater-than signs to prevent tag closure', () => {
      const data = { content: 'Hello > World' };
      const result = safeJsonLdStringify(data);

      expect(result).toContain('\\u003E');
      expect(result).not.toContain('>');
    });

    it('should escape ampersands to prevent HTML entity issues', () => {
      const data = { text: 'A & B' };
      const result = safeJsonLdStringify(data);

      expect(result).toContain('\\u0026');
      expect(result).not.toContain('&');
    });

    it('should escape forward slashes to prevent </script> breakout', () => {
      const data = { url: 'https://example.com/path' };
      const result = safeJsonLdStringify(data);

      expect(result).toContain('\\/');
      // Should still be parseable as valid JSON
      const parsed = JSON.parse(result);
      expect(parsed.url).toBe('https://example.com/path');
    });

    it('should prevent </script> tag injection attack', () => {
      const data = { evil: '</script><script>alert("hacked")</script>' };
      const result = safeJsonLdStringify(data);

      // Verify the dangerous sequence is escaped
      expect(result).toContain('\\u003C\\/script\\u003E');
      expect(result).not.toContain('</script>');
      expect(result).not.toContain('<script>');
    });

    it('should handle all dangerous characters in one string', () => {
      const data = { mixed: '</script><img src=x onerror=alert(1)>&' };
      const result = safeJsonLdStringify(data);

      expect(result).not.toContain('</script>');
      expect(result).not.toContain('<img');
      expect(result).not.toContain('>');
      expect(result).not.toContain('&');
      expect(result).toContain('\\u003C');
      expect(result).toContain('\\u003E');
      expect(result).toContain('\\u0026');
    });

    it('should preserve valid JSON structure after escaping', () => {
      const data = {
        name: 'Test <Company>',
        url: 'https://example.com/path',
        description: 'A & B > C',
      };
      const result = safeJsonLdStringify(data);

      // Should still be valid JSON that can be parsed back
      const parsed = JSON.parse(result);
      expect(parsed.name).toBe('Test <Company>');
      expect(parsed.url).toBe('https://example.com/path');
      expect(parsed.description).toBe('A & B > C');
    });

    it('should handle nested objects with dangerous characters', () => {
      const data = {
        outer: {
          inner: {
            evil: '</script>',
            safe: 'normal text',
          },
        },
      };
      const result = safeJsonLdStringify(data);

      expect(result).not.toContain('</script>');
      const parsed = JSON.parse(result);
      expect(parsed.outer.inner.evil).toBe('</script>');
    });

    it('should handle arrays with dangerous characters', () => {
      const data = {
        items: ['<script>', 'normal', '</script>', 'A & B'],
      };
      const result = safeJsonLdStringify(data);

      expect(result).not.toContain('<script>');
      expect(result).not.toContain('</script>');
      expect(result).not.toContain('&');
      const parsed = JSON.parse(result);
      expect(parsed.items).toEqual(['<script>', 'normal', '</script>', 'A & B']);
    });

    it('should handle edge case: empty strings and null values', () => {
      const data = { empty: '', nullVal: null, undef: undefined };
      const result = safeJsonLdStringify(data);

      expect(() => JSON.parse(result)).not.toThrow();
      const parsed = JSON.parse(result);
      expect(parsed.empty).toBe('');
      expect(parsed.nullVal).toBeNull();
      // undefined is dropped by JSON.stringify
      expect(parsed.undef).toBeUndefined();
    });

    it('should be used by JsonLd component for XSS protection', () => {
      const data = { evil: '</script><script>alert(1)</script>' };
      const { container } = render(<JsonLd data={data} />);

      const script = container.querySelector('script[type="application/ld+json"]');
      const content = script?.textContent || '';

      // Verify dangerous content is escaped in the rendered output
      expect(content).not.toContain('</script><script>');
      expect(content).toContain('\\u003C\\/script\\u003E');
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
