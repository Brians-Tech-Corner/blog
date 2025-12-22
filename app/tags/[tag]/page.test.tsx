import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TagPage from './page';
import { getAllPosts } from '@/lib/posts';

// Mock the posts module
vi.mock('@/lib/posts', () => ({
  getAllPosts: vi.fn(async () => [
    {
      slug: 'k8s-post-1',
      title: 'Kubernetes Post 1',
      date: '2025-12-14',
      description: 'First kubernetes post',
      tags: ['kubernetes', 'homelab'],
    },
    {
      slug: 'k8s-post-2',
      title: 'Kubernetes Post 2',
      date: '2025-12-13',
      description: 'Second kubernetes post',
      tags: ['kubernetes', 'docker'],
    },
    {
      slug: 'other-post',
      title: 'Other Post',
      date: '2025-12-12',
      description: 'A different post',
      tags: ['homelab'],
    },
  ]),
}));

describe('TagPage', () => {
  it('renders the tag page with correct title', async () => {
    const params = Promise.resolve({ tag: 'kubernetes' });
    render(await TagPage({ params }));
    
    expect(screen.getByText((content, element) => {
      return element?.tagName === 'H1' && content.includes('kubernetes');
    })).toBeInTheDocument();
  });

  it('filters and displays posts with the specified tag', async () => {
    const params = Promise.resolve({ tag: 'kubernetes' });
    render(await TagPage({ params }));
    
    expect(screen.getByText('Kubernetes Post 1')).toBeInTheDocument();
    expect(screen.getByText('Kubernetes Post 2')).toBeInTheDocument();
    expect(screen.queryByText('Other Post')).not.toBeInTheDocument();
  });

  it('displays correct post count', async () => {
    const params = Promise.resolve({ tag: 'kubernetes' });
    render(await TagPage({ params }));
    
    expect(screen.getByText('2 posts found')).toBeInTheDocument();
  });

  it('handles URL encoded tags correctly', async () => {
    const params = Promise.resolve({ tag: 'home%20assistant' });
    
    // Mock with a post that has "home assistant" tag
    vi.mocked(getAllPosts).mockResolvedValueOnce([
      {
        slug: 'ha-post',
        title: 'Home Assistant Post',
        date: '2025-12-14',
        description: 'HA post',
        tags: ['home assistant'],
      },
    ] as any);
    
    render(await TagPage({ params }));
    expect(screen.getByText((content, element) => {
      return element?.tagName === 'H1' && content.includes('home assistant');
    })).toBeInTheDocument();
  });

  it('shows empty state when no posts match the tag', async () => {
    vi.mocked(getAllPosts).mockResolvedValueOnce([
      {
        slug: 'post',
        title: 'Post',
        date: '2025-12-14',
        description: 'Post',
        tags: ['other'],
      },
    ] as any);
    
    const params = Promise.resolve({ tag: 'nonexistent' });
    render(await TagPage({ params }));
    
    expect(screen.getByText((content) => {
      return content.includes('No posts found') && content.includes('nonexistent');
    })).toBeInTheDocument();
  });

  it('renders back to all tags link', async () => {
    const params = Promise.resolve({ tag: 'kubernetes' });
    render(await TagPage({ params }));
    
    const backLink = screen.getByRole('link', { name: /All tags/i });
    expect(backLink).toHaveAttribute('href', '/tags');
  });
});
