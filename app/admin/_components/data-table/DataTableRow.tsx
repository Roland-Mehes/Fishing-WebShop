import { TableColumn } from '@/app/admin/_components/data-table/types';
import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

type DataTableRowProps<T> = {
  row: T;
  columns: TableColumn<T>[];
  className?: string;
};

export function DataTableRow<T>({
  row,
  columns,
  className,
}: DataTableRowProps<T>) {
  return (
    <TableRow className={cn('cursor-pointer', className)}>
      {columns.map((column) => (
        <TableCell key={column.key}>{column.render(row)}</TableCell>
      ))}
    </TableRow>
  );
}
