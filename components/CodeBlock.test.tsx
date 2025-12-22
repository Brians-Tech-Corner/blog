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

  it('should extract text from nested React elements', () => {
    const nestedContent = (
      <pre>
        <code>
          <span>Line 1</span>
          <span>Line 2</span>
        </code>
      </pre>
    );
    render(<CodeBlock className="language-javascript">{nestedContent}</CodeBlock>);
    const button = screen.getByTestId('copy-button');
    expect(button).toHaveTextContent('Copy Line 1Lin'); // Nested text extraction
  });

  it('should handle number children', () => {
    render(<CodeBlock className="language-javascript">{42}</CodeBlock>);
    const button = screen.getByTestId('copy-button');
    expect(button).toHaveTextContent('Copy 42');
  });

  it('should handle array children', () => {
    render(<CodeBlock className="language-javascript">{['const ', 'x = 1;']}</CodeBlock>);
    const button = screen.getByTestId('copy-button');
    expect(button).toHaveTextContent('Copy const x =');
  });

  it('should handle undefined className', () => {
    render(<CodeBlock>{mockCode}</CodeBlock>);
    expect(screen.queryByText('text')).not.toBeInTheDocument();
  });

  it('should default to text language when className is undefined', () => {
    render(<CodeBlock>{mockCode}</CodeBlock>);
    // Should not display language badge for 'text' type
    expect(screen.queryByText('text')).not.toBeInTheDocument();
    // Should still render the code content
    expect(screen.getByText(mockCode)).toBeInTheDocument();
    // Should still render copy button
    expect(screen.getByTestId('copy-button')).toBeInTheDocument();
  });

  it('should default to text language when className is empty string', () => {
    render(<CodeBlock className="">{mockCode}</CodeBlock>);
    // Should not display language badge for 'text' type
    expect(screen.queryByText('text')).not.toBeInTheDocument();
    // Copy button should still work
    expect(screen.getByTestId('copy-button')).toBeInTheDocument();
  });

  it('should extract text from Prism-like token structures', () => {
    // Simulate Prism's syntax highlighting structure
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
    // Should extract all text content, joining the tokens
    expect(button.textContent).toContain('Copy const gre'); // Verifies text extraction works
  });

  it('should extract text from deeply nested token structures', () => {
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
    expect(button.textContent).toContain('Copy console.l');
  });

  it('should handle mixed content types in nested structure', () => {
    const mixedContent = (
      <pre>
        <code>
          <span>Text</span>
          {42}
          <span>
            <span>Nested</span>
          </span>
          {['Array', 'Items']}
        </code>
      </pre>
    );
    render(<CodeBlock className="language-javascript">{mixedContent}</CodeBlock>);
    const button = screen.getByTestId('copy-button');
    // Should extract: "Text42NestedArrayItems"
    expect(button.textContent).toContain('Copy Text42Ne');
  });

  it('should handle empty React element props', () => {
    // Test the case where a React element has no children prop
    const emptySpan = <span />;
    render(<CodeBlock className="language-javascript">{emptySpan}</CodeBlock>);
    const button = screen.getByTestId('copy-button');
    // Should handle gracefully and return empty string for copy text
    expect(button).toBeInTheDocument();
  });

  it('should handle null and undefined in nested structure', () => {
    const withNulls = (
      <pre>
        <code>
          <span>Before</span>
          {null}
          {undefined}
          <span>After</span>
        </code>
      </pre>
    );
    render(<CodeBlock className="language-javascript">{withNulls}</CodeBlock>);
    const button = screen.getByTestId('copy-button');
    // Should skip null/undefined and extract: "BeforeAfter"
    expect(button.textContent).toContain('Copy BeforeAf');
  });
});
