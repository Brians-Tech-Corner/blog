import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HomeHero } from './HomeHero';

describe('HomeHero', () => {
  it('renders the site name heading', () => {
    render(<HomeHero />);
    expect(screen.getByRole('heading', { name: /Brian's Tech Corner/i, level: 1 })).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<HomeHero />);
    expect(screen.getByText(/platform engineering/i)).toBeInTheDocument();
  });

  it('renders the Start Here CTA link', () => {
    render(<HomeHero />);
    expect(screen.getByRole('link', { name: /Start Here/i })).toHaveAttribute('href', '/start-here');
  });

  it('renders the Browse All Posts link', () => {
    render(<HomeHero />);
    expect(screen.getByRole('link', { name: /Browse All Posts/i })).toHaveAttribute('href', '/blog');
  });

  it('renders the Subscribe link', () => {
    render(<HomeHero />);
    expect(screen.getByRole('link', { name: /Subscribe/i })).toHaveAttribute('href', '#newsletter');
  });

  it('does not render the social proof bar when postCount is undefined', () => {
    render(<HomeHero />);
    expect(screen.queryByText(/posts published/i)).not.toBeInTheDocument();
  });

  it('renders the social proof bar with Discord link when postCount is provided', () => {
    render(<HomeHero postCount={42} />);
    expect(screen.getByText(/42 posts published/i)).toBeInTheDocument();
    const discordLink = screen.getByRole('link', { name: /Community on Discord/i });
    expect(discordLink).toHaveAttribute('href', 'https://discord.gg/q2N7R2KDRs');
    expect(discordLink).toHaveAttribute('target', '_blank');
    expect(discordLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render the social proof bar when postCount is 0', () => {
    render(<HomeHero postCount={0} />);
    expect(screen.queryByText(/posts published/i)).not.toBeInTheDocument();
  });
});
