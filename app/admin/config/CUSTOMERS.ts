import type { CustomerTableRow } from '@/db/queries/customers';
import type { DataTableColumnType } from './types';

export const customerColumns = [
  {
    key: 'name',
    header: 'User',
    render: (customer) => customer.name,
  },
  {
    key: 'email',
    header: 'Email',
    render: (customer: CustomerTableRow) => customer.email,
  },
  {
    key: 'createdAt',
    header: 'Created',
    render: (customer: CustomerTableRow) =>
      customer.createdAt.toLocaleDateString(),
  },
] satisfies DataTableColumnType<CustomerTableRow>[];
