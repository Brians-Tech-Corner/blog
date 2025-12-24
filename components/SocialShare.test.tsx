import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SocialShare } from './SocialShare';

describe('SocialShare', () => {
  const mockProps = {
    url: 'https://brianstechcorner.com/blog/test-post',
    title: 'Test Post Title',
    description: 'Test post description',
    tags: ['test', 'blog'],
  };

  let windowOpenSpy: ReturnType<typeof vi.spyOn>;
  let clipboardWriteTextSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    // Mock clipboard API properly
    clipboardWriteTextSpy = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: clipboardWriteTextSpy,
      },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render the component with title', () => {
    render(<SocialShare {...mockProps} />);
    expect(screen.getByText('Share this post')).toBeInTheDocument();
  });

  it('should render all social platform buttons', () => {
    render(<SocialShare {...mockProps} />);

    // Check for platform names (visible on larger screens)
    expect(screen.getByText('Twitter/X')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Reddit')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
  });

  it('should render copy link button', () => {
    render(<SocialShare {...mockProps} />);
    expect(screen.getByText('Copy Link')).toBeInTheDocument();
  });

  it('should open Twitter share dialog with correct URL and hashtags', () => {
    render(<SocialShare {...mockProps} />);

    const twitterButton = screen.getByLabelText('Share on Twitter/X');
    fireEvent.click(twitterButton);

    expect(windowOpenSpy).toHaveBeenCalledWith(
      expect.stringContaining('https://twitter.com/intent/tweet'),
      '_blank',
      'noopener,noreferrer,width=600,height=400',
    );

    const callUrl = windowOpenSpy.mock.calls[0][0] as string;
    expect(callUrl).toContain(encodeURIComponent(mockProps.url));
    expect(callUrl).toContain(encodeURIComponent('#test'));
    expect(callUrl).toContain(encodeURIComponent('#blog'));
  });

  it('should open LinkedIn share dialog with correct URL', () => {
    render(<SocialShare {...mockProps} />);

    const linkedinButton = screen.getByLabelText('Share on LinkedIn');
    fireEvent.click(linkedinButton);

    expect(windowOpenSpy).toHaveBeenCalledWith(
      expect.stringContaining('https://www.linkedin.com/sharing/share-offsite/'),
      '_blank',
      'noopener,noreferrer,width=600,height=400',
    );

    const callUrl = windowOpenSpy.mock.calls[0][0] as string;
    expect(callUrl).toContain(encodeURIComponent(mockProps.url));
  });

  it('should open Reddit share dialog with correct URL and title', () => {
    render(<SocialShare {...mockProps} />);

    const redditButton = screen.getByLabelText('Share on Reddit');
    fireEvent.click(redditButton);

    expect(windowOpenSpy).toHaveBeenCalledWith(
      expect.stringContaining('https://www.reddit.com/submit'),
      '_blank',
      'noopener,noreferrer,width=600,height=400',
    );

    const callUrl = windowOpenSpy.mock.calls[0][0] as string;
    expect(callUrl).toContain(encodeURIComponent(mockProps.url));
    expect(callUrl).toContain(encodeURIComponent(mockProps.title));
  });

  it('should open Facebook share dialog with correct URL', () => {
    render(<SocialShare {...mockProps} />);

    const facebookButton = screen.getByLabelText('Share on Facebook');
    fireEvent.click(facebookButton);

    expect(windowOpenSpy).toHaveBeenCalledWith(
      expect.stringContaining('https://www.facebook.com/sharer/sharer.php'),
      '_blank',
      'noopener,noreferrer,width=600,height=400',
    );

    const callUrl = windowOpenSpy.mock.calls[0][0] as string;
    expect(callUrl).toContain(encodeURIComponent(mockProps.url));
  });

  it('should copy URL to clipboard when copy button is clicked', async () => {
    render(<SocialShare {...mockProps} />);

    const copyButton = screen.getByLabelText('Copy link');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(clipboardWriteTextSpy).toHaveBeenCalledWith(mockProps.url);
    });
  });

  it('should show "Copied!" feedback after copying', async () => {
    render(<SocialShare {...mockProps} />);

    const copyButton = screen.getByLabelText('Copy link');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });

  it('should handle clipboard copy failure', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    clipboardWriteTextSpy.mockRejectedValueOnce(new Error('Copy failed'));

    render(<SocialShare {...mockProps} />);

    const copyButton = screen.getByLabelText('Copy link');
    fireEvent.click(copyButton);

    // Give it a moment for the async operation
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to copy:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });

  it('should work without tags', () => {
    const propsWithoutTags = { ...mockProps, tags: undefined };
    render(<SocialShare {...propsWithoutTags} />);

    const twitterButton = screen.getByLabelText('Share on Twitter/X');
    fireEvent.click(twitterButton);

    const callUrl = windowOpenSpy.mock.calls[0][0] as string;
    expect(callUrl).toContain(encodeURIComponent(mockProps.title));
    // Should not contain hashtags when tags are undefined
    expect(callUrl).not.toContain('#');
  });

  it('should work with empty tags array', () => {
    const propsWithEmptyTags = { ...mockProps, tags: [] };
    render(<SocialShare {...propsWithEmptyTags} />);

    const twitterButton = screen.getByLabelText('Share on Twitter/X');
    fireEvent.click(twitterButton);

    const callUrl = windowOpenSpy.mock.calls[0][0] as string;
    expect(callUrl).toContain(encodeURIComponent(mockProps.title));
    // Should not contain hashtags when tags array is empty
    expect(callUrl).not.toContain('#');
  });

  it('should have accessible ARIA labels for all buttons', () => {
    render(<SocialShare {...mockProps} />);

    expect(screen.getByLabelText('Share on Twitter/X')).toBeInTheDocument();
    expect(screen.getByLabelText('Share on LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Share on Reddit')).toBeInTheDocument();
    expect(screen.getByLabelText('Share on Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Copy link')).toBeInTheDocument();
  });
});
