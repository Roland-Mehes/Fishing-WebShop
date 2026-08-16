'use client';

import Link from 'next/link';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';

import { EllipsisVertical } from 'lucide-react';
import { deleteProductVariant } from '@/actions/products/delete-product-variant-action';
import { restoreProductVariant } from '@/actions/products/restore-product-variant-action';
import { toast } from 'sonner';

type VariantActionsProps = {
  productId: string;
  variantId: string;
  active: boolean;
  deletedAt: Date | null;
};

const VariantActions = ({
  productId,
  active,
  variantId,
  deletedAt,
}: VariantActionsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVariantDelete = async () => {
    const confirmed = confirm('Esti sigur că vrei să ștergi această variantă?');

    if (!confirmed) {
      return;
    }

    try {
      setIsProcessing(true);

      const result = await deleteProductVariant(variantId);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success('Varianta a fost ștearsă.');
    } catch (error) {
      console.error(error);
      toast.error('A apărut o eroare la ștergerea variantei.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVariantRestore = async () => {
    const confirmed = confirm(
      'Esti sigur că vrei să restaurezi această variantă?',
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsProcessing(true);

      const result = await restoreProductVariant(variantId);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success('Varianta a fost restaurată.');
    } catch (error) {
      console.error(error);
      toast.error('A apărut o eroare la restaurarea variantei.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {deletedAt ? (
          <>
            <DropdownMenuItem
              disabled={isProcessing}
              onClick={handleVariantRestore}
            >
              Restore
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href={`/admin/products/${productId}/variants/${variantId}`}>
                Edit
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>Set Default</DropdownMenuItem>

            <DropdownMenuItem>
              {active ? 'Deactivate' : 'Activate'}
            </DropdownMenuItem>

            <DropdownMenuItem
              variant="destructive"
              disabled={isProcessing}
              onClick={handleVariantDelete}
            >
              {isProcessing ? 'Deleting...' : 'Delete'}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VariantActions;
