'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SearchBar } from './SearchBar';
import { useCallback } from 'react';

export function BlogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());

      const currentQ = searchParams.get('q') ?? '';
      const nextQ = query.trim();

      // No-op if query hasn't changed (prevents navigation loops)
      if (currentQ === nextQ) return;

      if (nextQ) {
        params.set('q', nextQ);
      } else {
        params.delete('q');
      }

      // Navigate to the new URL without auto-scrolling to top
      const newUrl = params.toString() ? `/blog?${params.toString()}` : '/blog';
      router.push(newUrl, { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <SearchBar
      onSearch={handleSearch}
      initialQuery={searchParams.get('q') ?? ''}
      placeholder="Search posts by title, description, or tags..."
    />
  );
}
