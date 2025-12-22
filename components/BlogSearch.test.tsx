import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BlogSearch } from './BlogSearch';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('BlogSearch', () => {
  const mockPush = vi.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    vi.clearAllMocks();
    
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as any);
    
    vi.mocked(useSearchParams).mockReturnValue(mockSearchParams as any);
  });

  it('should render SearchBar component', () => {
    render(<BlogSearch />);
    expect(screen.getByPlaceholderText(/Search posts/i)).toBeInTheDocument();
  });

  it('should navigate to /blog with query parameter when searching', async () => {
    vi.useFakeTimers();
    
    render(<BlogSearch />);
    const input = screen.getByPlaceholderText(/Search posts/i);
    
    // Simulate typing
    fireEvent.change(input, { target: { value: 'kubernetes' } });
    
    // Fast-forward debounce
    await vi.advanceTimersByTimeAsync(300);
    
    expect(mockPush).toHaveBeenCalledWith('/blog?q=kubernetes');
    
    vi.useRealTimers();
  });

  it('should navigate to /blog without query when cleared', async () => {
    vi.useFakeTimers();
    
    render(<BlogSearch />);
    const input = screen.getByPlaceholderText(/Search posts/i);
    
    // Simulate clearing
    fireEvent.change(input, { target: { value: '' } });
    
    // Fast-forward debounce
    await vi.advanceTimersByTimeAsync(300);
    
    expect(mockPush).toHaveBeenCalledWith('/blog');
    
    vi.useRealTimers();
  });

  it('should preserve existing search params when searching', async () => {
    vi.useFakeTimers();
    
    // Mock existing tag parameter
    const existingParams = new URLSearchParams('tag=kubernetes');
    vi.mocked(useSearchParams).mockReturnValue(existingParams as any);
    
    render(<BlogSearch />);
    const input = screen.getByPlaceholderText(/Search posts/i);
    
    // Simulate typing
    fireEvent.change(input, { target: { value: 'homelab' } });
    
    // Fast-forward debounce
    await vi.advanceTimersByTimeAsync(300);
    
    expect(mockPush).toHaveBeenCalledWith('/blog?tag=kubernetes&q=homelab');
    
    vi.useRealTimers();
  });
});
