import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CopyButton } from './CopyButton';

describe('CopyButton', () => {
  const mockText = 'console.log("Hello, World!");';

  // Mock clipboard API
  const mockWriteText = vi.fn();

  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
      configurable: true,
    });
    mockWriteText.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it('should render copy button', () => {
    render(<CopyButton text={mockText} />);
    expect(screen.getByRole('button', { name: /copy code to clipboard/i })).toBeInTheDocument();
  });

  it('should display "Copy" text initially', () => {
    render(<CopyButton text={mockText} />);
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('should copy text to clipboard when clicked', async () => {
    render(<CopyButton text={mockText} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith(mockText);
    });
  });

  it('should show "Copied!" after successful copy', async () => {
    render(<CopyButton text={mockText} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });

  it('should revert to "Copy" after 2 seconds', async () => {
    render(<CopyButton text={mockText} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    // Should show "Copied!" immediately
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });

    // After 2 seconds should revert to "Copy"
    await waitFor(
      () => {
        expect(screen.getByText('Copy')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should handle copy failure gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockWriteText.mockRejectedValueOnce(new Error('Clipboard API not available'));

    render(<CopyButton text={mockText} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    // Should log error and show "Failed!" message
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(screen.getByText('Failed!')).toBeInTheDocument();
    });

    // After 2 seconds should revert to "Copy"
    await waitFor(
      () => {
        expect(screen.getByText('Copy')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    consoleErrorSpy.mockRestore();
  });
});
