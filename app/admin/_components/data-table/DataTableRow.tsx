import { TableColumn } from '@/app/admin/_components/data-table/types';
import { TableCell, TableRow } from '@/components/ui/table';

type DataTableRowProps<T> = {
  row: T;
  columns: TableColumn<T>[];
};

export function DataTableRow<T>({ row, columns }: DataTableRowProps<T>) {
  return (
    <TableRow className={'cursor-pointer'}>
      {columns.map((column) => (
        <TableCell key={column.key}>{column.render(row)}</TableCell>
      ))}
    </TableRow>
  );
}
