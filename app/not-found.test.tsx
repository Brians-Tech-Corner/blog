import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from './not-found';

describe('NotFound', () => {
  it('should render 404 heading', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('should render page not found message', () => {
    render(<NotFound />);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('should render helpful description', () => {
    render(<NotFound />);
    expect(
      screen.getByText(/The page you're looking for doesn't exist or has been moved/),
    ).toBeInTheDocument();
  });

  it('should render link to home page', () => {
    render(<NotFound />);
    const homeLink = screen.getByRole('link', { name: /go home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render link to blog page', () => {
    render(<NotFound />);
    const blogLink = screen.getByRole('link', { name: /view all posts/i });
    expect(blogLink).toBeInTheDocument();
    expect(blogLink).toHaveAttribute('href', '/blog');
  });
});
