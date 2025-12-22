import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Comments } from './Comments';

// Mock the ThemeProvider
const mockUseTheme = vi.fn(() => ({ theme: 'light', toggleTheme: vi.fn() }));

vi.mock('./ThemeProvider', () => ({
  useTheme: () => mockUseTheme(),
}));

// Mock Giscus component
vi.mock('@giscus/react', () => ({
  default: ({ theme, repo }: { theme: string; repo: string }) => (
    <div data-testid="giscus-mock" data-theme={theme} data-repo={repo}>
      Giscus Comments
    </div>
  ),
}));

describe('Comments', () => {
  const mockProps = {
    repo: 'test-owner/test-repo',
    repoId: 'test-repo-id',
    category: 'General',
    categoryId: 'test-category-id',
  };

  beforeEach(() => {
    mockUseTheme.mockReturnValue({ theme: 'light', toggleTheme: vi.fn() });
  });

  it('should render comments section', () => {
    render(<Comments {...mockProps} />);
    expect(screen.getByText('Comments')).toBeInTheDocument();
  });

  it('should render Giscus component', () => {
    render(<Comments {...mockProps} />);
    expect(screen.getByTestId('giscus-mock')).toBeInTheDocument();
  });

  it('should pass correct repo to Giscus', () => {
    render(<Comments {...mockProps} />);
    const giscus = screen.getByTestId('giscus-mock');
    expect(giscus).toHaveAttribute('data-repo', 'test-owner/test-repo');
  });

  it('should use light theme by default', () => {
    render(<Comments {...mockProps} />);
    const giscus = screen.getByTestId('giscus-mock');
    expect(giscus).toHaveAttribute('data-theme', 'light');
  });

  it('should use dark theme when theme provider returns dark', () => {
    mockUseTheme.mockReturnValueOnce({ theme: 'dark', toggleTheme: vi.fn() });

    render(<Comments {...mockProps} />);
    const giscus = screen.getByTestId('giscus-mock');
    expect(giscus).toHaveAttribute('data-theme', 'dark');
  });
});
