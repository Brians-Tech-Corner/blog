import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SponsorPage, { metadata } from './page';

describe('SponsorPage', () => {
  it('renders the page heading', () => {
    render(<SponsorPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Sponsor' })).toBeInTheDocument();
  });

  it('renders the audience section', () => {
    render(<SponsorPage />);
    expect(screen.getByRole('heading', { name: /The Audience/i })).toBeInTheDocument();
    expect(screen.getByText(/Platform engineers, DevOps\/SRE, homelab builders/i)).toBeInTheDocument();
  });

  it('renders all three sponsorship format headings', () => {
    render(<SponsorPage />);
    expect(screen.getByText('Sponsored Post')).toBeInTheDocument();
    expect(screen.getByText('Newsletter Placement')).toBeInTheDocument();
    expect(screen.getByText('Resources Page Feature')).toBeInTheDocument();
  });

  it('renders the good fits section', () => {
    render(<SponsorPage />);
    expect(screen.getByRole('heading', { name: /Good Fits/i })).toBeInTheDocument();
  });

  it('renders the FAQ section', () => {
    render(<SponsorPage />);
    expect(screen.getByRole('heading', { name: /FAQ/i })).toBeInTheDocument();
    expect(screen.getByText(/Do you write the sponsored content yourself/i)).toBeInTheDocument();
  });

  it('renders the contact CTA with an email link', () => {
    render(<SponsorPage />);
    const emailLink = screen.getByRole('link', { name: /Email Me/i });
    expect(emailLink).toHaveAttribute('href', expect.stringContaining('mailto:'));
    expect(emailLink.getAttribute('href')).toContain('Sponsorship+Inquiry');
  });

  it('renders a Discord contact link', () => {
    render(<SponsorPage />);
    const discordLink = screen.getByRole('link', { name: /Message on Discord/i });
    expect(discordLink).toHaveAttribute('href', expect.stringContaining('discord.gg'));
    expect(discordLink).toHaveAttribute('target', '_blank');
  });

  describe('metadata', () => {
    it('has correct title', () => {
      expect(metadata.title).toBe('Sponsor');
    });

    it('has a description targeting the right audience', () => {
      expect(metadata.description).toContain('platform engineers');
    });

    it('has OpenGraph metadata', () => {
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.title).toContain('Sponsor');
    });

    it('has Twitter metadata', () => {
      expect(metadata.twitter).toBeDefined();
    });

    it('has canonical URL', () => {
      expect(metadata.alternates?.canonical).toContain('/sponsor');
    });
  });
});
