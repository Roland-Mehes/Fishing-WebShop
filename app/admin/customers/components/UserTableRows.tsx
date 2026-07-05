'use client';

import { TableRow, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { COLUMNS } from '../config/COLUMNS';
import type { CustomerTableRow } from '@/db/queries/customers';

type CustomerRowProps = {
  customer: CustomerTableRow;
};

export function UserTableRows({ customer }: CustomerRowProps) {
  return (
    <TableRow className="cursor-pointer hover:bg-muted">
      <TableCell onClick={(e) => e.stopPropagation()}>
        <Checkbox />
      </TableCell>
      {COLUMNS.map((column) => (
        <TableCell key={column.key}>{column.render(customer)}</TableCell>
      ))}
    </TableRow>
  );
}
