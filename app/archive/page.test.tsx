import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArchiveIndexPage from './page';
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

describe('ArchiveIndexPage', () => {
  it('renders the page title', async () => {
    render(await ArchiveIndexPage());
    expect(screen.getByRole('heading', { name: /Archive/i })).toBeInTheDocument();
    expect(screen.getByText(/All posts organized by year/)).toBeInTheDocument();
  });

  it('groups posts by year with counts', async () => {
    render(await ArchiveIndexPage());
    
    // 2025 should have 2 posts
    expect(screen.getByText('2025')).toBeInTheDocument();
    const year2025Card = screen.getByText('2025').closest('a');
    expect(year2025Card).toHaveTextContent('2');
    
    // 2024 should have 1 post
    expect(screen.getByText('2024')).toBeInTheDocument();
    const year2024Card = screen.getByText('2024').closest('a');
    expect(year2024Card).toHaveTextContent('1');
  });

  it('sorts years in descending order (newest first)', async () => {
    render(await ArchiveIndexPage());
    
    const yearLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('href')?.startsWith('/archive/')
    );
    
    const years = yearLinks.map(link => link.textContent?.match(/\d{4}/)?.[0]);
    expect(years[0]).toBe('2025');
    expect(years[1]).toBe('2024');
  });

  it('renders clickable year links with correct href attributes', async () => {
    render(await ArchiveIndexPage());
    
    // Verify 2025 year link
    const link2025 = screen.getByText('2025').closest('a');
    expect(link2025).toHaveAttribute('href', '/archive/2025');
    expect(link2025?.tagName).toBe('A');
    
    // Verify 2024 year link
    const link2024 = screen.getByText('2024').closest('a');
    expect(link2024).toHaveAttribute('href', '/archive/2024');
    expect(link2024?.tagName).toBe('A');
  });

  it('renders back to blog link with correct href', async () => {
    render(await ArchiveIndexPage());
    const backLink = screen.getByRole('link', { name: /Back to blog/i });
    expect(backLink).toHaveAttribute('href', '/blog');
    // Verify it's a clickable navigation element
    expect(backLink.tagName).toBe('A');
  });

  it('handles empty archive gracefully', async () => {
    vi.mocked(getAllPosts).mockResolvedValueOnce([]);

    render(await ArchiveIndexPage());
    expect(screen.getByText(/No posts found/)).toBeInTheDocument();
  });

  it('renders calendar icons with aria-hidden for accessibility', async () => {
    render(await ArchiveIndexPage());
    
    const year2025Card = screen.getByText('2025').closest('a');
    const calendarIcon = year2025Card?.querySelector('svg');
    expect(calendarIcon).toBeInTheDocument();
    expect(calendarIcon).toHaveAttribute('aria-hidden', 'true');
    expect(calendarIcon).toHaveAttribute('focusable', 'false');
  });
});
