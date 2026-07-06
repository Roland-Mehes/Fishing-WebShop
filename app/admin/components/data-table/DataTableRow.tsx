import { DataTableColumnType } from '../../config/types';

import { TableCell, TableRow } from '@/components/ui/table';
// import { Checkbox } from '@/components/ui/checkbox';

type DataTableRowProps<T> = {
  row: T;
  columns: DataTableColumnType<T>[];
};

export function DataTableRow<T>({ row, columns }: DataTableRowProps<T>) {
  return (
    <TableRow className={'cursor-pointer'}>
      {/* <TableCell>
        <Checkbox />
      </TableCell> */}

      {columns.map((column) => (
        <TableCell key={column.key}>{column.render(row)}</TableCell>
      ))}
    </TableRow>
  );
}
