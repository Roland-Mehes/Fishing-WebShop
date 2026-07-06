'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Options = {
  paramName?: string;
  debounceMs?: number;
  minLength?: number;
};

export function useDebouncedUrlSearch({
  paramName = 'search',
  debounceMs = 400,
  minLength = 3,
}: Options = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentValue = searchParams.get(paramName) ?? '';

  const [value, setValue] = useState(currentValue);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(currentValue);
  }, [currentValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value.trim() === currentValue) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());

      if (value.trim().length >= minLength) {
        params.set(paramName, value.trim());
      } else {
        params.delete(paramName);
      }

      params.delete('page');

      router.replace(
        params.toString() ? `${pathname}?${params.toString()}` : pathname,
      );
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [
    value,
    currentValue,
    paramName,
    debounceMs,
    minLength,
    pathname,
    router,
    searchParams,
  ]);

  return {
    value,
    setValue,
  };
}
