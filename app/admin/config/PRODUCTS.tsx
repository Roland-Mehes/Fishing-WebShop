import { ProductRow } from '@/db/queries/products';
import { DataTableColumnType } from './types';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { EllipsisVertical } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters/currency';
import { Button } from '@/components/ui/button';

export const productColumns = [
  {
    key: 'name',
    header: 'Nume',
    render: (product: ProductRow) => (
      <div className="flex gap-2 items-center">
        <Link
          className={`font-medium hover:underline`}
          href={`/admin/products/${product.id}`}
        >
          {product.name}
        </Link>
        <p className="text-xs text-muted-foreground">{product.sku}</p>
      </div>
    ),
  },
  {
    key: 'brand',
    header: 'Brand',
    render: (product: ProductRow) => product.brandName,
  },
  {
    key: 'category',
    header: 'Category',
    render: (product: ProductRow) => product.category,
  },

  {
    key: 'price',
    header: 'Pret',
    render: (product: ProductRow) =>
      product.price ? `${formatCurrency(product.price)}` : '-',
  },

  {
    key: 'stock',
    header: 'Stock',
    render: (product: ProductRow) => (
      <div className="flex items-center gap-2">
        {product.stock ? (
          <Badge className="min-w-full">{product.stock}</Badge>
        ) : (
          <Badge className="min-w-full">0</Badge>
        )}
      </div>
    ),
  },

  {
    key: 'status',
    header: 'Status',
    render: (product: ProductRow) => (
      <Badge
        className="min-w-full"
        variant={product.active ? 'default' : 'secondary'}
      >
        {product.active ? 'Activ' : 'Inactiv'}
      </Badge>
    ),
  },
  {
    key: 'actions',
    header: '',
    render: (product) => (
      <Button variant="ghost" size="icon">
        <EllipsisVertical className="h-4 w-4" />
      </Button>
    ),
  },
] satisfies DataTableColumnType<ProductRow>[];

export const PRODUCT_STATUS_OPTIONS = [
  {
    label: 'Active',
    value: 'true',
  },
  {
    label: 'Inactive',
    value: 'false',
  },
];

export const DEFAULT_PAGE_SIZE = 10;
