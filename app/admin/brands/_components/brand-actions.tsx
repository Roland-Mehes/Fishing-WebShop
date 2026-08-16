'use client';

import { useTransition } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';

import { EllipsisVertical } from 'lucide-react';
import { toast } from 'sonner';
import { restoreBrandAction } from '@/actions/brands/restore-brand-action';
import { deleteBrandAction } from '@/actions/brands/delete-brand-action';

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
        await deleteBrandAction(brandId);
        toast.success('Producator Sters');
      } catch (e) {
        console.error(e);
        toast.error(`Erroare , nu sa putut sterge producatorul ${brandId} `);
      }
    });
  };

  const handleRestore = async () => {
    const confirmed = confirm('Sigur doresti sa restereste acest producator?');
    if (!confirmed || !deletedAt) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await restoreBrandAction(brandId);

        if (!result.success) {
          toast.error(result.error);
          return;
        }

        toast.success('Producator restaurat');
      } catch (e) {
        console.error(e);
        toast.error(`Erroare , nu putut restereste producatorul ${brandId} `);
      }
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
