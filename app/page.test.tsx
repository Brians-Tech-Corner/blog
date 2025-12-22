import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import HomePage from './page';
import { getAllPosts } from '@/lib/posts';

// Mock the posts module
vi.mock('@/lib/posts', () => ({
  getAllPosts: vi.fn(async () => [
    {
      slug: 'test-post-1',
      title: 'Test Post 1',
      date: '2025-12-14',
      description: 'First test post',
      tags: ['test'],
    },
    {
      slug: 'test-post-2',
      title: 'Test Post 2',
      date: '2025-12-13',
      description: 'Second test post',
      tags: ['test'],
    },
  ]),
}));

describe('HomePage', () => {
  it('renders the hero section', async () => {
    render(await HomePage());
    expect(
      screen.getByRole('heading', { name: /Brian.s Tech Corner/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A collection of notes, experiments, and walkthroughs/),
    ).toBeInTheDocument();
  });

  it('renders topic tags', async () => {
    render(await HomePage());
    expect(screen.getByText('Homelab')).toBeInTheDocument();
    expect(screen.getByText('Kubernetes')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('renders featured post with formatted date', async () => {
    render(await HomePage());
    const featuredSection = screen
      .getByRole('heading', { name: /Featured/i })
      .closest('section');
    expect(featuredSection).toBeInTheDocument();

    if (featuredSection) {
      expect(within(featuredSection).getByText('Test Post 1')).toBeInTheDocument();
      // Date should be formatted like "Dec 14, 2025" not "2025-12-14"
      // Use flexible regex to account for timezone differences
      expect(within(featuredSection).getByText(/Dec 1[34], 2025/)).toBeInTheDocument();
    }
  });

  it('renders latest posts with formatted dates', async () => {
    render(await HomePage());
    const latestSection = screen
      .getByRole('heading', { name: /Latest/i })
      .closest('section');
    expect(latestSection).toBeInTheDocument();

    if (latestSection) {
      expect(within(latestSection).getByText('Test Post 2')).toBeInTheDocument();
      // Date should be formatted as "Dec 13, 2025" not "2025-12-13"
      expect(within(latestSection).getByText(/Dec 13, 2025/)).toBeInTheDocument();
    }
  });

  it('does not render raw ISO date format', async () => {
    const { container } = render(await HomePage());
    // Should not find raw ISO format dates like "2025-12-14"
    expect(container.textContent).not.toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  it('renders the featured image when the featured post has an image', async () => {
    // Override the mocked posts to include an image on the latest post
    vi.mocked(getAllPosts).mockResolvedValueOnce([
      {
        slug: 'test-post-1',
        title: 'Test Post 1',
        date: '2025-12-14',
        description: 'First test post',
        tags: ['test'],
        image: '/post-images/welcome-hero.jpg',
      },
      {
        slug: 'test-post-2',
        title: 'Test Post 2',
        date: '2025-12-13',
        description: 'Second test post',
        tags: ['test'],
      },
    ] as any);

    render(await HomePage());

    // The featured image should render with alt equal to the post title
    const img = screen.getByRole('img', { name: 'Test Post 1' });
    expect(img).toBeInTheDocument();
  });
});
