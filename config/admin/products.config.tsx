import { ProductListItem } from '@/db/queries/products/list';
import { TableColumn } from '../../app/admin/_components/data-table/types';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import ProductActions from '../../app/admin/products/_components/ProductActions';

export const productColumns = [
  {
    key: 'logo',
    header: 'Logo',
    render: (product) => (product.imageUrl ? 'van logo' : 'Nincs Logo'),
  },
  {
    key: 'name',
    header: 'Nume',
    render: (product: ProductListItem) => (
      <Link
        className={`font-medium hover:underline`}
        href={`/admin/products/${product.id}`}
      >
        {product.name}
      </Link>
    ),
  },
  {
    key: 'category',
    header: 'Categorie',
    render: (product: ProductListItem) => product.category,
  },

  {
    key: 'variants',
    header: 'Variante',
    render: (product: ProductListItem) => (
      <div className="flex items-center gap-2">{product.variantsCount}</div>
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
