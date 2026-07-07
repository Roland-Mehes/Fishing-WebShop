'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SelectOption } from '@/types/ui';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type SelectFilterProps = {
  placeholder: string;
  value?: string;
  options: SelectOption[];
  paramName: string;
};

const SelectFilter = ({
  placeholder,
  paramName,
  options,
}: SelectFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = searchParams.get(paramName) ?? '';

  const handleChange = (newValue: string) => {
    const params = new URLSearchParams(searchParams);

    if (newValue === 'all') {
      params.delete(paramName);
    } else {
      params.set(paramName, newValue);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectItem value={'all'}>Sterge Filtre</SelectItem>

          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
