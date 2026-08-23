'use client';

import { MoreHorizontal, Pencil, Plus, Power, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';

type CategoryActionsProps = {
  active: boolean;
};

export function CategoryActions({ active }: CategoryActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="shrink-0 opacity-70 transition-opacity group-hover:opacity-100"
        >
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Acțiuni categorie</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <Pencil className="size-4" />
          Editează
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Plus className="size-4" />
          Adaugă subcategorie
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Power className="size-4" />
          {active ? 'Dezactivează' : 'Activează'}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <Trash2 className="size-4" />
          Șterge
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
