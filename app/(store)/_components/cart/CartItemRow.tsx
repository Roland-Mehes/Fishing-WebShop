'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';

import { CartItem } from '@/lib/storage/cart-store';
import { useCartStore } from '@/lib/storage/cart-store';

type CartItemRowProps = {
  item: CartItem;
};

export function CartItemRow({ item }: CartItemRowProps) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const removeItem = useCartStore((state) => state.removeItem);

  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 py-5">
      {/* Image */}
      <Link
        href={`/products/${item.slug}`}
        className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted"
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="80px"
            className="object-contain"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/products/${item.slug}`}
              className="line-clamp-2 text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>

            {item.variantName && (
              <p className="mt-1 text-xs text-muted-foreground">
                {item.variantName}
              </p>
            )}

            <p className="mt-1 text-xs text-muted-foreground">
              SKU: {item.sku}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.variantId)}
            aria-label={`Șterge ${item.name}`}
            className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          {/* Quantity */}
          <div className="flex h-9 items-center rounded-md border">
            <button
              type="button"
              onClick={() => decreaseQuantity(item.variantId)}
              aria-label="Scade cantitatea"
              className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <Minus className="size-3.5" />
            </button>

            <span className="w-7 text-center text-sm font-medium">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => increaseQuantity(item.variantId)}
              aria-label="Crește cantitatea"
              className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <Plus className="size-3.5" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-sm font-semibold">{itemTotal.toFixed(2)} lei</p>

            {item.quantity > 1 && (
              <p className="text-xs text-muted-foreground">
                {item.price.toFixed(2)} lei / buc.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
