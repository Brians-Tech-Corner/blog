import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CodeBlock } from './CodeBlock';

// Mock CopyButton
vi.mock('./CopyButton', () => ({
  CopyButton: ({ text }: { text: string }) => (
    <button data-testid="copy-button">Copy {text.substring(0, 10)}</button>
  ),
}));

describe('CodeBlock', () => {
  const mockCode = 'const greeting = "Hello, World!";';

  it('should render code block', () => {
    render(<CodeBlock className="language-typescript">{mockCode}</CodeBlock>);
    expect(screen.getByText(mockCode)).toBeInTheDocument();
  });

  it('should render copy button', () => {
    render(<CodeBlock className="language-typescript">{mockCode}</CodeBlock>);
    expect(screen.getByTestId('copy-button')).toBeInTheDocument();
  });

  it('should extract language from className', () => {
    render(<CodeBlock className="language-javascript">{mockCode}</CodeBlock>);
    expect(screen.getByText('javascript')).toBeInTheDocument();
  });

  it('should render filename when provided', () => {
    render(
      <CodeBlock className="language-typescript" filename="example.ts">
        {mockCode}
      </CodeBlock>,
    );
    expect(screen.getByText('example.ts')).toBeInTheDocument();
  });

  it('should not show language badge when filename is provided', () => {
    render(
      <CodeBlock className="language-typescript" filename="example.ts">
        {mockCode}
      </CodeBlock>,
    );
    expect(screen.queryByText('typescript')).not.toBeInTheDocument();
  });

  it('should handle text language type', () => {
    render(<CodeBlock className="language-text">{mockCode}</CodeBlock>);
    expect(screen.queryByText('text')).not.toBeInTheDocument();
  });

  it('should pass code to CopyButton', () => {
    render(<CodeBlock className="language-typescript">{mockCode}</CodeBlock>);
    const button = screen.getByTestId('copy-button');
    expect(button).toHaveTextContent('Copy const gree'); // First 10 chars
  });
});
