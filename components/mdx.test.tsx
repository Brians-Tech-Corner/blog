import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mdxComponents } from './mdx';

describe('mdxComponents', () => {
  describe('a (link) component', () => {
    it('should render internal links with Next.js Link', () => {
      const LinkComponent = mdxComponents.a;
      render(<LinkComponent href="/about">About</LinkComponent>);

      const link = screen.getByText('About');
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/about');
    });

    it('should render anchor links with Next.js Link', () => {
      const LinkComponent = mdxComponents.a;
      render(<LinkComponent href="#section">Jump to section</LinkComponent>);

      const link = screen.getByText('Jump to section');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '#section');
    });

    it('should render external links with target blank and noreferrer', () => {
      const LinkComponent = mdxComponents.a;
      render(<LinkComponent href="https://example.com">External</LinkComponent>);

      const link = screen.getByText('External');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    });
  });

  it('should include Callout component', () => {
    expect(mdxComponents.Callout).toBeDefined();
  });
});
