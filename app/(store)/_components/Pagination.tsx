'use client';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages: (number | 'ellipsis')[] = [];

  if (totalPages <= 7) {
    for (let page = 1; page <= totalPages; page++) {
      pages.push(page);
    }
  } else {
    pages.push(1);

    if (currentPage > 4) {
      pages.push('ellipsis');
    }

    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    if (currentPage < totalPages - 3) {
      pages.push('ellipsis');
    }
    pages.push(totalPages);
  }

  return (
    <nav className="mt-8 flex items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={`?page=${currentPage - 1}`}
          className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
        >
          <ChevronLeft />
        </Link>
      ) : (
        <span className="rounded-md border px-3 py-2 text-sm text-muted-foreground">
          <ChevronLeft />
        </span>
      )}

      {pages.map((page, index) =>
        page === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-sm text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={`?page=${page}`}
            className={`rounded-md border px-3 py-2 text-sm ${
              page === currentPage
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            {page}
          </Link>
        ),
      )}

      {currentPage < totalPages ? (
        <Link
          href={`?page=${currentPage + 1}`}
          className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
        >
          <ChevronRight />
        </Link>
      ) : (
        <span className="rounded-md border px-3 py-2 text-sm text-muted-foreground">
          <ChevronRight />
        </span>
      )}
    </nav>
  );
};

export default Pagination;
