import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StartHerePage, { metadata } from './page';

describe('StartHerePage', () => {
  it('renders the page heading', () => {
    render(<StartHerePage />);
    expect(screen.getByRole('heading', { name: /Start Here/i, level: 1 })).toBeInTheDocument();
  });

  it('renders the intro paragraph', () => {
    render(<StartHerePage />);
    expect(screen.getByText(/cuts through the archive/i)).toBeInTheDocument();
  });

  it('renders the about section heading', () => {
    render(<StartHerePage />);
    expect(screen.getByRole('heading', { name: /What is Brian/i })).toBeInTheDocument();
  });

  it('renders the about page link', () => {
    render(<StartHerePage />);
    const link = screen.getByRole('link', { name: /Read the full about page/i });
    expect(link).toHaveAttribute('href', '/about');
  });

  it('renders the Discord community link using the shared URL', () => {
    render(<StartHerePage />);
    const link = screen.getByRole('link', { name: /Join the Discord community/i });
    expect(link).toHaveAttribute('href', 'https://discord.gg/q2N7R2KDRs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders all reading path headings', () => {
    render(<StartHerePage />);
    expect(screen.getByRole('heading', { name: /Build a Kubernetes Homelab/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Platform Engineering/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Home Networking/i })).toBeInTheDocument();
  });

  it('renders Reading Path badges', () => {
    render(<StartHerePage />);
    const badges = screen.getAllByText('Reading Path');
    expect(badges.length).toBeGreaterThanOrEqual(3);
  });

  it('renders post links within paths', () => {
    render(<StartHerePage />);
    const homeLabLink = screen.getByRole('link', {
      name: /Planning Your Kubernetes Homelab Hardware/i,
    });
    expect(homeLabLink).toHaveAttribute('href', '/blog/kubernetes-homelab-planning-hardware');
  });

  it('renders the browse all posts CTA', () => {
    render(<StartHerePage />);
    const link = screen.getByRole('link', { name: /Browse all posts/i });
    expect(link).toHaveAttribute('href', '/blog');
  });
});

describe('StartHerePage metadata', () => {
  it('has the correct title', () => {
    expect(metadata.title).toBe('Start Here');
  });

  it('has a description', () => {
    expect(typeof metadata.description).toBe('string');
    expect((metadata.description as string).length).toBeGreaterThan(0);
  });

  it('has correct OpenGraph title', () => {
    expect((metadata.openGraph as Record<string, unknown>)?.title).toBe(
      "Start Here | Brian's Tech Corner",
    );
  });

  it('has correct Twitter card type', () => {
    expect((metadata.twitter as Record<string, unknown>)?.card).toBe('summary_large_image');
  });
});
