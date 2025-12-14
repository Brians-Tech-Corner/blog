import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import HomePage from './page';

// Mock the posts module
vi.mock('@/lib/posts', () => ({
  getAllPosts: vi.fn(async () => [
    {
      slug: 'test-post-1',
      title: 'Test Post 1',
      date: '2025-12-13',
      description: 'First test post',
      tags: ['test'],
    },
    {
      slug: 'test-post-2',
      title: 'Test Post 2',
      date: '2025-12-12',
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
      // Date should be formatted as "Dec 13, 2025" not "2025-12-14"
      expect(within(featuredSection).getByText(/Dec 13, 2025/)).toBeInTheDocument();
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
      // Date should be formatted as "Dec 12, 2025" not "2025-12-12"
      expect(within(latestSection).getByText(/Dec 12, 2025/)).toBeInTheDocument();
    }
  });

  it('does not render raw ISO date format', async () => {
    const { container } = render(await HomePage());
    // Should not find raw ISO format dates like "2025-12-14"
    expect(container.textContent).not.toMatch(/\d{4}-\d{2}-\d{2}/);
  });
});
