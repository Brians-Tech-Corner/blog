import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResourcesPage, { metadata, AMAZON_AFFILIATE_TAG, amazonUrl } from './page';

describe('ResourcesPage', () => {
  it('renders the page heading', () => {
    render(<ResourcesPage />);
    expect(screen.getByRole('heading', { name: /Resources/i, level: 1 })).toBeInTheDocument();
  });

  it('renders the affiliate/sponsorship disclosure', () => {
    render(<ResourcesPage />);
    expect(screen.getByText(/affiliate links or feature partners/i)).toBeInTheDocument();
  });

  it('renders all category headings', () => {
    render(<ResourcesPage />);
    expect(screen.getByRole('heading', { name: /Homelab Hardware/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Platform Engineering/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Developer Tools/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Hosting/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Learning Resources/i })).toBeInTheDocument();
  });

  it('renders the "Missing something?" section', () => {
    render(<ResourcesPage />);
    expect(screen.getByRole('heading', { name: /Missing something/i })).toBeInTheDocument();
  });

  it('renders the Discord link using the shared URL', () => {
    render(<ResourcesPage />);
    const discordLinks = screen
      .getAllByRole('link', { name: /Discord/i })
      .filter((l) => l.getAttribute('href') === 'https://discord.gg/q2N7R2KDRs');
    expect(discordLinks.length).toBeGreaterThan(0);
    discordLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders resource items with external links', () => {
    render(<ResourcesPage />);
    const beelinkLink = screen.getByRole('link', { name: /Beelink Mini PCs/i });
    expect(beelinkLink).toHaveAttribute('target', '_blank');
    expect(beelinkLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders badge labels on recommended items', () => {
    render(<ResourcesPage />);
    const whatIRunBadges = screen.getAllByText('What I Run');
    expect(whatIRunBadges.length).toBeGreaterThan(0);
    const recommendedBadges = screen.getAllByText('Recommended');
    expect(recommendedBadges.length).toBeGreaterThan(0);
  });
});

describe('ResourcesPage metadata', () => {
  it('has the correct title', () => {
    expect(metadata.title).toBe('Resources');
  });

  it('has a description', () => {
    expect(typeof metadata.description).toBe('string');
    expect((metadata.description as string).length).toBeGreaterThan(0);
  });

  it('has correct OpenGraph title', () => {
    expect((metadata.openGraph as Record<string, unknown>)?.title).toBe(
      "Resources | Brian's Tech Corner",
    );
  });

  it('has correct Twitter card type', () => {
    expect((metadata.twitter as Record<string, unknown>)?.card).toBe('summary_large_image');
  });
});

describe('Amazon affiliate helpers', () => {
  it('AMAZON_AFFILIATE_TAG matches expected value', () => {
    expect(AMAZON_AFFILIATE_TAG).toBe('brianstechcor-20');
  });

  it('amazonUrl builds a URL containing the affiliate tag', () => {
    const url = amazonUrl('raspberry pi 5');
    expect(url).toContain('tag=brianstechcor-20');
    expect(url).toContain('k=raspberry+pi+5');
  });

  it('amazonUrl encodes special characters correctly', () => {
    const url = amazonUrl('synology ds923+');
    expect(url).toContain('k=synology+ds923%2B');
    expect(url).toContain('tag=brianstechcor-20');
  });

  it('all Amazon links rendered on the page include the affiliate tag', () => {
    render(<ResourcesPage />);
    const allLinks = screen.getAllByRole('link');
    const amazonLinks = allLinks.filter((l) =>
      l.getAttribute('href')?.startsWith('https://www.amazon.com/'),
    );
    expect(amazonLinks.length).toBeGreaterThan(0);
    amazonLinks.forEach((link) => {
      expect(link.getAttribute('href')).toContain(`tag=${AMAZON_AFFILIATE_TAG}`);
    });
  });
});
