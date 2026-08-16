import type { TableColumn } from '@/app/admin/_components/data-table/types';
import VariantActions from '@/app/admin/products/_components/VariantActions';
import type { VariantListItems } from '@/db/queries/products/variants';
import { formatCurrency } from '@/lib/formatters/currency';
import { Badge } from '@/components/ui/badge';

export const VariantColumns = [
  {
    key: 'variatie',
    header: 'Variatie',
    render: (variant: VariantListItems) => (
      <div className={variant.deletedAt ? 'text-muted-foreground' : undefined}>
        {variant.variantName}
      </div>
    ),
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
    header: 'Status',
    render: (variant) => {
      if (variant.deletedAt) {
        return <Badge variant="secondary">Șters</Badge>;
      }

      if (variant.active) {
        return <Badge>Activ</Badge>;
      }

      return <Badge variant="outline">Inactiv</Badge>;
    },
  },

  {
    key: 'actions',
    header: '',
    render: (variant: VariantListItems) => (
      <VariantActions
        productId={variant.productId}
        variantId={variant.variantId}
        active={variant.active}
        deletedAt={variant.deletedAt}
      />
    ),
  },
] satisfies TableColumn<VariantListItems>[];
