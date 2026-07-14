import type { TableColumn } from '@/app/admin/_components/data-table/types';
import ProductActions from '@/app/admin/products/_components/ProductActions';
import type { VariantListItems } from '@/db/queries/products/variants';
import { formatCurrency } from '@/lib/formatters/currency';
import Link from 'next/link';

export const VariantColumns = [
  {
    key: 'variatie',
    header: 'Variatie',
    render: (variant: VariantListItems) => <div>{variant.variantName}</div>,
  },

  {
    key: 'sku',
    header: 'SKU',
    render: (variant) => variant.sku,
  },

  {
    key: 'pret',
    header: 'Pret',
    render: (variant) => formatCurrency(variant.price),
  },

  {
    key: 'disponibil',
    header: 'Disponibil',
    render: (variant) => variant.stock - variant.reservedStock,
  },

  {
    key: 'stoc',
    header: 'Stoc',
    render: (variant) => variant.stock,
  },
  {
    key: 'rezervat',
    header: 'Rezervat',
    render: (variant) => variant.reservedStock,
  },

  {
    key: 'active',
    header: 'Active',
    render: (variant) => (variant.active ? 'Activ' : 'Inactiv'),
  },

  {
    key: 'actions',
    header: '',
    render: (variant) => (
      <ProductActions productId={variant.id} active={variant.active} />
    ),
  },
] satisfies TableColumn<VariantListItems>[];
