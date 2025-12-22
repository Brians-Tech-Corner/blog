import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('should render the message', () => {
    render(<EmptyState message="No items found" />);
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('should apply proper styling classes', () => {
    const { container } = render(<EmptyState message="Test message" />);
    const element = container.firstChild as HTMLElement;
    
    expect(element).toHaveClass('rounded-2xl');
    expect(element).toHaveClass('border');
    expect(element).toHaveClass('p-8');
    expect(element).toHaveClass('text-center');
  });

  it('should support HTML entities in message', () => {
    render(<EmptyState message="No posts found with tag &ldquo;test&rdquo;" />);
    expect(screen.getByText(/No posts found with tag/)).toBeInTheDocument();
  });
});
