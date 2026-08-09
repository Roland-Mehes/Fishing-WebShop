'use client';

import { useTransition } from 'react';
import { deleteBrand } from '@/db/mutations/brands/delete';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';

import { EllipsisVertical } from 'lucide-react';

type Props = {
  brandId: string;
};

export function BrandActions({ brandId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = confirm('Sigur doresti sa stergi acest producator?');

    if (!confirmed) return;

    startTransition(async () => {
      await deleteBrand(brandId);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>

        <DropdownMenuItem disabled={isPending} onClick={handleDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
