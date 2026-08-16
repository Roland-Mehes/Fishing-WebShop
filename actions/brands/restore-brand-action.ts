'use server';

import { restoreBrandMutation } from '@/db/mutations/brands/restore';
import { revalidatePath } from 'next/cache';

export const restoreBrandAction = async (brandId: string) => {
  if (!brandId) {
    return { success: false, error: 'Brand ID is required.' };
  }

  try {
    const brand = await restoreBrandMutation(brandId);

    if (!brand) {
      return {
        success: false,
        error: 'Brand not found or could not be restored.',
      };
    }

    revalidatePath('/admin/brands');
    return { success: true };
  } catch (error) {
    console.error('Failed to restore brand:', error);
    return { success: false, error: 'Failed to restore brand.' };
  }
};
