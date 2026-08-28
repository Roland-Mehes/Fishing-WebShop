'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type ProductVariant = {
  id: string;
  variantName: string;
  stock: number;
};

type ProductVariantSelectorProps = {
  variants: ProductVariant[];
  selectedVariantId: string;
  onVariantChange: (variantId: string) => void;
};

export function ProductVariantSelector({
  variants,
  selectedVariantId,
  onVariantChange,
}: ProductVariantSelectorProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium">Variant</span>

        <span className="text-sm text-muted-foreground">
          {
            variants.find((variant) => variant.id === selectedVariantId)
              ?.variantName
          }
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariantId;
          const isOutOfStock = variant.stock <= 0;

          return (
            <Button
              key={variant.id}
              type="button"
              variant={isSelected ? 'default' : 'outline'}
              disabled={isOutOfStock}
              onClick={() => onVariantChange(variant.id)}
              className={cn('min-w-16', isOutOfStock && 'line-through')}
            >
              {variant.variantName}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
