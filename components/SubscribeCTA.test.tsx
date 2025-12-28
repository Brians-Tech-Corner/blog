import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SubscribeCTA } from './SubscribeCTA';

// Helper to set env var for test
function setBeehiivUrl(url: string | undefined) {
  process.env.NEXT_PUBLIC_BEEHIIV_URL = url;
}

describe('SubscribeCTA', () => {
  afterEach(() => {
    setBeehiivUrl(undefined);
  });

  it('renders nothing if NEXT_PUBLIC_BEEHIIV_URL is not set', () => {
    setBeehiivUrl(undefined);
    const { container } = render(<SubscribeCTA />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the CTA if NEXT_PUBLIC_BEEHIIV_URL is set', () => {
    setBeehiivUrl('https://test.beehiiv.com');
    render(<SubscribeCTA />);
    expect(screen.getByText('Get New Posts in Your Inbox')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /subscribe on beehiiv/i })).toHaveAttribute('href', 'https://test.beehiiv.com');
  });
});
