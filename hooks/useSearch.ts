'use client';

import { useEffect, useRef, useState } from 'react';

type SearchProduct = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  price: number;
};

type SearchBrand = {
  id: string;
  name: string;
  slug: string;
};

type SearchCategory = {
  id: string;
  name: string;
  slug: string;
};

export type SearchResults = {
  products: SearchProduct[];
  brands: SearchBrand[];
  categories: SearchCategory[];
};

const EMPTY_RESULTS: SearchResults = {
  products: [],
  brands: [],
  categories: [],
};

type UseSearchOptions = {
  debounceMs?: number;
  minLength?: number;
};

export function useSearch({
  debounceMs = 300,
  minLength = 2,
}: UseSearchOptions = {}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>(EMPTY_RESULTS);
  const [isLoading, setIsLoading] = useState(false);

  const requestIdRef = useRef(0);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < minLength) {
      return;
    }

    const timeout = setTimeout(async () => {
      const requestId = ++requestIdRef.current;

      try {
        setIsLoading(true);

        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmedQuery)}`,
        );

        if (!response.ok) {
          throw new Error('Search request failed');
        }

        const data: SearchResults = await response.json();

        if (requestId !== requestIdRef.current) {
          return;
        }

        setResults(data);
      } catch (error) {
        console.error('Search error:', error);

        if (requestId === requestIdRef.current) {
          setResults(EMPTY_RESULTS);
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [query, debounceMs, minLength]);

  const clearSearch = () => {
    requestIdRef.current += 1;

    setQuery('');
    setResults(EMPTY_RESULTS);
    setIsLoading(false);
  };

  return {
    query,
    setQuery,
    results,
    isLoading,
    clearSearch,
  };
}
