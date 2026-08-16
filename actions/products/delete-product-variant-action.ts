'use server';

import { db } from '@/db';
import { productVariants } from '@/db/schema';
import { and, asc, eq, isNull, ne } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const deleteProductVariant = async (variantId: string) => {
  if (!variantId) {
    return {
      success: false,
      error: 'Variant ID is required.',
    };
  }

  try {
    await db.transaction(async (tx) => {
      // 1. Get the variant that will be deleted
      const [variant] = await tx
        .select({
          id: productVariants.id,
          productId: productVariants.productId,
          isDefault: productVariants.isDefault,
        })
        .from(productVariants)
        .where(eq(productVariants.id, variantId))
        .limit(1);

      if (!variant) {
        throw new Error('Variant not found.');
      }

      // 2. Soft delete the variant first
      await tx
        .update(productVariants)
        .set({
          deletedAt: new Date(),
          active: false,
          isDefault: false,
          updatedAt: new Date(),
        })
        .where(eq(productVariants.id, variantId));

      // 3. If it was the default variant,
      //    find another active, non-deleted variant
      if (variant.isDefault) {
        const [newDefaultVariant] = await tx
          .select({
            id: productVariants.id,
          })
          .from(productVariants)
          .where(
            and(
              eq(productVariants.productId, variant.productId),
              isNull(productVariants.deletedAt),
              eq(productVariants.active, true),
              ne(productVariants.id, variant.id),
            ),
          )
          .orderBy(asc(productVariants.sortOrder))
          .limit(1);

        // 4. Make the next variant the default
        if (newDefaultVariant) {
          await tx
            .update(productVariants)
            .set({
              isDefault: true,
              updatedAt: new Date(),
            })
            .where(eq(productVariants.id, newDefaultVariant.id));
        }
      }
    });

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
