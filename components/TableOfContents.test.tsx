import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { TableOfContents } from './TableOfContents';
import type { TocHeading } from '@/lib/toc';

describe('TableOfContents', () => {
  const mockHeadings: TocHeading[] = [
    { id: 'heading-1', text: 'First Heading', level: 2 },
    { id: 'heading-2', text: 'Second Heading', level: 2 },
    { id: 'heading-3', text: 'Nested Heading', level: 3 },
    { id: 'heading-4', text: 'Another Heading', level: 2 },
  ];

  // Mock IntersectionObserver
  let observeCallback: IntersectionObserverCallback;
  let observeMock: any;
  let disconnectMock: any;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();

    // Create a mock IntersectionObserver class
    const MockIntersectionObserver = class {
      constructor(callback: IntersectionObserverCallback) {
        observeCallback = callback;
      }
      observe = observeMock;
      disconnect = disconnectMock;
      unobserve = vi.fn();
      takeRecords = vi.fn();
      root = null;
      rootMargin = '';
      thresholds = [];
    };

    // Replace the global IntersectionObserver with our mock
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    // Mock document.getElementById
    vi.spyOn(document, 'getElementById').mockImplementation((id: string) => {
      const element = document.createElement('div');
      element.id = id;
      return element;
    });

    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all headings', () => {
    render(<TableOfContents headings={mockHeadings} />);

    expect(screen.getByText('First Heading')).toBeInTheDocument();
    expect(screen.getByText('Second Heading')).toBeInTheDocument();
    expect(screen.getByText('Nested Heading')).toBeInTheDocument();
    expect(screen.getByText('Another Heading')).toBeInTheDocument();
  });

  it('renders "On This Page" heading', () => {
    render(<TableOfContents headings={mockHeadings} />);
    expect(screen.getByText('On This Page')).toBeInTheDocument();
  });

  it('returns null when headings array is empty', () => {
    const { container } = render(<TableOfContents headings={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('applies correct indentation for h3 headings', () => {
    const { container } = render(<TableOfContents headings={mockHeadings} />);

    // Find all list items
    const listItems = container.querySelectorAll('li');

    // heading-1 (level 2) should not have ml-4 class
    expect(listItems[0]).not.toHaveClass('ml-4');

    // heading-2 (level 2) should not have ml-4 class
    expect(listItems[1]).not.toHaveClass('ml-4');

    // heading-3 (level 3) should have ml-4 class
    expect(listItems[2]).toHaveClass('ml-4');

    // heading-4 (level 2) should not have ml-4 class
    expect(listItems[3]).not.toHaveClass('ml-4');
  });

  it('creates correct href links for headings', () => {
    render(<TableOfContents headings={mockHeadings} />);

    const firstLink = screen.getByText('First Heading').closest('a');
    expect(firstLink).toHaveAttribute('href', '#heading-1');

    const nestedLink = screen.getByText('Nested Heading').closest('a');
    expect(nestedLink).toHaveAttribute('href', '#heading-3');
  });

  it('calls scrollIntoView with smooth behavior when link is clicked', () => {
    const scrollIntoViewMock = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    render(<TableOfContents headings={mockHeadings} />);

    const firstLink = screen.getByText('First Heading').closest('a');
    if (firstLink) {
      fireEvent.click(firstLink);

      expect(scrollIntoViewMock).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });

  it('prevents default link behavior on click', () => {
    render(<TableOfContents headings={mockHeadings} />);

    const firstLink = screen.getByText('First Heading').closest('a');
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

    if (firstLink) {
      firstLink.dispatchEvent(clickEvent);
      expect(preventDefaultSpy).toHaveBeenCalled();
    }
  });

  it('highlights active heading when in view', async () => {
    render(<TableOfContents headings={mockHeadings} />);

    // Get the link elements
    const firstLink = screen.getByText('First Heading').closest('a');

    // Initially, no heading should be active (highlighted)
    expect(firstLink).toHaveClass('text-zinc-600');
    expect(firstLink).not.toHaveClass('font-medium');

    // Simulate intersection observer callback
    if (observeCallback) {
      const mockEntry: Partial<IntersectionObserverEntry> = {
        isIntersecting: true,
        target: { id: 'heading-1' } as HTMLElement,
      };

      await act(async () => {
        observeCallback(
          [mockEntry as IntersectionObserverEntry],
          {} as IntersectionObserver,
        );
      });

      // Wait for state update
      await waitFor(() => {
        const updatedFirstLink = screen.getByText('First Heading').closest('a');
        expect(updatedFirstLink).toHaveClass('font-medium');
        expect(updatedFirstLink).toHaveClass('text-zinc-900');
      });

      // Second link should still not be active
      const updatedSecondLink = screen.getByText('Second Heading').closest('a');
      expect(updatedSecondLink).not.toHaveClass('font-medium');
    }
  });

  it('observes all heading elements on mount', () => {
    render(<TableOfContents headings={mockHeadings} />);

    // Should observe each heading element
    expect(observeMock).toHaveBeenCalledTimes(mockHeadings.length);
  });

  it('disconnects observer on unmount', () => {
    const { unmount } = render(<TableOfContents headings={mockHeadings} />);

    expect(disconnectMock).not.toHaveBeenCalled();

    unmount();

    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it('handles single heading', () => {
    const singleHeading: TocHeading[] = [
      { id: 'only-heading', text: 'Only Heading', level: 2 },
    ];

    render(<TableOfContents headings={singleHeading} />);

    expect(screen.getByText('Only Heading')).toBeInTheDocument();
    expect(screen.queryByText('First Heading')).not.toBeInTheDocument();
  });

  it('renders navigation element with correct structure', () => {
    const { container } = render(<TableOfContents headings={mockHeadings} />);

    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass('sticky');

    const ul = container.querySelector('ul');
    expect(ul).toBeInTheDocument();
  });
});
