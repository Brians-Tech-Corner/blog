import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SponsorshipCTA } from './SponsorshipCTA';

describe('SponsorshipCTA', () => {
  it('always renders the CTA heading', () => {
    render(<SponsorshipCTA />);
    expect(screen.getByText(/Reach Engineers Who Build Platforms/i)).toBeInTheDocument();
  });

  it('renders a link to the sponsor page', () => {
    render(<SponsorshipCTA />);
    const link = screen.getByRole('link', { name: /See Formats/i });
    expect(link).toHaveAttribute('href', '/sponsor');
  });

  it('describes the available sponsorship formats', () => {
    render(<SponsorshipCTA />);
    expect(screen.getByText(/Sponsored posts, newsletter placements/i)).toBeInTheDocument();
  });
});
