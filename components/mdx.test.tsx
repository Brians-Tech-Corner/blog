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

  describe('pre (code block) component', () => {
    it('should wrap pre elements with CodeBlock', () => {
      const PreComponent = mdxComponents.pre;
      const mockCode = (
        <code className="language-javascript">const x = 1;</code>
      );
      
      const { container } = render(<PreComponent>{mockCode}</PreComponent>);
      
      // Should have the CodeBlock wrapper (group div)
      expect(container.querySelector('.group')).toBeInTheDocument();
    });

    it('should handle children as array', () => {
      const PreComponent = mdxComponents.pre;
      const mockCode = [
        <code key="1" className="language-typescript">const x = 1;</code>,
      ];
      
      const { container } = render(<PreComponent>{mockCode}</PreComponent>);
      
      expect(container.querySelector('.group')).toBeInTheDocument();
    });

    it('should extract className from code element', () => {
      const PreComponent = mdxComponents.pre;
      const mockCode = (
        <code className="language-python">print(&quot;hello&quot;)</code>
      );
      
      render(<PreComponent>{mockCode}</PreComponent>);
      
      // Language badge should be shown
      expect(screen.getByText('python')).toBeInTheDocument();
    });

    it('should pass filename prop to CodeBlock', () => {
      const PreComponent = mdxComponents.pre;
      const mockCode = (
        <code className="language-typescript">const x = 1;</code>
      );
      
      render(<PreComponent data-filename="example.ts">{mockCode}</PreComponent>);
      
      // Filename should be displayed
      expect(screen.getByText('example.ts')).toBeInTheDocument();
    });
  });

  describe('Custom components', () => {
    it('should include Callout component', () => {
      expect(mdxComponents.Callout).toBeDefined();
    });

    it('should include Mermaid component', () => {
      expect(mdxComponents.Mermaid).toBeDefined();
    });

    it('should include ClickableImage component', () => {
      expect(mdxComponents.ClickableImage).toBeDefined();
    });
  });
});
