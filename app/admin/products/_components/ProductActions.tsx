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

type ProductActionsProps = {
  productId: string;
  active: boolean;
};

const ProductActions = ({ productId, active }: ProductActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/admin/products/${productId}/edit`}>Edit</Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          {active ? 'Deactivate' : 'Activate'}
        </DropdownMenuItem>

        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductActions;
