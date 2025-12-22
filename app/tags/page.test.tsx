import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TagsIndexPage from './page';
import { getAllPosts } from '@/lib/posts';

// Mock the posts module
vi.mock('@/lib/posts', () => ({
  getAllPosts: vi.fn(async () => [
    {
      slug: 'test-post-1',
      title: 'Test Post 1',
      date: '2025-12-14',
      description: 'First test post',
      tags: ['kubernetes', 'homelab'],
    },
    {
      slug: 'test-post-2',
      title: 'Test Post 2',
      date: '2025-12-13',
      description: 'Second test post',
      tags: ['kubernetes', 'docker'],
    },
    {
      slug: 'test-post-3',
      title: 'Test Post 3',
      date: '2025-12-12',
      description: 'Third test post',
      tags: ['homelab'],
    },
  ]),
}));

describe('TagsIndexPage', () => {
  it('renders the page title and description', async () => {
    render(await TagsIndexPage());
    expect(screen.getByRole('heading', { name: /All Tags/i })).toBeInTheDocument();
    expect(screen.getByText(/3 tags across 3 posts/)).toBeInTheDocument();
  });

  it('renders all unique tags with counts', async () => {
    render(await TagsIndexPage());
    
    // kubernetes appears in 2 posts
    expect(screen.getByText('kubernetes')).toBeInTheDocument();
    const kubernetesCard = screen.getByText('kubernetes').closest('a');
    expect(kubernetesCard).toHaveTextContent('2');
    
    // homelab appears in 2 posts
    expect(screen.getByText('homelab')).toBeInTheDocument();
    const homelabCard = screen.getByText('homelab').closest('a');
    expect(homelabCard).toHaveTextContent('2');
    
    // docker appears in 1 post
    expect(screen.getByText('docker')).toBeInTheDocument();
    const dockerCard = screen.getByText('docker').closest('a');
    expect(dockerCard).toHaveTextContent('1');
  });

  it('links tags to their detail pages with correct URLs', async () => {
    render(await TagsIndexPage());
    
    const kubernetesLink = screen.getByText('kubernetes').closest('a');
    expect(kubernetesLink).toHaveAttribute('href', '/tags/kubernetes');
    
    const homelabLink = screen.getByText('homelab').closest('a');
    expect(homelabLink).toHaveAttribute('href', '/tags/homelab');
  });

  it('renders back to blog link', async () => {
    render(await TagsIndexPage());
    const backLink = screen.getByRole('link', { name: /Back to blog/i });
    expect(backLink).toHaveAttribute('href', '/blog');
  });

  it('handles empty tags gracefully', async () => {
    vi.mocked(getAllPosts).mockResolvedValueOnce([
      {
        slug: 'no-tags',
        title: 'Post Without Tags',
        date: '2025-12-14',
        description: 'A post with no tags',
        tags: undefined,
      },
    ] as any);

    render(await TagsIndexPage());
    expect(screen.getByText(/No tags found/)).toBeInTheDocument();
  });

  it('renders tag icons with aria-hidden and focusable attributes', async () => {
    render(await TagsIndexPage());
    
    const kubernetesCard = screen.getByText('kubernetes').closest('a');
    const tagIcon = kubernetesCard?.querySelector('svg');
    expect(tagIcon).toBeInTheDocument();
    expect(tagIcon).toHaveAttribute('aria-hidden', 'true');
    expect(tagIcon).toHaveAttribute('focusable', 'false');
  });
});
