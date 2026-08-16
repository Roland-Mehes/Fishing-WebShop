'use server';

import { restoreVariantMutation } from '@/db/mutations/products/variants/restore';
import { revalidatePath } from 'next/cache';

export const restoreProductVariant = async (variantId: string) => {
  if (!variantId) {
    return { success: false, error: 'Variant ID is required.' };
  }

  try {
    await restoreVariantMutation(variantId);

    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    console.error('Failed to restore product variant:', error);
    return { success: false, error: 'Failed to restore product variant.' };
  }
};
