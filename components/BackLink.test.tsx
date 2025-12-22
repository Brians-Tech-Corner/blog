import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BackLink } from './BackLink';

describe('BackLink', () => {
  it('renders with correct href and children', () => {
    render(<BackLink href="/blog">Back to blog</BackLink>);
    
    const link = screen.getByRole('link', { name: /Back to blog/i });
    expect(link).toHaveAttribute('href', '/blog');
    expect(link).toHaveTextContent('Back to blog');
  });

  it('renders SVG back arrow icon', () => {
    render(<BackLink href="/archive">All archives</BackLink>);
    
    const link = screen.getByRole('link', { name: /All archives/i });
    const svg = link.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('applies correct styling classes', () => {
    render(<BackLink href="/tags">All tags</BackLink>);
    
    const link = screen.getByRole('link', { name: /All tags/i });
    expect(link).toHaveClass('inline-flex', 'items-center', 'gap-1.5', 'text-sm');
  });

  it('renders with custom href paths', () => {
    const customPaths = [
      { href: '/blog', text: 'Back to blog' },
      { href: '/archive', text: 'All archives' },
      { href: '/tags', text: 'All tags' },
    ];

    customPaths.forEach(({ href, text }) => {
      const { unmount } = render(<BackLink href={href}>{text}</BackLink>);
      const link = screen.getByRole('link', { name: new RegExp(text, 'i') });
      expect(link).toHaveAttribute('href', href);
      unmount();
    });
  });
});
