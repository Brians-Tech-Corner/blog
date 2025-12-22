import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render search input', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText('Search posts...')).toBeInTheDocument();
  });

  it('should render custom placeholder', () => {
    render(<SearchBar onSearch={mockOnSearch} placeholder="Find articles..." />);
    expect(screen.getByPlaceholderText('Find articles...')).toBeInTheDocument();
  });

  it('should render search icon', () => {
    const { container } = render(<SearchBar onSearch={mockOnSearch} />);
    const searchIcon = container.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
  });

  it('should show clear button when input has value', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search posts...');
    
    // Initially no clear button
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    
    // Type text
    fireEvent.change(input, { target: { value: 'test query' } });
    
    // Clear button should appear
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('should clear input when clear button is clicked', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search posts...') as HTMLInputElement;
    
    // Type text
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input.value).toBe('test query');
    
    // Click clear button
    const clearButton = screen.getByLabelText('Clear search');
    fireEvent.click(clearButton);
    
    // Input should be cleared
    expect(input.value).toBe('');
  });

  it('should call onSearch with debounced query', async () => {
    vi.useFakeTimers();
    
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search posts...');
    
    // Type text
    fireEvent.change(input, { target: { value: 'kubernetes' } });
    
    // Should not call immediately
    expect(mockOnSearch).not.toHaveBeenCalled();
    
    // Fast-forward 300ms (debounce delay) and run pending timers
    await vi.advanceTimersByTimeAsync(300);
    
    // Should call onSearch after debounce
    expect(mockOnSearch).toHaveBeenCalledWith('kubernetes');
    
    vi.useRealTimers();
  });

  it('should debounce multiple rapid changes', async () => {
    vi.useFakeTimers();
    
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search posts...');
    
    // Type multiple characters rapidly
    fireEvent.change(input, { target: { value: 'k' } });
    await vi.advanceTimersByTimeAsync(100);
    
    fireEvent.change(input, { target: { value: 'ku' } });
    await vi.advanceTimersByTimeAsync(100);
    
    fireEvent.change(input, { target: { value: 'kub' } });
    
    // Should not have called yet
    expect(mockOnSearch).not.toHaveBeenCalled();
    
    // Fast-forward 300ms from last change
    await vi.advanceTimersByTimeAsync(300);
    
    // Should only call once with the final value
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('kub');
    
    vi.useRealTimers();
  });

  it('should call onSearch with empty string when cleared', async () => {
    vi.useFakeTimers();
    
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search posts...');
    
    // Type text
    fireEvent.change(input, { target: { value: 'test' } });
    await vi.advanceTimersByTimeAsync(300);
    
    expect(mockOnSearch).toHaveBeenCalledWith('test');
    
    mockOnSearch.mockClear();
    
    // Clear input
    const clearButton = screen.getByLabelText('Clear search');
    fireEvent.click(clearButton);
    await vi.advanceTimersByTimeAsync(300);
    
    // Should call onSearch with empty string
    expect(mockOnSearch).toHaveBeenCalledWith('');
    
    vi.useRealTimers();
  });

  it('should have proper accessibility attributes', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search posts...');
    
    expect(input).toHaveAttribute('aria-label', 'Search posts');
    expect(input).toHaveAttribute('type', 'text');
  });
});
