import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
} from '@/components/ui/table';

import { TableColumn } from '@/app/admin/_components/data-table/types';
import { DataTableRow } from './DataTableRow';

type DataTableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  getRowId: (row: T) => string;
  getRowClassName?: (row: T) => string | undefined;
};

export function DataTable<T>({
  data,
  columns,
  getRowId,
  getRowClassName,
}: DataTableProps<T>) {
  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row) => (
          <DataTableRow
            key={getRowId(row)}
            row={row}
            columns={columns}
            className={getRowClassName?.(row)}
          />
        ))}
      </TableBody>
    </Table>
  );
}
