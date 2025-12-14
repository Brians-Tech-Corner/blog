import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlogSidebar } from './BlogSidebar';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

const { useSearchParams } = await import('next/navigation');

describe('BlogSidebar', () => {
  const mockProps = {
    allTags: ['React', 'TypeScript', 'Testing', 'Next.js'],
    postCount: 15,
    archivesByYear: [
      { year: '2025', count: 8 },
      { year: '2024', count: 7 },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Stats section', () => {
    it('renders total post count', () => {
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as any);
      render(<BlogSidebar {...mockProps} />);
      expect(screen.getByText('Total Posts')).toBeInTheDocument();
      expect(screen.getByText('15')).toBeInTheDocument();
    });

    it('renders categories count', () => {
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as any);
      render(<BlogSidebar {...mockProps} />);
      expect(screen.getByText('Categories')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
    });
  });

  describe('Tag filters section', () => {
    it('renders all tags', () => {
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as any);
      const { container } = render(<BlogSidebar {...mockProps} />);
      const tagsSection = screen.getByText('Tags').closest('div');
      expect(tagsSection?.textContent).toContain('React');
      expect(tagsSection?.textContent).toContain('TypeScript');
      expect(tagsSection?.textContent).toContain('Testing');
      expect(tagsSection?.textContent).toContain('Next.js');
    });

    it('renders "All" tag filter', () => {
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as any);
      render(<BlogSidebar {...mockProps} />);
      expect(screen.getByText('All')).toBeInTheDocument();
    });

    it('highlights "All" when no tag is selected', () => {
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as any);
      render(<BlogSidebar {...mockProps} />);
      const allLink = screen.getByText('All').closest('a');
      expect(allLink).toHaveClass('border-zinc-900', 'bg-zinc-900', 'text-white');
    });

    it('highlights selected tag', () => {
      const params = new URLSearchParams();
      params.set('tag', 'React');
      vi.mocked(useSearchParams).mockReturnValue(params as any);
      const { container } = render(<BlogSidebar {...mockProps} />);
      const tagsSection = screen.getByText('Tags').closest('div');
      const reactLink = tagsSection?.querySelector('a[href="/blog?tag=React"]');
      expect(reactLink).toHaveClass('border-zinc-900', 'bg-zinc-900', 'text-white');
    });

    it('does not highlight unselected tags', () => {
      const params = new URLSearchParams();
      params.set('tag', 'React');
      vi.mocked(useSearchParams).mockReturnValue(params as any);
      const { container } = render(<BlogSidebar {...mockProps} />);
      const tagsSection = screen.getByText('Tags').closest('div');
      const typeScriptLink = tagsSection?.querySelector('a[href="/blog?tag=TypeScript"]');
      expect(typeScriptLink).toHaveClass('border-zinc-200', 'bg-white', 'text-zinc-800');
    });

    it('does not render tags section when no tags exist', () => {
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as any);
      const { container } = render(
        <BlogSidebar {...mockProps} allTags={[]} />
      );
      expect(container.textContent).not.toContain('Tags');
    });
  });

  describe('URL building logic', () => {
    it('builds URL with only tag parameter', () => {
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as any);
      const { container } = render(<BlogSidebar {...mockProps} />);
      // Find the Tags section
      const tagsSection = screen.getByText('Tags').closest('div');
      const reactLink = tagsSection?.querySelector('a[href="/blog?tag=React"]');
      expect(reactLink).toHaveAttribute('href', '/blog?tag=React');
    });

    it('builds URL with both search query and tag parameters', () => {
      const params = new URLSearchParams();
      params.set('q', 'test query');
      vi.mocked(useSearchParams).mockReturnValue(params as any);
      const { container } = render(<BlogSidebar {...mockProps} />);
      // Find the Tags section
      const tagsSection = screen.getByText('Tags').closest('div');
      const reactLink = tagsSection?.querySelector('a[href="/blog?q=test+query&tag=React"]');
      expect(reactLink).toHaveAttribute('href', '/blog?q=test+query&tag=React');
    });

    it('builds URL preserving search query when clicking "All"', () => {
      const params = new URLSearchParams();
      params.set('q', 'test query');
      params.set('tag', 'React');
      vi.mocked(useSearchParams).mockReturnValue(params as any);
      render(<BlogSidebar {...mockProps} />);
      const allLink = screen.getByText('All').closest('a');
      expect(allLink).toHaveAttribute('href', '/blog?q=test+query');
    });

    it('builds URL without parameters when clicking "All" with no search query', () => {
      const params = new URLSearchParams();
      params.set('tag', 'React');
      vi.mocked(useSearchParams).mockReturnValue(params as any);
      render(<BlogSidebar {...mockProps} />);
      const allLink = screen.getByText('All').closest('a');
      expect(allLink).toHaveAttribute('href', '/blog');
    });

    it('builds URL with tag in popular topics section', () => {
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as any);
      const { container } = render(<BlogSidebar {...mockProps} />);
      // Find the Popular Topics section
      const popularSection = screen.getByText('Popular Topics').closest('div');
      const popularTopicLink = popularSection?.querySelector('a[href="/blog?tag=React"]');
      expect(popularTopicLink).toHaveAttribute('href', '/blog?tag=React');
    });
  });

  describe('Archives section', () => {
    it('renders archive years and counts', () => {
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as any);
      render(<BlogSidebar {...mockProps} />);
      expect(screen.getByText('Archives')).toBeInTheDocument();
      expect(screen.getByText('2025')).toBeInTheDocument();
      expect(screen.getByText('(8)')).toBeInTheDocument();
      expect(screen.getByText('2024')).toBeInTheDocument();
      expect(screen.getByText('(7)')).toBeInTheDocument();
    });

    it('does not render archives section when no archives exist', () => {
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as any);
      const { container } = render(
        <BlogSidebar {...mockProps} archivesByYear={[]} />
      );
      expect(container.textContent).not.toContain('Archives');
    });
  });

  describe('Popular Topics section', () => {
    it('renders popular topics header', () => {
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as any);
      render(<BlogSidebar {...mockProps} />);
      expect(screen.getByText('Popular Topics')).toBeInTheDocument();
    });

    it('renders up to 6 tags in popular topics', () => {
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as any);
      const manyTags = ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5', 'Tag6', 'Tag7', 'Tag8'];
      render(<BlogSidebar {...mockProps} allTags={manyTags} />);
      
      // Popular Topics section should have exactly 6 tags
      const popularSection = screen.getByText('Popular Topics').closest('div');
      const links = popularSection?.querySelectorAll('a') || [];
      expect(links.length).toBe(6);
    });

    it('renders fewer than 6 tags when less are available', () => {
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as any);
      const fewTags = ['Tag1', 'Tag2', 'Tag3'];
      render(<BlogSidebar {...mockProps} allTags={fewTags} />);
      
      const popularSection = screen.getByText('Popular Topics').closest('div');
      const links = popularSection?.querySelectorAll('a') || [];
      expect(links.length).toBe(3);
    });
  });

  describe('Edge cases', () => {
    it('handles empty props gracefully', () => {
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as any);
      render(
        <BlogSidebar
          allTags={[]}
          postCount={0}
          archivesByYear={[]}
        />
      );
      // Should still render stats section
      expect(screen.getByText('Total Posts')).toBeInTheDocument();
      // Use getAllByText since '0' appears twice (post count and categories count)
      const zeros = screen.getAllByText('0');
      expect(zeros.length).toBe(2);
    });

    it('handles tags with special characters in URLs', () => {
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as any);
      render(
        <BlogSidebar
          {...mockProps}
          allTags={['React & Redux', 'C++']}
        />
      );
      // Get all occurrences and check the first one (in the Tags section)
      const reactReduxLinks = screen.getAllByText('React & Redux');
      const reactReduxLink = reactReduxLinks[0].closest('a');
      expect(reactReduxLink).toHaveAttribute('href', '/blog?tag=React+%26+Redux');
    });
  });
});
