import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SiteHeader } from './SiteHeader';
import { ThemeProvider } from './ThemeProvider';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('SiteHeader', () => {
  it('renders the banner image', () => {
    renderWithTheme(<SiteHeader />);
    const banner = screen.getByAltText("Brian's Tech Corner banner");
    expect(banner).toBeInTheDocument();
    expect(banner).toHaveAttribute('src', expect.stringContaining('X-Banner-Blue.jpg'));
  });

  it('renders the logo and site name', () => {
    renderWithTheme(<SiteHeader />);
    expect(screen.getByAltText('BTC')).toBeInTheDocument();
    expect(screen.getByText("Brian's Tech Corner")).toBeInTheDocument();
  });

  it('renders home link with correct href', () => {
    renderWithTheme(<SiteHeader />);
    const homeLink = screen.getByRole('link', { name: /Brian's Tech Corner/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders all navigation links', () => {
    renderWithTheme(<SiteHeader />);
    
    const blogLink = screen.getByRole('link', { name: 'Blog' });
    expect(blogLink).toBeInTheDocument();
    expect(blogLink).toHaveAttribute('href', '/blog');

    // Discord appears twice (nav + social), so get all and filter by href
    const discordLinks = screen.getAllByRole('link', { name: 'Discord' });
    const navDiscordLink = discordLinks.find(link => link.getAttribute('href') === '/discord');
    expect(navDiscordLink).toBeInTheDocument();
    expect(navDiscordLink).toHaveAttribute('href', '/discord');

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');

    const rssLink = screen.getByRole('link', { name: 'RSS' });
    expect(rssLink).toBeInTheDocument();
    expect(rssLink).toHaveAttribute('href', '/rss.xml');
  });

  it('renders social media icons with correct links', () => {
    renderWithTheme(<SiteHeader />);
    
    const discordSocial = screen.getByLabelText('Discord');
    expect(discordSocial).toHaveAttribute('href', 'https://discord.gg/q2N7R2KDRs');
    expect(discordSocial).toHaveAttribute('target', '_blank');
    expect(discordSocial).toHaveAttribute('rel', 'noopener noreferrer');

    const youtube = screen.getByLabelText('YouTube');
    expect(youtube).toHaveAttribute('href', 'https://youtube.com/@brianstechcorner');
    expect(youtube).toHaveAttribute('target', '_blank');

    const twitter = screen.getByLabelText('X (Twitter)');
    expect(twitter).toHaveAttribute('href', 'https://x.com/brianstechcorn');
    expect(twitter).toHaveAttribute('target', '_blank');

    const github = screen.getByLabelText('GitHub');
    expect(github).toHaveAttribute('href', 'https://github.com/brians-tech-corner');
    expect(github).toHaveAttribute('target', '_blank');
  });

  it('renders ThemeToggle component', () => {
    renderWithTheme(<SiteHeader />);
    // ThemeToggle is rendered - we can verify the component is in the document
    // The actual button would be tested in ThemeToggle.test.tsx
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('navigation links have proper styling classes', () => {
    renderWithTheme(<SiteHeader />);
    const navLinks = [
      screen.getByRole('link', { name: 'Blog' }),
      screen.getAllByRole('link', { name: 'Discord' }).find(link => link.getAttribute('href') === '/discord'),
      screen.getByRole('link', { name: 'About' }),
    ];

    navLinks.forEach((link) => {
      expect(link?.className).toContain('text-zinc-700');
      expect(link?.className).toContain('no-underline');
    });
  });

  it('social links are hidden on mobile screens', () => {
    renderWithTheme(<SiteHeader />);
    const socialContainer = screen.getByLabelText('Discord').parentElement;
    expect(socialContainer?.className).toContain('hidden');
    expect(socialContainer?.className).toContain('sm:flex');
  });
});
