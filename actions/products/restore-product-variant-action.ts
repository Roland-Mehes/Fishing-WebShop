'use server';

import { db } from '@/db';
import { productVariants } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const restoreProductVariant = async (variantId: string) => {
  if (!variantId) {
    return { success: false, error: 'Variant ID is required.' };
  }

  try {
    await db
      .update(productVariants)
      .set({ deletedAt: null, active: true, updatedAt: new Date() })
      .where(eq(productVariants.id, variantId));

    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    console.error('Failed to restore product variant:', error);
    return { success: false, error: 'Failed to restore product variant.' };
  }
};
