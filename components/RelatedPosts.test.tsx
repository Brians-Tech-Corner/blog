import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RelatedPosts } from './RelatedPosts';
import type { PostListItem } from '@/lib/posts';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('RelatedPosts', () => {
  const mockPosts: PostListItem[] = [
    {
      slug: 'test-post-1',
      title: 'Test Post 1',
      date: '2025-01-01',
      description: 'This is test post 1 description',
      tags: ['react', 'typescript'],
      readTime: 5,
    },
    {
      slug: 'test-post-2',
      title: 'Test Post 2',
      date: '2025-01-02',
      description: 'This is test post 2 description',
      tags: ['nextjs'],
      readTime: 10,
    },
    {
      slug: 'test-post-3',
      title: 'Test Post 3 Without Description',
      date: '2025-01-03',
      tags: ['javascript', 'testing'],
      readTime: 7,
    },
  ];

  it('should render nothing when posts array is empty', () => {
    const { container } = render(<RelatedPosts posts={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render section header when posts exist', () => {
    render(<RelatedPosts posts={mockPosts} />);
    expect(screen.getByText('Related Posts')).toBeInTheDocument();
  });

  it('should render all provided posts', () => {
    render(<RelatedPosts posts={mockPosts} />);
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    expect(screen.getByText('Test Post 3 Without Description')).toBeInTheDocument();
  });

  it('should render post descriptions when available', () => {
    render(<RelatedPosts posts={mockPosts} />);
    expect(screen.getByText('This is test post 1 description')).toBeInTheDocument();
    expect(screen.getByText('This is test post 2 description')).toBeInTheDocument();
  });

  it('should not render description paragraph when description is missing', () => {
    const { container } = render(<RelatedPosts posts={[mockPosts[2]]} />);
    // Check that the description paragraph with line-clamp-2 class doesn't exist
    const descriptionParagraph = container.querySelector('.line-clamp-2');
    expect(descriptionParagraph).toBeNull();
  });

  it('should render date and read time for each post', () => {
    render(<RelatedPosts posts={mockPosts} />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('10 min read')).toBeInTheDocument();
    expect(screen.getByText('7 min read')).toBeInTheDocument();
  });

  it('should render correct links to post pages', () => {
    render(<RelatedPosts posts={mockPosts} />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/blog/test-post-1');
    expect(links[1]).toHaveAttribute('href', '/blog/test-post-2');
    expect(links[2]).toHaveAttribute('href', '/blog/test-post-3');
  });

  it('should render tags for posts (max 3)', () => {
    render(<RelatedPosts posts={mockPosts} />);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
    expect(screen.getByText('nextjs')).toBeInTheDocument();
    expect(screen.getByText('javascript')).toBeInTheDocument();
    expect(screen.getByText('testing')).toBeInTheDocument();
  });

  it('should limit tags display to first 3 tags', () => {
    const postWithManyTags: PostListItem = {
      slug: 'many-tags',
      title: 'Post with Many Tags',
      date: '2025-01-01',
      tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
      readTime: 5,
    };

    render(<RelatedPosts posts={[postWithManyTags]} />);
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
    expect(screen.getByText('tag3')).toBeInTheDocument();
    expect(screen.queryByText('tag4')).not.toBeInTheDocument();
    expect(screen.queryByText('tag5')).not.toBeInTheDocument();
  });

  it('should not render tags section when post has no tags', () => {
    const postWithoutTags: PostListItem = {
      slug: 'no-tags',
      title: 'Post without Tags',
      date: '2025-01-01',
      readTime: 5,
    };

    const { container } = render(<RelatedPosts posts={[postWithoutTags]} />);
    // Check for tag badges with the specific styling
    const tagBadges = container.querySelectorAll('.rounded-full.bg-neutral-100');
    expect(tagBadges).toHaveLength(0);
  });

  it('should render read time when available', () => {
    render(<RelatedPosts posts={[mockPosts[0]]} />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('should not render read time when missing', () => {
    const postWithoutReadTime: PostListItem = {
      slug: 'no-read-time',
      title: 'Post without Read Time',
      date: '2025-01-01',
    };

    render(<RelatedPosts posts={[postWithoutReadTime]} />);
    expect(screen.queryByText(/min read/i)).not.toBeInTheDocument();
  });

  it('should use responsive grid layout classes', () => {
    const { container } = render(<RelatedPosts posts={mockPosts} />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('sm:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });
});
