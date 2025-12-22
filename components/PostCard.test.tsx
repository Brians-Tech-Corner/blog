import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PostCard } from './PostCard';
import type { PostListItem } from '@/lib/posts';

describe('PostCard', () => {
  const mockPost: PostListItem = {
    slug: '2025-12-14-test-post',
    title: 'Test Post Title',
    date: '2025-12-14',
    description: 'This is a test description',
    tags: ['test', 'vitest'],
  };

  it('renders post title', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
  });

  it('renders post description', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
  });

  it('does not render description when absent', () => {
    const postWithoutDescription = { ...mockPost, description: undefined };
    render(<PostCard post={postWithoutDescription} />);
    expect(screen.queryByText('This is a test description')).not.toBeInTheDocument();
  });

  it('renders formatted date', () => {
    render(<PostCard post={mockPost} />);
    // The PostCard renders date in format like "Dec 14, 2025"
    expect(screen.getByText(/[A-Z][a-z]{2} \d{1,2}, \d{4}/)).toBeInTheDocument();
  });

  it('renders read time when present', () => {
    const postWithReadTime = { ...mockPost, readTime: 5 };
    render(<PostCard post={postWithReadTime} />);
    expect(screen.getByText(/5 min read/)).toBeInTheDocument();
  });

  it('renders tags when present', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('vitest')).toBeInTheDocument();
  });

  it('renders at most four tags when more are provided', () => {
    const manyTagsPost = { ...mockPost, tags: ['t1', 't2', 't3', 't4', 't5', 't6'] };
    render(<PostCard post={manyTagsPost} />);
    expect(screen.getByText('t1')).toBeInTheDocument();
    expect(screen.getByText('t4')).toBeInTheDocument();
    expect(screen.queryByText('t5')).not.toBeInTheDocument();
    expect(screen.queryByText('t6')).not.toBeInTheDocument();
  });

  it('renders without tags', () => {
    const postWithoutTags = { ...mockPost, tags: undefined };
    render(<PostCard post={postWithoutTags} />);
    expect(screen.queryByText('test')).not.toBeInTheDocument();
    expect(screen.queryByText('vitest')).not.toBeInTheDocument();
  });

  it('renders thumbnail image when image is provided', () => {
    const postWithImage = { ...mockPost, image: '/images/hero.jpg' };
    render(<PostCard post={postWithImage} />);
    const img = screen.getByRole('img', { name: 'Test Post Title' });
    expect(img).toBeInTheDocument();
  });

  it('does not render image when none provided', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.queryByRole('img', { name: 'Test Post Title' })).not.toBeInTheDocument();
  });

  it('links to the correct post URL', () => {
    render(<PostCard post={mockPost} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/blog/2025-12-14-test-post');
  });

  it('renders series badge when post is part of a series', () => {
    const seriesPost = { ...mockPost, series: 'kubernetes-homelab', seriesOrder: 2 };
    render(<PostCard post={seriesPost} />);
    expect(screen.getByText('Part 2')).toBeInTheDocument();
  });

  it("renders '?' for series badge when order is missing", () => {
    const seriesPostNoOrder = { ...mockPost, series: 'kubernetes-homelab', seriesOrder: undefined };
    render(<PostCard post={seriesPostNoOrder} />);
    expect(screen.getByText('Part ?')).toBeInTheDocument();
  });

  it('does not render series badge when post is not in a series', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.queryByText(/Part/)).not.toBeInTheDocument();
  });
});
