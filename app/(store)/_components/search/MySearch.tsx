'use client';

import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { useSearch } from '@/hooks/useSearch';

import SearchResults from './SearchResults';

const MySearch = () => {
  const { query, setQuery, results, isLoading } = useSearch();

  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const trimmedQuery = query.trim();

  const shouldShowDropdown = isOpen && trimmedQuery.length >= 2;

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
    setQuery(value);

    setIsOpen(value.trim().length >= 2);
  };

  const handleSelect = () => {
    setIsOpen(false);
  };

  return (
    <Field className="w-full">
      <div ref={searchRef} className="relative w-full">
        <ButtonGroup className="w-full">
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
              onChange={(event) => handleChange(event.target.value)}
              onFocus={handleFocus}
              placeholder="Caută după produs, producător sau un număr de articol..."
              className="
                pl-10
                focus-visible:ring-1
                focus-visible:ring-accent/50
              "
            />
          </div>

          <Button
            type="button"
            variant="outline"
            className="hidden lg:block hover:text-accent"
          >
            Search
          </Button>
        </ButtonGroup>

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

export default MySearch;
