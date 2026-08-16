'use server';

import { revalidatePath } from 'next/cache';

import { deleteVariantMutation } from '@/db/mutations/products/variants/delete';

export const deleteProductVariant = async (variantId: string) => {
  if (!variantId) {
    return {
      success: false,
      error: 'Variant ID is required.',
    };
  }

  try {
    await deleteVariantMutation(variantId);

    revalidatePath(`/admin/products`);

    return {
      success: true,
    };
  } catch (error) {
    console.error('Failed to delete product variant:', error);

    if (error instanceof Error && error.message === 'Variant not found.') {
      return {
        success: false,
        error: 'Variant not found.',
      };
    }

    return {
      success: false,
      error: 'Failed to delete product variant.',
    };
  }
};
