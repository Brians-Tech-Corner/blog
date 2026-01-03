import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
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

  it('should open fullscreen view when diagram is clicked', async () => {
    const diagram = 'graph TD\n  A[Start] --> B[End]';
    render(<Mermaid>{diagram}</Mermaid>);

    await waitFor(() => {
      expect(screen.getByTitle('Click to view fullscreen')).toBeInTheDocument();
    });

    const diagramElement = screen.getByTitle('Click to view fullscreen');
    fireEvent.click(diagramElement);

    await waitFor(() => {
      expect(screen.getByText(/Close \(Esc\)/)).toBeInTheDocument();
    });
  });

  it('should close fullscreen view when close button is clicked', async () => {
    const diagram = 'graph TD\n  A[Start] --> B[End]';
    render(<Mermaid>{diagram}</Mermaid>);

    await waitFor(() => {
      expect(screen.getByTitle('Click to view fullscreen')).toBeInTheDocument();
    });

    // Open fullscreen
    fireEvent.click(screen.getByTitle('Click to view fullscreen'));

    await waitFor(() => {
      expect(screen.getByText(/Close \(Esc\)/)).toBeInTheDocument();
    });

    // Close fullscreen
    fireEvent.click(screen.getByText(/Close \(Esc\)/));

    await waitFor(() => {
      expect(screen.queryByText(/Close \(Esc\)/)).not.toBeInTheDocument();
    });
  });

  it('should close fullscreen view when Escape key is pressed', async () => {
    const diagram = 'graph TD\n  A[Start] --> B[End]';
    render(<Mermaid>{diagram}</Mermaid>);

    await waitFor(() => {
      expect(screen.getByTitle('Click to view fullscreen')).toBeInTheDocument();
    });

    // Open fullscreen
    fireEvent.click(screen.getByTitle('Click to view fullscreen'));

    await waitFor(() => {
      expect(screen.getByText(/Close \(Esc\)/)).toBeInTheDocument();
      expect(screen.getByText('300%')).toBeInTheDocument();
    });

    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByText(/Close \(Esc\)/)).not.toBeInTheDocument();
    });

    // Reopen to verify scale was reset
    fireEvent.click(screen.getByTitle('Click to view fullscreen'));

    await waitFor(() => {
      expect(screen.getByText('300%')).toBeInTheDocument();
    });
  });

  it('should have zoom controls in fullscreen view', async () => {
    const diagram = 'graph TD\n  A[Start] --> B[End]';
    render(<Mermaid>{diagram}</Mermaid>);

    await waitFor(() => {
      expect(screen.getByTitle('Click to view fullscreen')).toBeInTheDocument();
    });

    // Open fullscreen
    fireEvent.click(screen.getByTitle('Click to view fullscreen'));

    await waitFor(() => {
      expect(screen.getByTitle('Zoom in (+)')).toBeInTheDocument();
      expect(screen.getByTitle('Zoom out (-))')).toBeInTheDocument();
      expect(screen.getByTitle('Reset zoom')).toBeInTheDocument();
      expect(screen.getByText('300%')).toBeInTheDocument();
    });
  });

  it('should zoom in when zoom in button is clicked', async () => {
    const diagram = 'graph TD\n  A[Start] --> B[End]';
    render(<Mermaid>{diagram}</Mermaid>);

    await waitFor(() => {
      expect(screen.getByTitle('Click to view fullscreen')).toBeInTheDocument();
    });

    // Open fullscreen
    fireEvent.click(screen.getByTitle('Click to view fullscreen'));

    await waitFor(() => {
      expect(screen.getByText('300%')).toBeInTheDocument();
    });

    // Click zoom in
    fireEvent.click(screen.getByTitle('Zoom in (+)'));

    await waitFor(() => {
      expect(screen.getByText('325%')).toBeInTheDocument();
    });
  });

  it('should zoom out when zoom out button is clicked', async () => {
    const diagram = 'graph TD\n  A[Start] --> B[End]';
    render(<Mermaid>{diagram}</Mermaid>);

    await waitFor(() => {
      expect(screen.getByTitle('Click to view fullscreen')).toBeInTheDocument();
    });

    // Open fullscreen
    fireEvent.click(screen.getByTitle('Click to view fullscreen'));

    await waitFor(() => {
      expect(screen.getByText('300%')).toBeInTheDocument();
    });

    // Click zoom out
    fireEvent.click(screen.getByTitle('Zoom out (-))'));

    await waitFor(() => {
      expect(screen.getByText('275%')).toBeInTheDocument();
    });
  });

  it('should reset zoom when reset button is clicked', async () => {
    const diagram = 'graph TD\n  A[Start] --> B[End]';
    render(<Mermaid>{diagram}</Mermaid>);

    await waitFor(() => {
      expect(screen.getByTitle('Click to view fullscreen')).toBeInTheDocument();
    });

    // Open fullscreen
    fireEvent.click(screen.getByTitle('Click to view fullscreen'));

    // Zoom in twice
    fireEvent.click(screen.getByTitle('Zoom in (+)'));
    fireEvent.click(screen.getByTitle('Zoom in (+)'));

    await waitFor(() => {
      expect(screen.getByText('350%')).toBeInTheDocument();
    });

    // Reset zoom
    fireEvent.click(screen.getByTitle('Reset zoom'));

    await waitFor(() => {
      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });
});
