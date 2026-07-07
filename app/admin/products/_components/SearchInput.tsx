'use client';

type SearchInputProps = {
  placeholder: string;
};

import { Input } from '@/components/ui/input';
import { useDebouncedUrlSearch } from '@/hooks/useDebouncedUrlSearch';

export default function SearchInput({ placeholder }: SearchInputProps) {
  const { value, setValue } = useDebouncedUrlSearch();

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    />
  );
}
