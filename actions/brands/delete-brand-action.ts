'use server';
import { deleteBrandMutation } from '@/db/mutations/brands/delete';
import { revalidatePath } from 'next/cache';

export const deleteBrandAction = async (brandId: string) => {
  if (!brandId) {
    return { success: false, error: 'Brand ID is required.' };
  }
  try {
    await deleteBrandMutation(brandId);

    revalidatePath('/admin/brands');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete brand:', error);

    if (error instanceof Error && error.message === 'Brand not found.') {
      return {
        success: false,
        error: 'Brand not found or could not be deleted.',
      };
    } else {
      return { success: false, error: 'Failed to delete brand.' };
    }
  }
};
