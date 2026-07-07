'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const [inputValue, setInputValue] = useState(currentPage.toString());

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', page.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInputValue(() => currentPage.toString());
  }, [currentPage]);

  return (
    <div className="flex gap-1 justify-center items-center">
      <Button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        {'Prev...'}
      </Button>
      <Input
        key={currentPage}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-[4ch]"
      />{' '}
      din {totalPages}
      <Button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        {'Next...'}
      </Button>
    </div>
  );
};

export default Pagination;
