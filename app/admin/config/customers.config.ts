import type { CustomerListItem } from '@/db/queries/customers';
import type { TableColumn } from '../_components/data-table/types';

export const customerColumns = [
  {
    key: 'name',
    header: 'User',
    render: (customer) => customer.name,
  },
  {
    key: 'email',
    header: 'Email',
    render: (customer: CustomerListItem) => customer.email,
  },
  {
    key: 'createdAt',
    header: 'Created',
    render: (customer: CustomerListItem) =>
      customer.createdAt.toLocaleDateString(),
  },
] satisfies TableColumn<CustomerListItem>[];
