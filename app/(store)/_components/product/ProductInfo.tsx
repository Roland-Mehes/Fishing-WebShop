'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

import { ProductVariantSelector } from './ProductVariantSelector';
import { AddToCartButton } from '@/app/(store)/_components/AddToCartButton';

import {
  calculateDiscountedPrice,
  formatCurrency,
  getActiveDiscount,
  type Discount,
} from '@/lib/formatters/currency';

type ProductVariant = {
  id: string;
  variantName: string;
  price: number;
  stock: number;
  active: boolean;
  deletedAt: Date | null;
  isDefault: boolean;
  sku: string;

  discounts: Discount[];

  variantAttributes: {
    value: string;
    attribute: {
      name: string;
      unit: string | null;
    };
  }[];
};

type ProductInfoProps = {
  primaryImage: string | null;

  product: {
    id: string;
    name: string;
    slug: string;
    shortDescription: string | null;
    ratingAverage: number;
    ratingCount: number;

    brand: {
      name: string;
    };

    variants: ProductVariant[];
  };
};

const ProductInfo = ({ product, primaryImage }: ProductInfoProps) => {
  const activeVariants = product.variants.filter(
    (variant) => variant.active && !variant.deletedAt,
  );

  const defaultVariant =
    activeVariants.find((variant) => variant.isDefault) ?? activeVariants[0];

  const [selectedVariantId, setSelectedVariantId] = useState(
    defaultVariant?.id ?? '',
  );

  const selectedVariant =
    activeVariants.find((variant) => variant.id === selectedVariantId) ??
    defaultVariant;

  if (!selectedVariant) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>

        <p className="mt-4 text-sm text-muted-foreground">
          Acest produs nu este disponibil momentan.
        </p>
      </div>
    );
  }

  const activeDiscount = getActiveDiscount(selectedVariant.discounts);

  const finalPrice = calculateDiscountedPrice(
    selectedVariant.price,
    activeDiscount,
  );

  return (
    <div className="flex flex-col">
      {/* Brand */}
      <span className="text-sm font-medium text-muted-foreground">
        {product.brand.name}
      </span>

      {/* Product name */}
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="size-4 fill-current" />
          ))}
        </div>

        <span className="text-sm text-muted-foreground">
          {product.ratingAverage.toFixed(1)}

          {product.ratingCount > 0 && ` (${product.ratingCount})`}
        </span>
      </div>
      {/* Short description */}
      {product.shortDescription && (
        <p className="mt-5 text-sm leading-6 text-muted-foreground">
          {product.shortDescription}
        </p>
      )}

      <div className="my-6 h-px bg-border" />
      {/* Variant selector */}
      {activeVariants.length > 0 && (
        <div className="mt-6">
          <ProductVariantSelector
            variants={activeVariants}
            selectedVariantId={selectedVariant.id}
            onVariantChange={setSelectedVariantId}
          />

          <div className="mt-4 border-t pt-4">
            <p className="text-xs text-muted-foreground">
              SKU: {selectedVariant.sku}
            </p>
          </div>
        </div>
      )}
      {/* Price */}
      <div className="mt-6">
        {activeDiscount ? (
          <div className="flex items-center gap-3">
            <span className="text-3xl font-semibold tracking-tight">
              {formatCurrency(finalPrice)}
            </span>

            <span className="text-base text-muted-foreground line-through">
              {formatCurrency(selectedVariant.price)}
            </span>

            {activeDiscount.type === 'percentage' && (
              <span className="rounded-full bg-destructive px-2.5 py-1 text-xs font-semibold text-destructive-foreground">
                -{activeDiscount.value}%
              </span>
            )}
          </div>
        ) : (
          <span className="text-3xl font-semibold tracking-tight">
            {formatCurrency(selectedVariant.price)}
          </span>
        )}
      </div>
      {/* Stock */}
      <div className="mt-2 flex items-center gap-2">
        {selectedVariant.stock > 0 ? (
          <>
            <span className="size-2 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-green-600">În stoc</span>
          </>
        ) : (
          <>
            <span className="size-2 rounded-full bg-red-400" />
            <span className="text-sm font-medium text-destructive">
              Stoc epuizat
            </span>
          </>
        )}
      </div>
      {/* Add To Cart Button */}
      {selectedVariant.stock > 0 && (
        <div className="mt-6 rounded-2xl border bg-muted/20 p-4">
          <AddToCartButton
            variantId={selectedVariant.id}
            productId={product.id}
            name={product.name}
            slug={product.slug}
            sku={selectedVariant.sku}
            price={finalPrice}
            image={primaryImage ?? undefined}
            variantName={selectedVariant.variantName}
            attributes={selectedVariant.variantAttributes.map(
              ({ attribute, value }) => ({
                name: attribute.name,
                value: attribute.unit ? `${value} ${attribute.unit}` : value,
              }),
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
