'use client';

import { CopyButton } from './CopyButton';
import { ReactNode } from 'react';

type CodeBlockProps = {
  children: ReactNode;
  className?: string;
  filename?: string;
};

export function CodeBlock({ children, className, filename }: CodeBlockProps) {
  // Extract language from className (e.g., "language-typescript" -> "typescript")
  const language = className?.replace(/language-/, '') || 'text';

  // Extract plain text for copying from the pre element's children
  const extractText = (node: ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (node && typeof node === 'object' && 'props' in node) {
      const props = (node as { props: { children?: ReactNode } }).props;
      return extractText(props.children);
    }
    return '';
  };

  const textContent = extractText(children);

  return (
    <div className="group relative">
      {/* Optional filename badge */}
      {filename && (
        <div className="rounded-t-xl border border-b-0 border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
          {filename}
        </div>
      )}

      {/* Language badge */}
      {!filename && language !== 'text' && (
        <div className="absolute left-4 top-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {language}
        </div>
      )}

      {/* Copy button */}
      <CopyButton text={textContent} />

      {/* Render the pre element as-is */}
      {children}
    </div>
  );
}
