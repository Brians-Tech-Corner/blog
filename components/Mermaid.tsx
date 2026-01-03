'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  children: string;
}

export function Mermaid({ children }: MermaidProps) {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const mermaidInitializedRef = useRef(false);

  useEffect(() => {
    if (!mermaidInitializedRef.current) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'strict',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      });
      mermaidInitializedRef.current = true;
    }

    const renderDiagram = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;
        const { svg: renderedSvg } = await mermaid.render(id, children.trim());
        setSvg(renderedSvg);
        setError('');
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError(err instanceof Error ? err.message : 'Failed to render diagram');
      }
    };

    renderDiagram();
  }, [children]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        setScale(1);
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 8));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const handleZoomReset = () => setScale(1);

  if (error) {
    return (
      <div className="my-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
        <p className="text-sm text-red-800 dark:text-red-200">
          <strong>Mermaid Error:</strong> {error}
        </p>
        <pre className="mt-2 overflow-x-auto text-xs text-red-700 dark:text-red-300">
          {children}
        </pre>
      </div>
    );
  }

  return (
    <>
      <div className="group relative my-6">
        <div
          className="flex cursor-pointer justify-center overflow-x-auto rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
          onClick={() => {
            setIsFullscreen(true);
            setScale(3);
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
          title="Click to view fullscreen"
        />
        <div className="mt-2 text-center text-xs text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-400">
          Click diagram to view fullscreen
        </div>
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => {
            setIsFullscreen(false);
            setScale(1);
          }}
        >
          <div className="relative flex h-full w-full flex-col">
            <div className="flex items-center justify-between border-b border-gray-700 bg-gray-900/95 p-4">
              <div className="flex gap-2">
                <button
                  className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomOut();
                  }}
                  title="Zoom out (-))"
                >
                  −
                </button>
                <button
                  className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomReset();
                  }}
                  title="Reset zoom"
                >
                  {Math.round(scale * 100)}%
                </button>
                <button
                  className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomIn();
                  }}
                  title="Zoom in (+)"
                >
                  +
                </button>
              </div>
              <button
                className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700"
                onClick={() => {
                  setIsFullscreen(false);
                  setScale(1);
                }}
              >
                Close (Esc)
              </button>
            </div>
            <div className="flex-1 overflow-auto p-8">
              <div className="flex min-h-full items-center justify-center">
                <div
                  style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
                  className="transition-transform duration-200"
                  dangerouslySetInnerHTML={{ __html: svg }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
