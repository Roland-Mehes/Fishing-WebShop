import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
} from '@/components/ui/table';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnType } from '../config/types';
import { DataTableRow } from './DataTableRow';

type DataTableProps<T> = {
  data: T[];
  columns: DataTableColumnType<T>[];
  getRowId: (row: T) => string;
};

export function DataTable<T>({ data, columns, getRowId }: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox />
          </TableHead>

          {columns.map((column) => (
            <TableHead key={column.key}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row) => (
          <DataTableRow key={getRowId(row)} row={row} columns={columns} />
        ))}
      </TableBody>
    </Table>
  );
}
