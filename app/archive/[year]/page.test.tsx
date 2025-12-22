import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArchiveYearPage, { generateStaticParams, generateMetadata } from './page';
import { getAllPosts } from '@/lib/posts';

// Mock the posts module
vi.mock('@/lib/posts', () => ({
  getAllPosts: vi.fn(async () => [
    {
      slug: 'post-2025-1',
      title: '2025 Post 1',
      date: '2025-12-14',
      description: 'First 2025 post',
      tags: ['test'],
    },
    {
      slug: 'post-2025-2',
      title: '2025 Post 2',
      date: '2025-06-10',
      description: 'Second 2025 post',
      tags: ['test'],
    },
    {
      slug: 'post-2024',
      title: '2024 Post',
      date: '2024-12-01',
      description: 'A 2024 post',
      tags: ['test'],
    },
  ]),
}));

describe('ArchiveYearPage', () => {
  it('renders the year page with correct title', async () => {
    const params = Promise.resolve({ year: '2025' });
    render(await ArchiveYearPage({ params }));
    
    expect(screen.getByRole('heading', { name: /Posts from 2025/i })).toBeInTheDocument();
  });

  it('filters and displays posts from the specified year', async () => {
    const params = Promise.resolve({ year: '2025' });
    render(await ArchiveYearPage({ params }));
    
    expect(screen.getByText('2025 Post 1')).toBeInTheDocument();
    expect(screen.getByText('2025 Post 2')).toBeInTheDocument();
    expect(screen.queryByText('2024 Post')).not.toBeInTheDocument();
  });

  it('displays correct post count', async () => {
    const params = Promise.resolve({ year: '2025' });
    render(await ArchiveYearPage({ params }));
    
    expect(screen.getByText('2 posts published')).toBeInTheDocument();
  });

  it('handles singular post count correctly', async () => {
    const params = Promise.resolve({ year: '2024' });
    render(await ArchiveYearPage({ params }));
    
    expect(screen.getByText('1 post published')).toBeInTheDocument();
  });

  it('shows empty state when no posts match the year', async () => {
    const params = Promise.resolve({ year: '2023' });
    render(await ArchiveYearPage({ params }));
    
    expect(screen.getByText(/No posts found from 2023/)).toBeInTheDocument();
  });

  it('renders back to all archives link', async () => {
    const params = Promise.resolve({ year: '2025' });
    render(await ArchiveYearPage({ params }));
    
    const backLink = screen.getByRole('link', { name: /All archives/i });
    expect(backLink).toHaveAttribute('href', '/archive');
  });

  it('correctly parses posts from different months in the same year', async () => {
    vi.mocked(getAllPosts).mockResolvedValueOnce([
      {
        slug: 'jan-post',
        title: 'January Post',
        date: '2025-01-15',
        description: 'January',
        tags: [],
      },
      {
        slug: 'dec-post',
        title: 'December Post',
        date: '2025-12-20',
        description: 'December',
        tags: [],
      },
    ] as any);
    
    const params = Promise.resolve({ year: '2025' });
    render(await ArchiveYearPage({ params }));
    
    expect(screen.getByText('January Post')).toBeInTheDocument();
    expect(screen.getByText('December Post')).toBeInTheDocument();
    expect(screen.getByText('2 posts published')).toBeInTheDocument();
  });

  it('generateStaticParams returns all unique years sorted descending', async () => {
    const params = await generateStaticParams();
    
    expect(params).toEqual([
      { year: '2025' },
      { year: '2024' },
    ]);
  });

  it('generateMetadata returns correct metadata for year', async () => {
    const params = Promise.resolve({ year: '2024' });
    const metadata = await generateMetadata({ params });
    
    expect(metadata.title).toBe('Posts from 2024');
    expect(metadata.description).toBe('All posts published in 2024');
  });
});
