'use client';

import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { useSearch } from '@/hooks/useSearch';

import SearchResults from './SearchResults';

const ProductSearch = () => {
  const { query, setQuery, results, isLoading } = useSearch();

  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const trimmedQuery = query.trim();

  const shouldShowDropdown = isOpen && trimmedQuery.length >= 2;

  console.log('SEARCH UI:', {
    query,
    isOpen,
    shouldShowDropdown,
    results,
  });

  /*
   * Close dropdown when clicking outside.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /*
   * Close dropdown with Escape.
   */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleFocus = () => {
    if (trimmedQuery.length >= 2) {
      setIsOpen(true);
    }
  };

  const handleChange = (value: string) => {
    console.log('HANDLE CHANGE: ', value);

    setQuery(value);

    setIsOpen(value.trim().length >= 2);
  };

  const handleSelect = () => {
    setIsOpen(false);
  };

  return (
    <Field className="w-full">
      <div ref={searchRef} className="relative w-full">
        <div className="relative w-full">
          <Search
            className="
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-muted-foreground
              "
          />

          <Input
            value={query}
            onChange={(event) => {
              console.log('INPUT: ', event.target.value);
              handleChange(event.target.value);
            }}
            onFocus={handleFocus}
            placeholder="Caută produse, producători sau coduri..."
            className="
              h-10
              sm:h-11
                pl-10
                focus-visible:ring-1
                focus-visible:ring-accent/50
              "
          />
        </div>

        {shouldShowDropdown && (
          <div
            className="
              absolute
              left-0
              right-0
              top-full
              z-50
              mt-2
              overflow-hidden
              rounded-lg
              border
              border-border
              bg-background
              shadow-lg
            "
          >
            <SearchResults
              results={results}
              isLoading={isLoading}
              onSelect={handleSelect}
            />
          </div>
        )}
      </div>
    </Field>
  );
};

export default ProductSearch;
