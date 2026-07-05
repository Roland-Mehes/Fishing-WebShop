'use client';

import { TableRow, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

import { useRouter } from 'next/navigation';

import type { ProductRow } from '@/db/queries/products';

type ProductTableRowProps = {
  product: ProductRow;
};

export function ProductTableRow({ product }: ProductTableRowProps) {
  const router = useRouter();

  return (
    <TableRow
      className="cursor-pointer hover:bg-muted"
      onClick={() => router.push(`/admin/products/${product.id}`)}
    >
      <TableCell onClick={(e) => e.stopPropagation()}>
        <Checkbox />
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.sku}</TableCell>
      <TableCell>{product.ean}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>{product.price ? product.price + ' RON' : '-A'}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>{product.imageUrl ?? '-'}</TableCell>
      <TableCell>{product.imageUrl ?? '-'}</TableCell>
    </TableRow>
  );
}
