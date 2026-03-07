import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SponsorshipCTA } from './SponsorshipCTA';

// Helper to set env var for test
function setSponsorEmail(email: string | undefined) {
  process.env.NEXT_PUBLIC_SPONSOR_EMAIL = email;
}

describe('SponsorshipCTA', () => {
  afterEach(() => {
    setSponsorEmail(undefined);
  });

  it('renders nothing if NEXT_PUBLIC_SPONSOR_EMAIL is not set', () => {
    setSponsorEmail(undefined);
    const { container } = render(<SponsorshipCTA />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the CTA if NEXT_PUBLIC_SPONSOR_EMAIL is set', () => {
    setSponsorEmail('sponsor@example.com');
    render(<SponsorshipCTA />);
    expect(
      screen.getByRole('heading', { name: /Interested in Sponsoring/i }),
    ).toBeInTheDocument();
  });

  it('renders sponsorship description text', () => {
    setSponsorEmail('sponsor@example.com');
    render(<SponsorshipCTA />);
    expect(
      screen.getByText(/I write for platform engineers/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Featured posts reach 10k\+ engineering professionals/i),
    ).toBeInTheDocument();
  });

  it('renders Get in Touch button with correct mailto link', () => {
    setSponsorEmail('sponsor@example.com');
    render(<SponsorshipCTA />);
    const button = screen.getByRole('link', { name: /Get in Touch/i });
    expect(button).toHaveAttribute(
      'href',
      'mailto:sponsor@example.com?subject=Sponsorship%20Inquiry',
    );
  });

  it('renders nothing if email is set to undefined string', () => {
    setSponsorEmail('undefined');
    const { container } = render(<SponsorshipCTA />);
    expect(container).toBeEmptyDOMElement();
  });
});
