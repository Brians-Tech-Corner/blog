import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ClickableImage } from './ClickableImage';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  ),
}));

describe('ClickableImage', () => {
  it('should render the image', () => {
    render(<ClickableImage src="/test.jpg" alt="Test image" />);
    
    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
  });

  it('should open modal when image is clicked', () => {
    render(<ClickableImage src="/test.jpg" alt="Test image" />);
    
    const button = screen.getByRole('button', { name: 'Open full size Test image' });
    fireEvent.click(button);
    
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', () => {
    render(<ClickableImage src="/test.jpg" alt="Test image" />);
    
    // Open modal
    const openButton = screen.getByRole('button', { name: 'Open full size Test image' });
    fireEvent.click(openButton);
    
    // Close modal
    const closeButton = screen.getByRole('button', { name: 'Close modal' });
    fireEvent.click(closeButton);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should close modal when overlay is clicked', () => {
    render(<ClickableImage src="/test.jpg" alt="Test image" />);
    
    // Open modal
    const openButton = screen.getByRole('button', { name: 'Open full size Test image' });
    fireEvent.click(openButton);
    
    // Click overlay
    const modal = screen.getByRole('dialog');
    fireEvent.click(modal);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should not close modal when image is clicked', () => {
    render(<ClickableImage src="/test.jpg" alt="Test image" />);
    
    // Open modal
    const openButton = screen.getByRole('button', { name: 'Open full size Test image' });
    fireEvent.click(openButton);
    
    // Click the image inside modal (not the overlay)
    const images = screen.getAllByAltText('Test image');
    const modalImage = images[1]; // Second image is in the modal
    fireEvent.click(modalImage);
    
    // Modal should still be open
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should render with custom dimensions', () => {
    render(<ClickableImage src="/test.jpg" alt="Test image" width={1000} height={800} />);
    
    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
  });

  it('should render with thumbnail width constraint', () => {
    render(<ClickableImage src="/test.jpg" alt="Test image" width={1200} height={800} thumbnailWidth={600} />);
    
    const button = screen.getByRole('button', { name: 'Open full size Test image' });
    expect(button).toHaveStyle({ maxWidth: '600px' });
  });

  it('should have proper accessibility attributes', () => {
    render(<ClickableImage src="/test.jpg" alt="Test image" />);
    
    // Open modal
    const openButton = screen.getByRole('button', { name: 'Open full size Test image' });
    fireEvent.click(openButton);
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-label', 'Image modal');
  });
});
