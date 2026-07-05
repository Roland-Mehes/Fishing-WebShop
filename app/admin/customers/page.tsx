import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { UserTableRows } from './components/UserTableRows';
import { getCustomers } from '@/db/queries/customers';
import { COLUMNS } from './config/COLUMNS';
import AdminBreadcrumbs from '../components/AdminBreadcrumbs';

const CustomerTable = async () => {
  const result = await getCustomers();
  return (
    <div>
      <AdminBreadcrumbs breadcrumbs={[]} />

      <div className="relative ">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox />
              </TableHead>
              {COLUMNS.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.map((customer) => (
              <UserTableRows key={customer.id} customer={customer} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerTable;
