'use client';

import { ShoppingCart } from 'lucide-react';

import { useCartStore } from '@/lib/storage/cart-store';
import { CartDrawer } from './CartDrawer';

export function CartIcon() {
  const items = useCartStore((state) => state.items);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartDrawer>
      <button
        type="button"
        aria-label="Coș de cumpărături"
        className="relative flex size-10 items-center justify-center rounded-md transition-colors hover:bg-accent"
      >
        <ShoppingCart className="size-5" />

        {itemCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex min-w-5 h-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold leading-none text-primary-foreground">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </button>
    </CartDrawer>
  );
}
