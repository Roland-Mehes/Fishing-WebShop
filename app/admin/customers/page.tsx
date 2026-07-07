import { getCustomers } from '@/db/queries/customers';
import { customerColumns } from '../config/customers.config';
import AdminBreadcrumbs from '../_components/AdminBreadcrumbs';
import { DataTable } from '../_components/data-table/DataTable';
import SearchInput from '../products/_components/SearchInput';

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
