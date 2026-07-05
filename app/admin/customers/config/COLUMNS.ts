import type { CustomerTableRow } from '@/db/queries/customers';

export const COLUMNS = [
  {
    key: 'name',
    header: 'User',
    render: (customer: CustomerTableRow) => customer.name,
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
] as const;
