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
      
      if (query.trim()) {
        params.set('q', query);
      } else {
        params.delete('q');
      }
      
      // Navigate to the new URL
      const newUrl = params.toString() ? `/blog?${params.toString()}` : '/blog';
      router.push(newUrl);
    },
    [router, searchParams],
  );

  return <SearchBar onSearch={handleSearch} placeholder="Search posts by title, description, or tags..." />;
}
