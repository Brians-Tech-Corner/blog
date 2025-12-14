'use client';

import { useEffect, useState } from 'react';
import type { TocHeading } from '@/lib/toc';

type TableOfContentsProps = {
  headings: TocHeading[];
};

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Track which heading is currently in view
    const visibleHeadings = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleHeadings.add(id);
          } else {
            visibleHeadings.delete(id);
          }
        });
        // Find the topmost visible heading according to the order in `headings`
        const firstVisible = headings.find(h => visibleHeadings.has(h.id));
        if (firstVisible) {
          setActiveId(firstVisible.id);
        } else if (headings.length > 0) {
          // If none are visible (e.g., scrolled above first heading), set to first heading
          setActiveId(headings[0].id);
        }
      },
      { rootMargin: '-20% 0% -35% 0%' },
    );

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block" aria-label="Table of contents">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          On This Page
        </h3>
        <ul className="mt-4 space-y-2.5 text-sm">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const isH3 = heading.level === 3;

            return (
              <li key={heading.id} className={isH3 ? 'ml-4' : ''}>
                <a
                  href={`#${heading.id}`}
                  className={`block transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 ${
                    isActive
                      ? 'font-medium text-zinc-900 dark:text-zinc-100'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
