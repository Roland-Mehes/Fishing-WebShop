'use client';

import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

import SidebarNav from './SidebarNav';
import { Button } from '@/components/ui/button';

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="border-b px-6 py-4"></SheetHeader>
        <SheetTitle>SHOP ADMIN</SheetTitle>
        <SheetDescription>Admin navigation menu</SheetDescription>
        <SidebarNav />
      </SheetContent>
    </Sheet>
  );
}
