import { ProductListItem } from '@/db/queries/products/list';
import { TableColumn } from '../_components/data-table/types';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/formatters/currency';
import ProductActions from '../products/_components/ProductActions';

export const productColumns = [
  {
    key: 'name',
    header: 'Nume',
    render: (product: ProductListItem) => (
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
    render: (product: ProductListItem) => product.brandName,
  },
  {
    key: 'category',
    header: 'Category',
    render: (product: ProductListItem) => product.category,
  },

  {
    key: 'price',
    header: 'Pret',
    render: (product: ProductListItem) =>
      product.price ? `${formatCurrency(product.price)}` : '-',
  },

  {
    key: 'stock',
    header: 'Stock',
    render: (product: ProductListItem) => (
      <div className="flex items-center gap-2">{product.stock}</div>
    ),
  },

  {
    key: 'status',
    header: 'Status',
    render: (product: ProductListItem) => (
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
    render: (product: ProductListItem) => (
      <ProductActions productId={product.id} active={product.active} />
    ),
  },
] satisfies TableColumn<ProductListItem>[];

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
