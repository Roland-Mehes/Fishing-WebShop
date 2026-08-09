'use client';

import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';

import { EllipsisVertical } from 'lucide-react';

type VariantActionsProps = {
  productId: string;
  variantId: string;
  active: boolean;
};

const VariantActions = ({
  productId,
  active,
  variantId,
}: VariantActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/admin/products/${productId}/variants/${variantId}`}>
            Edit
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/admin/products/${productId}/variants`}>
            Set Default
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          {active ? 'Deactivate' : 'Activate'}
        </DropdownMenuItem>

        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VariantActions;
