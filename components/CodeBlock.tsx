'use client';

import { CopyButton } from './CopyButton';
import { ReactNode, useRef } from 'react';

type CodeBlockProps = {
  children: ReactNode;
  className?: string;
  filename?: string;
};

export function CodeBlock({ children, className, filename }: CodeBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract language from className (e.g., "language-typescript" -> "typescript")
  const language = className?.replace(/language-/, '') || 'text';

  // Read directly from the DOM at click time — far more reliable than
  // recursively traversing the React node tree, which loses content when
  // rehype-prism nests tokens deeply inside large code blocks.
  const getText = () =>
    containerRef.current?.querySelector('pre')?.textContent ?? '';

  return (
    <div ref={containerRef} className="group relative">
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
      <CopyButton getText={getText} />

      {/* Render the pre element as-is */}
      {children}
    </div>
  );
}
