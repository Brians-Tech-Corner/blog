import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Mermaid } from './Mermaid';

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
});
