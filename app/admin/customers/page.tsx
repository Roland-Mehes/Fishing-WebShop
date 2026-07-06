import { getCustomers } from '@/db/queries/customers';
import { customerColumns } from '../config/CUSTOMERS';
import AdminBreadcrumbs from '../components/AdminBreadcrumbs';
import { DataTable } from '../components/data-table/DataTable';
import SearchInput from '../products/components/SearchInput';

type CustomerTableProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

const CustomerTable = async ({ searchParams }: CustomerTableProps) => {
  const params = await searchParams;

  const customers = await getCustomers({ search: params.search });

  return (
    <div>
      <AdminBreadcrumbs breadcrumbs={[{ label: 'Customers' }]} />

      <SearchInput placeholder="Cauta dupa Nume sau Email" />

      <DataTable
        data={customers}
        columns={customerColumns}
        getRowId={(p) => p.id}
      />
    </div>
  );
};

export default CustomerTable;
