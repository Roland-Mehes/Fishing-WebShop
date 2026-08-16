'use client';

import { Input } from '@/components/ui/input';
import { useDebouncedUrlSearch } from '@/hooks/useDebouncedUrlSearch';

type SearchInputProps = {
  placeholder: string;
  paramName?: string;
};

export default function SearchInput({
  placeholder,
  paramName = 'search',
}: SearchInputProps) {
  const { value, setValue } = useDebouncedUrlSearch({ paramName });

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    />
  );
}
