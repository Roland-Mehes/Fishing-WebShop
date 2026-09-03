'use client';

import Link from 'next/link';
import { ShoppingBag, X } from 'lucide-react';
import { useCartStore } from '@/lib/storage/cart-store';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

import { CartItemRow } from './CartItemRow';

type CartDrawerProps = {
  children: React.ReactNode;
};

export function CartDrawer({ children }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="size-5" />
            Coșul tău
            {itemCount > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({itemCount})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <div className="divide-y">
                {items.map((item) => (
                  <CartItemRow key={item.variantId} item={item} />
                ))}
              </div>
            </div>

            <CartDrawerFooter subtotal={subtotal} />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
        <ShoppingBag className="size-6 text-muted-foreground" />
      </div>

      <h3 className="text-lg font-semibold">Coșul tău este gol</h3>

      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        Adaugă produse în coș pentru a continua cumpărăturile.
      </p>

      <SheetClose asChild>
        <Link
          href="/products"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Continuă cumpărăturile
        </Link>
      </SheetClose>
    </div>
  );
}

function CartDrawerFooter({ subtotal }: { subtotal: number }) {
  return (
    <div className="border-t bg-background px-6 py-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Subtotal</span>

        <span className="text-lg font-semibold">{subtotal.toFixed(2)} lei</span>
      </div>

      <p className="mt-1 text-xs text-muted-foreground">
        Taxele de livrare sunt calculate la finalizarea comenzii.
      </p>

      <div className="mt-5 grid gap-2">
        <Link
          href="/cart"
          className="flex h-11 items-center justify-center rounded-md border border-border text-sm font-medium transition-colors hover:bg-accent"
        >
          Vezi coșul
        </Link>

        <SheetClose asChild>
          <Link
            href="/checkout"
            className="flex h-11 items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Finalizează comanda
          </Link>
        </SheetClose>
      </div>
    </div>
  );
}
