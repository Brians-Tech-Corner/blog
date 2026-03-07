import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HomeHero } from './HomeHero';

describe('HomeHero', () => {
  it('renders the hero section with correct heading', () => {
    render(<HomeHero />);
    expect(
      screen.getByRole('heading', { name: /Brian's Tech Corner/i }),
    ).toBeInTheDocument();
  });

  it('renders the value proposition text', () => {
    render(<HomeHero />);
    expect(
      screen.getByText(/Deep dives on platform engineering/i),
    ).toBeInTheDocument();
  });

  it('renders the description about Herp Ops', () => {
    render(<HomeHero />);
    expect(
      screen.getByText(/Sharing what I've learned building/i),
    ).toBeInTheDocument();
  });

  it('renders the Herp Ops link with correct attributes', () => {
    render(<HomeHero />);
    const link = screen.getByRole('link', { name: /Herp Ops/i });
    expect(link).toHaveAttribute('href', 'https://www.herpops.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders action buttons', () => {
    render(<HomeHero />);
    expect(screen.getByRole('link', { name: /Read the Blog/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Subscribe/i })).toBeInTheDocument();
  });

  it('Read the Blog button links to /blog', () => {
    render(<HomeHero />);
    const readBlogBtn = screen.getByRole('link', { name: /Read the Blog/i });
    expect(readBlogBtn).toHaveAttribute('href', '/blog');
  });

  it('Subscribe button links to #newsletter', () => {
    render(<HomeHero />);
    const subscribeBtn = screen.getByRole('link', { name: /Subscribe/i });
    expect(subscribeBtn).toHaveAttribute('href', '#newsletter');
  });
});
