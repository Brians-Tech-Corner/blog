import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import { Mermaid } from './Mermaid';
import mermaid from 'mermaid';

// Mock mermaid module
vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn().mockResolvedValue({
      svg: '<svg><text>Mocked Diagram</text></svg>',
    }),
  },
}));

describe('Mermaid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render mermaid diagram', async () => {
    const diagram = `
      graph TD
        A[Start] --> B[End]
    `;

    const { container } = render(<Mermaid>{diagram}</Mermaid>);

    await waitFor(() => {
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  it('should handle empty diagram', async () => {
    const { container } = render(<Mermaid>{''}</Mermaid>);

    // Should not crash
    expect(container).toBeInTheDocument();
  });

  it('should trim whitespace from diagram code', async () => {
    const diagram = `
      
      graph TD
        A --> B
      
    `;

    const { container } = render(<Mermaid>{diagram}</Mermaid>);

    await waitFor(() => {
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  it('should display error message when rendering fails with Error object', async () => {
    const errorMessage = 'Syntax error in diagram';
    vi.mocked(mermaid.render).mockRejectedValueOnce(new Error(errorMessage));

    const diagram = 'graph TD\n  A[Invalid';
    render(<Mermaid>{diagram}</Mermaid>);

    await waitFor(() => {
      expect(screen.getByText('Mermaid Error:')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('should display fallback error message when error is not an Error object', async () => {
    vi.mocked(mermaid.render).mockRejectedValueOnce('String error');

    const diagram = 'graph TD\n  A[Invalid';
    render(<Mermaid>{diagram}</Mermaid>);

    await waitFor(() => {
      expect(screen.getByText('Mermaid Error:')).toBeInTheDocument();
      expect(screen.getByText('Failed to render diagram')).toBeInTheDocument();
    });
  });

  it('should display the original diagram code in error state', async () => {
    vi.mocked(mermaid.render).mockRejectedValueOnce(new Error('Syntax error'));

    const diagram = 'graph TD\n  A[Invalid';
    const { container } = render(<Mermaid>{diagram}</Mermaid>);

    await waitFor(() => {
      const preElement = container.querySelector('pre');
      expect(preElement).toBeInTheDocument();
      expect(preElement?.textContent).toBe(diagram);
    });
  });
});
