'use client';

import Giscus from '@giscus/react';
import { useTheme } from './ThemeProvider';

type CommentsProps = {
  repo: string; // Format: "owner/repo"
  repoId: string;
  category: string;
  categoryId: string;
};

export function Comments({ repo, repoId, category, categoryId }: CommentsProps) {
  const { theme } = useTheme();

  return (
    <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
      <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Comments</h2>
      <Giscus
        repo={repo as `${string}/${string}`}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
