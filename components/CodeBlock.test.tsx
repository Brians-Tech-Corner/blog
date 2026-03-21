import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useState, useEffect } from 'react';
import { CodeBlock } from './CodeBlock';

// Mock CopyButton — accepts a getText fn instead of a static text string.
// We use useEffect to call getText() after the ref is committed to the DOM,
// which mirrors how it works in production (called on button click, not render).
vi.mock('./CopyButton', () => ({
  CopyButton: ({ getText }: { getText: () => string }) => {
    const [text, setText] = useState('');
    useEffect(() => {
      setText(getText());
    }, []);
    return <button data-testid="copy-button">Copy {text.substring(0, 10)}</button>;
  },
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

  it('should pass code to CopyButton via DOM textContent', async () => {
    render(
      <CodeBlock className="language-typescript">
        <pre><code>{mockCode}</code></pre>
      </CodeBlock>,
    );
    const button = screen.getByTestId('copy-button');
    await waitFor(() => expect(button).toHaveTextContent('Copy const gree')); // First 10 chars from DOM
  });

  it('should read full text from deeply nested Prism-like token spans', async () => {
    // Simulate rehype-prism wrapping every token in its own span — the old
    // extractText traversal would lose tokens; the DOM ref approach gets all of them.
    const prismContent = (
      <pre>
        <code className="language-javascript">
          <span className="token keyword">const</span>
          <span className="token plain"> greeting </span>
          <span className="token operator">=</span>
          <span className="token plain"> </span>
          <span className="token string">&quot;Hello&quot;</span>
          <span className="token punctuation">;</span>
        </code>
      </pre>
    );
    render(<CodeBlock className="language-javascript">{prismContent}</CodeBlock>);
    const button = screen.getByTestId('copy-button');
    await waitFor(() => expect(button.textContent).toContain('Copy const gre'));
  });

  it('should read full text from line-wrapped token structures', async () => {
    const deeplyNested = (
      <pre>
        <code>
          <span className="line">
            <span className="token function">
              <span>console</span>
            </span>
            <span className="token punctuation">.</span>
            <span className="token function">log</span>
          </span>
        </code>
      </pre>
    );
    render(<CodeBlock className="language-javascript">{deeplyNested}</CodeBlock>);
    const button = screen.getByTestId('copy-button');
    await waitFor(() => expect(button.textContent).toContain('Copy console.l'));
  });

  it('should handle undefined className', () => {
    render(<CodeBlock>{mockCode}</CodeBlock>);
    expect(screen.queryByText('text')).not.toBeInTheDocument();
  });

  it('should default to text language when className is undefined', () => {
    render(<CodeBlock>{mockCode}</CodeBlock>);
    expect(screen.queryByText('text')).not.toBeInTheDocument();
    expect(screen.getByText(mockCode)).toBeInTheDocument();
    expect(screen.getByTestId('copy-button')).toBeInTheDocument();
  });

  it('should default to text language when className is empty string', () => {
    render(<CodeBlock className="">{mockCode}</CodeBlock>);
    expect(screen.queryByText('text')).not.toBeInTheDocument();
    expect(screen.getByTestId('copy-button')).toBeInTheDocument();
  });

  it('should return empty string gracefully when no pre element is present', () => {
    // Without a <pre> descendant the ref querySelector returns null — should not throw.
    render(<CodeBlock className="language-javascript"><span /></CodeBlock>);
    const button = screen.getByTestId('copy-button');
    expect(button).toBeInTheDocument();
  });
});
