import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BlogIndexPage from './page';

// Mock the posts module
vi.mock('@/lib/posts', () => ({
  getAllPosts: vi.fn(async () => [
    {
      slug: 'post-2024-1',
      title: 'Post from 2024',
      date: '2024-06-15',
      description: 'A post from 2024',
      tags: ['tech', 'coding'],
    },
    {
      slug: 'post-2025-1',
      title: 'Post from 2025',
      date: '2025-01-10',
      description: 'A post from 2025',
      tags: ['tech', 'devops'],
    },
    {
      slug: 'post-2025-2',
      title: 'Another 2025 Post',
      date: '2025-03-20',
      description: 'Another post from 2025',
      tags: ['coding'],
    },
  ]),
}));

// Mock the components
vi.mock('@/components/PostCard', () => ({
  PostCard: ({ post }: { post: { title: string } }) => (
    <div data-testid="post-card">{post.title}</div>
  ),
}));

vi.mock('@/components/BlogSidebar', () => ({
  BlogSidebar: () => <aside data-testid="blog-sidebar">Sidebar</aside>,
}));

describe('BlogIndexPage', () => {
  it('renders all posts when no filters are applied', async () => {
    const searchParams = Promise.resolve({});
    render(await BlogIndexPage({ searchParams }));
    
    expect(screen.getByText('Post from 2024')).toBeInTheDocument();
    expect(screen.getByText('Post from 2025')).toBeInTheDocument();
    expect(screen.getByText('Another 2025 Post')).toBeInTheDocument();
  });

  it('filters posts by year when year parameter is provided', async () => {
    const searchParams = Promise.resolve({ year: '2025' });
    render(await BlogIndexPage({ searchParams }));
    
    // Should show 2025 posts
    expect(screen.getByText('Post from 2025')).toBeInTheDocument();
    expect(screen.getByText('Another 2025 Post')).toBeInTheDocument();
    
    // Should not show 2024 posts
    expect(screen.queryByText('Post from 2024')).not.toBeInTheDocument();
  });

  it('filters posts by year 2024', async () => {
    const searchParams = Promise.resolve({ year: '2024' });
    render(await BlogIndexPage({ searchParams }));
    
    // Should show 2024 post
    expect(screen.getByText('Post from 2024')).toBeInTheDocument();
    
    // Should not show 2025 posts
    expect(screen.queryByText('Post from 2025')).not.toBeInTheDocument();
    expect(screen.queryByText('Another 2025 Post')).not.toBeInTheDocument();
  });

  it('filters posts by tag', async () => {
    const searchParams = Promise.resolve({ tag: 'devops' });
    render(await BlogIndexPage({ searchParams }));
    
    // Should show post with devops tag
    expect(screen.getByText('Post from 2025')).toBeInTheDocument();
    
    // Should not show posts without devops tag
    expect(screen.queryByText('Post from 2024')).not.toBeInTheDocument();
    expect(screen.queryByText('Another 2025 Post')).not.toBeInTheDocument();
  });

  it('combines year and tag filters correctly', async () => {
    const searchParams = Promise.resolve({ year: '2025', tag: 'tech' });
    render(await BlogIndexPage({ searchParams }));
    
    // Should show only 2025 post with tech tag
    expect(screen.getByText('Post from 2025')).toBeInTheDocument();
    
    // Should not show 2024 post (wrong year)
    expect(screen.queryByText('Post from 2024')).not.toBeInTheDocument();
    
    // Should not show other 2025 post (missing tech tag)
    expect(screen.queryByText('Another 2025 Post')).not.toBeInTheDocument();
  });

  it('filters posts by search query', async () => {
    const searchParams = Promise.resolve({ q: 'another' });
    render(await BlogIndexPage({ searchParams }));
    
    // Should show post matching search query
    expect(screen.getByText('Another 2025 Post')).toBeInTheDocument();
    
    // Should not show posts not matching query
    expect(screen.queryByText('Post from 2024')).not.toBeInTheDocument();
    expect(screen.queryByText('Post from 2025')).not.toBeInTheDocument();
  });

  it('combines year, tag, and search filters correctly', async () => {
    const searchParams = Promise.resolve({ 
      year: '2024', 
      tag: 'tech',
      q: '2024'
    });
    render(await BlogIndexPage({ searchParams }));
    
    // Should show only posts matching all filters
    expect(screen.getByText('Post from 2024')).toBeInTheDocument();
    
    // Should not show posts not matching all filters
    expect(screen.queryByText('Post from 2025')).not.toBeInTheDocument();
    expect(screen.queryByText('Another 2025 Post')).not.toBeInTheDocument();
  });

  it('shows "no posts found" message when filters return no results', async () => {
    const searchParams = Promise.resolve({ year: '2023' });
    render(await BlogIndexPage({ searchParams }));
    
    // Should show no posts
    expect(screen.queryByText('Post from 2024')).not.toBeInTheDocument();
    expect(screen.queryByText('Post from 2025')).not.toBeInTheDocument();
    
    // Should show empty state message
    expect(screen.getByText(/No posts found/i)).toBeInTheDocument();
  });

  it('renders the blog sidebar', async () => {
    const searchParams = Promise.resolve({});
    render(await BlogIndexPage({ searchParams }));
    
    expect(screen.getByTestId('blog-sidebar')).toBeInTheDocument();
  });
});
