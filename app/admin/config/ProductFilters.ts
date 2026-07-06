// app/admin/products/config/productFilters.ts

import { FilterConfig } from './types';

export const productFilters: FilterConfig[] = [
  {
    key: 'category',
    placeholder: 'Category',
    options: [
      {
        label: 'All Categories',
        value: 'all',
      },
      {
        label: 'Rods',
        value: 'rods',
      },
      {
        label: 'Hooks',
        value: 'hooks',
      },
    ],
  },

  {
    key: 'status',
    placeholder: 'Status',
    options: [
      {
        label: 'Active',
        value: 'active',
      },
      {
        label: 'Inactive',
        value: 'inactive',
      },
    ],
  },
];
