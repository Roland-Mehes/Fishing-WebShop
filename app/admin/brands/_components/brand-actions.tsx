'use client';

import { useTransition } from 'react';
import { deleteBrandMutation } from '@/db/mutations/brands/delete';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';

import { EllipsisVertical } from 'lucide-react';
import { toast } from 'sonner';

type BrandActionsProps = {
  brandId: string;
  deletedAt: Date | null;
};

export function BrandActions({ brandId, deletedAt }: BrandActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = confirm('Sigur doresti sa stergi acest producator?');

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      try {
        await deleteBrandMutation(brandId);
        toast.success('Producator Sters');
      } catch (e) {
        console.error(e);
        toast.error(`Erroare , nu sa putut sterge producatorul ${brandId} `);
      }
    });
  };

  const handleRestore = () => {
    toast.success('Restored');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {deletedAt ? (
          <>
            <DropdownMenuItem disabled={isPending} onClick={handleRestore}>
              Restore
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>Edit</DropdownMenuItem>

            <DropdownMenuItem disabled={isPending} onClick={handleDelete}>
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
