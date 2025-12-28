import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PrivacyPage from './page';

describe('PrivacyPage', () => {
  it('renders privacy policy title', () => {
    render(<PrivacyPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeInTheDocument();
  });

  it('displays last updated date', () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
  });

  it('renders overview section', () => {
    render(<PrivacyPage />);
    expect(screen.getByRole('heading', { name: 'Overview' })).toBeInTheDocument();
    expect(
      screen.getByText(/Brian's Tech Corner respects your privacy/),
    ).toBeInTheDocument();
  });

  it('renders analytics section with Vercel Analytics link', () => {
    render(<PrivacyPage />);
    expect(screen.getByRole('heading', { name: 'Analytics' })).toBeInTheDocument();

    const vercelLink = screen.getByRole('link', { name: 'Vercel Analytics' });
    expect(vercelLink).toBeInTheDocument();
    expect(vercelLink).toHaveAttribute('href', 'https://vercel.com/docs/analytics');
    expect(vercelLink).toHaveAttribute('target', '_blank');
    expect(vercelLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('lists analytics data collected', () => {
    render(<PrivacyPage />);
    expect(screen.getByText('Page views and visitor counts')).toBeInTheDocument();
    expect(screen.getByText('Referral sources (where visitors come from)')).toBeInTheDocument();
    expect(screen.getByText(/General geographic location/)).toBeInTheDocument();
    expect(screen.getByText('Device type and browser information')).toBeInTheDocument();
  });

  it('renders comments section with Giscus link', () => {
    render(<PrivacyPage />);
    expect(screen.getByRole('heading', { name: 'Comments (Giscus)' })).toBeInTheDocument();

    const giscusLink = screen.getByRole('link', { name: 'Giscus' });
    expect(giscusLink).toBeInTheDocument();
    expect(giscusLink).toHaveAttribute('href', 'https://giscus.app');
    expect(giscusLink).toHaveAttribute('target', '_blank');
    expect(giscusLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('clarifies no cookies are used and explains local storage', () => {
    render(<PrivacyPage />);
    expect(
      screen.getByRole('heading', { name: 'Cookies and Local Storage' }),
    ).toBeInTheDocument();
    expect(screen.getByText('This site does not use cookies.')).toBeInTheDocument();
    expect(
      screen.getByText(/No tracking cookies, analytics cookies, or third-party cookies/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Theme preference/)).toBeInTheDocument();
  });

  it('renders third-party links section', () => {
    render(<PrivacyPage />);
    expect(screen.getByRole('heading', { name: 'Third-Party Links' })).toBeInTheDocument();
    expect(
      screen.getByText(/This site contains links to external websites/),
    ).toBeInTheDocument();
  });

  it('renders data storage section', () => {
    render(<PrivacyPage />);
    expect(
      screen.getByRole('heading', { name: 'Data Storage and Security' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/This is a static site hosted on Vercel/)).toBeInTheDocument();
  });

  it('renders user rights section', () => {
    render(<PrivacyPage />);
    expect(screen.getByRole('heading', { name: 'Your Rights' })).toBeInTheDocument();
  });

  it('renders changes to policy section', () => {
    render(<PrivacyPage />);
    expect(
      screen.getByRole('heading', { name: 'Changes to This Policy' }),
    ).toBeInTheDocument();
  });

  it('renders contact section with social links', () => {
    render(<PrivacyPage />);
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/brians-tech-corner');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    const xLink = screen.getByRole('link', { name: 'X/Twitter' });
    expect(xLink).toBeInTheDocument();
    expect(xLink).toHaveAttribute('href', 'https://x.com/brianstechcorn');
    expect(xLink).toHaveAttribute('target', '_blank');
    expect(xLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders back to home link', () => {
    render(<PrivacyPage />);
    const backLink = screen.getByRole('link', { name: '← Back to Home' });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('all external links use consistent styling', () => {
    render(<PrivacyPage />);
    const externalLinks = [
      screen.getByRole('link', { name: 'Vercel Analytics' }),
      screen.getByRole('link', { name: 'Giscus' }),
      screen.getByRole('link', { name: 'GitHub' }),
      screen.getByRole('link', { name: 'X/Twitter' }),
    ];

    // All external links should have the same className
    const firstLinkClass = externalLinks[0].className;
    externalLinks.forEach((link) => {
      expect(link.className).toBe(firstLinkClass);
    });
  });
});
