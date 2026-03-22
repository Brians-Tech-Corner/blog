import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SubscribeCTA } from './SubscribeCTA';

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

  it('renders nothing if NEXT_PUBLIC_BEEHIIV_URL is "undefined"', () => {
    setBeehiivUrl('undefined');
    const { container } = render(<SubscribeCTA />);
    expect(container).toBeEmptyDOMElement();
  });

  describe('full variant (default)', () => {
    it('renders the heading', () => {
      setBeehiivUrl('https://test.beehiiv.com');
      render(<SubscribeCTA />);
      expect(screen.getByText('Real-World Platform Engineering in Your Inbox')).toBeInTheDocument();
    });

    it('renders a subscribe link pointing to beehiiv', () => {
      setBeehiivUrl('https://test.beehiiv.com');
      render(<SubscribeCTA />);
      const link = screen.getByRole('link', { name: /subscribe.*free/i });
      expect(link).toHaveAttribute('href', 'https://test.beehiiv.com');
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  describe('inline variant', () => {
    it('renders a compact prompt instead of the full heading', () => {
      setBeehiivUrl('https://test.beehiiv.com');
      render(<SubscribeCTA variant="inline" />);
      expect(screen.getByText(/Enjoying this\? Get more in your inbox\./i)).toBeInTheDocument();
      expect(screen.queryByText('Real-World Platform Engineering in Your Inbox')).not.toBeInTheDocument();
    });

    it('renders a subscribe link pointing to beehiiv', () => {
      setBeehiivUrl('https://test.beehiiv.com');
      render(<SubscribeCTA variant="inline" />);
      const link = screen.getByRole('link', { name: /subscribe free/i });
      expect(link).toHaveAttribute('href', 'https://test.beehiiv.com');
    });

    it('renders nothing when url is not set', () => {
      setBeehiivUrl(undefined);
      const { container } = render(<SubscribeCTA variant="inline" />);
      expect(container).toBeEmptyDOMElement();
    });
  });
});
