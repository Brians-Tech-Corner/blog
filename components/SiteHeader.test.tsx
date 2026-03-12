import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SiteHeader } from './SiteHeader';
import { ThemeProvider } from './ThemeProvider';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('SiteHeader', () => {
  it('renders the logo image', () => {
    renderWithTheme(<SiteHeader />);
    const logo = screen.getByAltText("Brian's Tech Corner");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', expect.stringContaining('BTC-Logo--Blue.jpg'));
  });

  it('renders site name and tagline in the hero', () => {
    renderWithTheme(<SiteHeader />);
    expect(screen.getByText("Brian's Tech Corner")).toBeInTheDocument();
    expect(
      screen.getByText(/Platform engineering, homelabs, and open source/),
    ).toBeInTheDocument();
  });

  it('site name is not rendered as an h1 (avoids duplicate h1 per page)', () => {
    renderWithTheme(<SiteHeader />);
    const h1s = screen.queryAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(0);
  });

  it('renders home link with correct href', () => {
    renderWithTheme(<SiteHeader />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders all navigation links', () => {
    renderWithTheme(<SiteHeader />);

    const blogLink = screen.getByRole('link', { name: 'Blog' });
    expect(blogLink).toBeInTheDocument();
    expect(blogLink).toHaveAttribute('href', '/blog');

    const projectsLink = screen.getByRole('link', { name: 'Projects' });
    expect(projectsLink).toBeInTheDocument();
    expect(projectsLink).toHaveAttribute('href', '/projects');

    // Discord appears twice (nav + social), so get all and filter by href
    const discordLinks = screen.getAllByRole('link', { name: 'Discord' });
    const navDiscordLink = discordLinks.find(
      (link) => link.getAttribute('href') === '/discord',
    );
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
    expect(youtube).toHaveAttribute('href', 'https://www.youtube.com/@briantechcorner');
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
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('navigation links have proper styling classes', () => {
    renderWithTheme(<SiteHeader />);
    const navLinks = [
      screen.getByRole('link', { name: 'Blog' }),
      screen
        .getAllByRole('link', { name: 'Discord' })
        .find((link) => link.getAttribute('href') === '/discord'),
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
