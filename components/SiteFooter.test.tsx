import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SiteFooter } from './SiteFooter';

describe('SiteFooter', () => {
  it('renders copyright with current year', () => {
    render(<SiteFooter />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Brian's Tech Corner`),
    ).toBeInTheDocument();
  });

  it('displays "Built with Next.js + MDX" text', () => {
    render(<SiteFooter />);
    expect(screen.getByText('Built with Next.js + MDX.')).toBeInTheDocument();
  });

  it('renders Blog link', () => {
    render(<SiteFooter />);
    const blogLink = screen.getByRole('link', { name: 'Blog' });
    expect(blogLink).toBeInTheDocument();
    expect(blogLink).toHaveAttribute('href', '/blog');
  });

  it('renders About link', () => {
    render(<SiteFooter />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('renders RSS link', () => {
    render(<SiteFooter />);
    const rssLink = screen.getByRole('link', { name: 'RSS' });
    expect(rssLink).toBeInTheDocument();
    expect(rssLink).toHaveAttribute('href', '/rss.xml');
  });

  it('renders Privacy link', () => {
    render(<SiteFooter />);
    const privacyLink = screen.getByRole('link', { name: 'Privacy' });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy');
  });

  it('renders all social media links', () => {
    render(<SiteFooter />);

    const discordLink = screen.getByRole('link', { name: 'Discord' });
    expect(discordLink).toBeInTheDocument();
    expect(discordLink).toHaveAttribute('href', 'https://discord.gg/q2N7R2KDRs');

    const youtubeLink = screen.getByRole('link', { name: 'YouTube' });
    expect(youtubeLink).toBeInTheDocument();
    expect(youtubeLink).toHaveAttribute('href', 'https://youtube.com/@brianstechcorner');

    const xLink = screen.getByRole('link', { name: 'X (Twitter)' });
    expect(xLink).toBeInTheDocument();
    expect(xLink).toHaveAttribute('href', 'https://x.com/brianstechcorn');

    const instagramLink = screen.getByRole('link', { name: 'Instagram' });
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/brianstechcorner');

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/brians-tech-corner');
  });

  it('social media links open in new tab with proper security attributes', () => {
    render(<SiteFooter />);

    const socialLinks = [
      screen.getByRole('link', { name: 'Discord' }),
      screen.getByRole('link', { name: 'YouTube' }),
      screen.getByRole('link', { name: 'X (Twitter)' }),
      screen.getByRole('link', { name: 'Instagram' }),
      screen.getByRole('link', { name: 'GitHub' }),
    ];

    socialLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders descriptive text about the site', () => {
    render(<SiteFooter />);
    expect(
      screen.getByText(/This site documents personal projects and experiments/),
    ).toBeInTheDocument();
  });

  it('navigation links use consistent styling', () => {
    render(<SiteFooter />);
    const navLinks = [
      screen.getByRole('link', { name: 'Blog' }),
      screen.getByRole('link', { name: 'About' }),
      screen.getByRole('link', { name: 'RSS' }),
      screen.getByRole('link', { name: 'Privacy' }),
    ];

    // All navigation links should have the same className
    const firstLinkClass = navLinks[0].className;
    navLinks.forEach((link) => {
      expect(link.className).toBe(firstLinkClass);
    });
  });
});
