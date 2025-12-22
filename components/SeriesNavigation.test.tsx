import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SeriesNavigation } from './SeriesNavigation';
import type { PostListItem } from '@/lib/posts';

const mockSeriesPosts: PostListItem[] = [
  {
    title: 'Getting Started with Kubernetes',
    date: '2025-01-01',
    slug: 'getting-started-kubernetes',
    series: 'kubernetes-homelab',
    seriesOrder: 1,
  },
  {
    title: 'Setting Up K3s',
    date: '2025-01-08',
    slug: 'setting-up-k3s',
    series: 'kubernetes-homelab',
    seriesOrder: 2,
  },
  {
    title: 'Deploying Applications',
    date: '2025-01-15',
    slug: 'deploying-applications',
    series: 'kubernetes-homelab',
    seriesOrder: 3,
  },
];

describe('SeriesNavigation', () => {
  it('should render nothing when allInSeries is empty', () => {
    const { container } = render(
      <SeriesNavigation prev={null} next={null} allInSeries={[]} currentSlug="test" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should render series title', () => {
    render(
      <SeriesNavigation
        prev={null}
        next={null}
        allInSeries={mockSeriesPosts}
        currentSlug="setting-up-k3s"
      />,
    );
    expect(screen.getByText(/Kubernetes Homelab/i)).toBeInTheDocument();
  });

  it('should render all posts in series', () => {
    render(
      <SeriesNavigation
        prev={null}
        next={null}
        allInSeries={mockSeriesPosts}
        currentSlug="setting-up-k3s"
      />,
    );
    expect(screen.getByText('Getting Started with Kubernetes')).toBeInTheDocument();
    expect(screen.getByText('Setting Up K3s')).toBeInTheDocument();
    expect(screen.getByText('Deploying Applications')).toBeInTheDocument();
  });

  it('should highlight current post', () => {
    render(
      <SeriesNavigation
        prev={null}
        next={null}
        allInSeries={mockSeriesPosts}
        currentSlug="setting-up-k3s"
      />,
    );
    const currentPost = screen.getByText('Setting Up K3s');
    expect(currentPost).not.toHaveAttribute('href'); // Current post is not a link
  });

  it('should render previous link when prev exists', () => {
    render(
      <SeriesNavigation
        prev={mockSeriesPosts[0]}
        next={null}
        allInSeries={mockSeriesPosts}
        currentSlug="setting-up-k3s"
      />,
    );
    expect(screen.getByText('← Previous')).toBeInTheDocument();
    const prevLink = screen.getByText('← Previous').closest('a');
    expect(prevLink).toHaveAttribute('href', '/blog/getting-started-kubernetes');
  });

  it('should render next link when next exists', () => {
    render(
      <SeriesNavigation
        prev={null}
        next={mockSeriesPosts[2]}
        allInSeries={mockSeriesPosts}
        currentSlug="setting-up-k3s"
      />,
    );
    expect(screen.getByText('Next →')).toBeInTheDocument();
    const nextLink = screen.getByText('Next →').closest('a');
    expect(nextLink).toHaveAttribute('href', '/blog/deploying-applications');
  });

  it('should render both prev and next links', () => {
    render(
      <SeriesNavigation
        prev={mockSeriesPosts[0]}
        next={mockSeriesPosts[2]}
        allInSeries={mockSeriesPosts}
        currentSlug="setting-up-k3s"
      />,
    );
    expect(screen.getByText('← Previous')).toBeInTheDocument();
    expect(screen.getByText('Next →')).toBeInTheDocument();
  });

  it('should show series order for each post', () => {
    render(
      <SeriesNavigation
        prev={null}
        next={null}
        allInSeries={mockSeriesPosts}
        currentSlug="setting-up-k3s"
      />,
    );
    expect(screen.getByText('Part 1:')).toBeInTheDocument();
    expect(screen.getByText('Part 2:')).toBeInTheDocument();
    expect(screen.getByText('Part 3:')).toBeInTheDocument();
  });
});
