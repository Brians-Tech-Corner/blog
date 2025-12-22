import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { BlogSidebar } from './BlogSidebar';
import { useSearchParams } from 'next/navigation';

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

describe('BlogSidebar', () => {
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useSearchParams).mockReturnValue(mockSearchParams as any);
  });

  it('renders post count and tag count in stats section', () => {
    render(
      <BlogSidebar
        allTags={['kubernetes', 'homelab', 'docker']}
        postCount={10}
        archivesByYear={[]}
      />,
    );

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Total Posts')).toBeInTheDocument();
    
    // Stats section has "Tags" label (appears in multiple places, so just verify it exists)
    const allTagsText = screen.getAllByText('Tags');
    expect(allTagsText.length).toBeGreaterThan(0);
  });

  it('renders tags with "View all" link', () => {
    render(
      <BlogSidebar
        allTags={['kubernetes', 'homelab']}
        postCount={5}
        archivesByYear={[]}
      />,
    );

    // Find the Tags section by heading
    const tagsHeadings = screen.getAllByText('Tags');
    const tagsHeading = tagsHeadings.find(el => el.tagName === 'H3');
    const tagsSection = tagsHeading!.closest('div');

    // Use within to scope to the tags section
    const viewAllLink = within(tagsSection!).getByRole('link', { name: /View all →/i });
    expect(viewAllLink).toHaveAttribute('href', '/tags');
    
    // Verify tags appear (using getAllByText since tags also appear in Popular Topics)
    expect(screen.getAllByText('kubernetes').length).toBeGreaterThan(0);
    expect(screen.getAllByText('homelab').length).toBeGreaterThan(0);
  });

  it('renders archives with year links and "View all" link', () => {
    render(
      <BlogSidebar
        allTags={['test']}
        postCount={5}
        archivesByYear={[
          { year: '2025', count: 3 },
          { year: '2024', count: 2 },
        ]}
      />,
    );

    // Find the Archives heading and get the parent section
    const archivesHeading = screen.getByText('Archives');
    const archivesSection = archivesHeading.closest('.rounded-xl') as HTMLElement;

    // Use within to scope to the archives section
    const viewAllLink = within(archivesSection).getByRole('link', { name: /View all →/i });
    expect(viewAllLink).toHaveAttribute('href', '/archive');

    const year2025Link = within(archivesSection).getByText('2025').closest('a');
    expect(year2025Link).toHaveAttribute('href', '/archive/2025');

    const year2024Link = within(archivesSection).getByText('2024').closest('a');
    expect(year2024Link).toHaveAttribute('href', '/archive/2024');

    expect(screen.getByText('(3)')).toBeInTheDocument();
    expect(screen.getByText('(2)')).toBeInTheDocument();
  });

  it('highlights selected tag when present in search params', () => {
    const selectedParams = new URLSearchParams('tag=kubernetes');
    vi.mocked(useSearchParams).mockReturnValue(selectedParams as any);

    render(
      <BlogSidebar
        allTags={['kubernetes', 'homelab']}
        postCount={5}
        archivesByYear={[]}
      />,
    );

    // Find the Tags section - get all Tags headings and find the one that's an H3
    const tagsHeadings = screen.getAllByText('Tags');
    const tagsHeading = tagsHeadings.find(el => el.tagName === 'H3');
    const tagsSection = tagsHeading!.closest('.rounded-xl') as HTMLElement;

    // Find kubernetes link in the Tags section using within and getAllByRole
    const allLinks = within(tagsSection).getAllByRole('link');
    const kubernetesLink = allLinks.find(link => link.textContent === 'kubernetes');
    expect(kubernetesLink).toHaveClass('border-zinc-900', 'bg-zinc-900', 'text-white');
  });

  it('preserves search query when filtering by tag', () => {
    const searchParams = new URLSearchParams('q=test');
    vi.mocked(useSearchParams).mockReturnValue(searchParams as any);

    render(
      <BlogSidebar
        allTags={['kubernetes']}
        postCount={5}
        archivesByYear={[]}
      />,
    );

    // Find the Tags section - get all Tags headings and find the one that's an H3
    const tagsHeadings = screen.getAllByText('Tags');
    const tagsHeading = tagsHeadings.find(el => el.tagName === 'H3');
    const tagsSection = tagsHeading!.closest('.rounded-xl') as HTMLElement;

    // Find kubernetes link in the Tags section using within and getAllByRole
    const allLinks = within(tagsSection).getAllByRole('link');
    const kubernetesLink = allLinks.find(link => link.textContent === 'kubernetes');
    expect(kubernetesLink).toHaveAttribute('href', '/blog?q=test&tag=kubernetes');
  });

  it('renders "All" tag filter link', () => {
    render(
      <BlogSidebar
        allTags={['kubernetes']}
        postCount={5}
        archivesByYear={[]}
      />,
    );

    const allLink = screen.getByRole('link', { name: 'All' });
    expect(allLink).toHaveAttribute('href', '/blog');
  });

  it('renders popular topics section with top 6 tags', () => {
    const manyTags = Array.from({ length: 10 }, (_, i) => `tag${i + 1}`);

    render(
      <BlogSidebar allTags={manyTags} postCount={5} archivesByYear={[]} />,
    );

    expect(screen.getByText('Popular Topics')).toBeInTheDocument();
    
    // Should render first 6 tags
    expect(screen.getAllByText('tag1')).toHaveLength(2); // Once in main section, once in popular
    expect(screen.getAllByText('tag6')).toHaveLength(2);
    
    // Should not render 7th tag in popular topics (only in main section)
    const tag7Elements = screen.getAllByText('tag7');
    expect(tag7Elements).toHaveLength(1);
  });

  it('does not render tags section when no tags provided', () => {
    render(<BlogSidebar allTags={[]} postCount={5} archivesByYear={[]} />);

    expect(screen.queryByText('View all →')).not.toBeInTheDocument();
    expect(screen.queryByText('All')).not.toBeInTheDocument();
  });

  it('does not render archives section when no years provided', () => {
    render(<BlogSidebar allTags={['test']} postCount={5} archivesByYear={[]} />);

    expect(screen.queryByText('Archives')).not.toBeInTheDocument();
  });
});
