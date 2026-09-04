'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { ChevronRight, Menu } from 'lucide-react';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type MobileMenuProps = {
  navItems: {
    text: string;
    link: string;
  }[];
};

export function MobileMenu({ navItems }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Deschide meniul"
          className="hover:bg-secondary"
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex w-[85%] max-w-sm flex-col p-0">
        {/* HEADER */}
        <SheetHeader className="border-b border-border px-6 py-5 text-left">
          <SheetTitle className="text-xl font-bold text-foreground">
            Meniu
          </SheetTitle>

          <SheetDescription className="sr-only">
            Navigarea principală a magazinului.
          </SheetDescription>
        </SheetHeader>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 py-6">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                item.link === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.link);

              return (
                <SheetClose asChild key={item.link}>
                  <Link
                    href={item.link}
                    className={cn(
                      'group flex items-center justify-between rounded-lg px-4 py-3.5 text-base font-medium transition-colors',
                      isActive
                        ? 'bg-secondary text-primary'
                        : 'text-foreground hover:bg-secondary hover:text-primary',
                    )}
                  >
                    <span>{item.text}</span>

                    <ChevronRight
                      className={cn(
                        'size-4 transition-all duration-200',
                        isActive
                          ? 'text-primary'
                          : 'text-muted-foreground group-hover:translate-x-1 group-hover:text-primary',
                      )}
                    />
                  </Link>
                </SheetClose>
              );
            })}
          </div>
        </nav>

        {/* FOOTER */}
        <div className="border-t border-border bg-muted/30 px-6 py-5">
          <p className="text-sm font-medium text-foreground">Fishing WebShop</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Tot ce ai nevoie pentru următoarea partidă de pescuit.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
