import { ProductRow } from '@/db/queries/products';
import { DataTableColumnType } from './types';
import Link from 'next/link';

export const productColumns = [
  {
    key: 'name',
    header: 'Nume',
    render: (product: ProductRow) => (
      <Link href={`/admin/products/${product.id}`}>{product.name}</Link>
    ),
  },
  {
    key: 'sku',
    header: 'SKU',
    render: (product: ProductRow) => product.sku,
  },
  {
    key: 'ean',
    header: 'EAN',
    render: (product: ProductRow) => product.sku,
  },

  {
    key: 'stock',
    header: 'Stock',
    render: (product: ProductRow) => product.stock,
  },
  {
    key: 'price',
    header: 'Pret',
    render: (product: ProductRow) =>
      product.price ? `${product.price} RON` : '-',
  },
  {
    key: 'category',
    header: 'Categorie',
    render: (product: ProductRow) => product.category,
  },
] satisfies DataTableColumnType<ProductRow>[];
