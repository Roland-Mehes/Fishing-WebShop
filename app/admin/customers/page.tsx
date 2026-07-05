import { getCustomers } from '@/db/queries/customers';
import { customerColumns } from '../config/CUSTOMERS';
import AdminBreadcrumbs from '../components/AdminBreadcrumbs';
import { DataTable } from '../data-table/DataTable';

const CustomerTable = async () => {
  const customers = await getCustomers();
  return (
    <div>
      <AdminBreadcrumbs breadcrumbs={[{ label: 'Customers' }]} />

      <DataTable
        data={customers}
        columns={customerColumns}
        getRowId={(p) => p.id}
      />
    </div>
  );
};

export default CustomerTable;
