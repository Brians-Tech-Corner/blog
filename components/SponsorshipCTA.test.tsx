import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SponsorshipCTA } from './SponsorshipCTA';

function setSponsorEmail(email: string | undefined) {
  process.env.NEXT_PUBLIC_SPONSOR_EMAIL = email;
}

describe('SponsorshipCTA', () => {
  afterEach(() => {
    setSponsorEmail(undefined);
  });

  it('renders nothing when NEXT_PUBLIC_SPONSOR_EMAIL is not set', () => {
    setSponsorEmail(undefined);
    const { container } = render(<SponsorshipCTA />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when NEXT_PUBLIC_SPONSOR_EMAIL is the string "undefined"', () => {
    setSponsorEmail('undefined');
    const { container } = render(<SponsorshipCTA />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the CTA heading when sponsor email is set', () => {
    setSponsorEmail('sponsor@example.com');
    render(<SponsorshipCTA />);
    expect(screen.getByText(/Reach Engineers Who Build Platforms/i)).toBeInTheDocument();
  });

  it('renders the Get in Touch link with correct mailto href', () => {
    setSponsorEmail('sponsor@example.com');
    render(<SponsorshipCTA />);
    const link = screen.getByRole('link', { name: /Get in Touch/i });
    expect(link).toHaveAttribute(
      'href',
      'mailto:sponsor@example.com?subject=Sponsorship%20Inquiry',
    );
  });

  it('describes the available sponsorship formats', () => {
    setSponsorEmail('sponsor@example.com');
    render(<SponsorshipCTA />);
    expect(screen.getByText(/Sponsored posts, newsletter placements/i)).toBeInTheDocument();
  });
});
