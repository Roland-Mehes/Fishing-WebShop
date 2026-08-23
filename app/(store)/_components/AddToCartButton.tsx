'use client';

import { ShoppingCart } from 'lucide-react';

import { useCartStore } from '@/lib/storage/cart-store';
import { Button } from '@/components/ui/button';

type AddToCartButtonProps = {
  variantId: string;
  productId: string;

  name: string;
  slug: string;
  sku: string;

  price: number;

  image?: string;
  variantName?: string;

  attributes?: {
    name: string;
    value: string;
  }[];
};

export function AddToCartButton({
  variantId,
  productId,
  name,
  slug,
  sku,
  price,
  image,
  variantName,
  attributes,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      variantId,
      productId,
      name,
      slug,
      sku,
      price,
      image,
      variantName,
      attributes,
    });
  };

  return (
    <Button
      type="button"
      className="w-full group/button"
      onClick={handleAddToCart}
    >
      <ShoppingCart className="mr-2 h-4 w-4 group-hover/button:translate-x-0.5 transition" />
      Adaugă în coș
    </Button>
  );
}
