import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from '@/components/ui/sheet';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

type MobileMenuProps = {
  navItems: {
    text: string;
    link: string;
  }[];
};

export function MobileMenu({ navItems }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menü</SheetTitle>
          <SheetDescription>A webáruház navigációs menüje.</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          {navItems.map((item) => (
            <Link key={item.link} href={item.link}>
              {item.text}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
