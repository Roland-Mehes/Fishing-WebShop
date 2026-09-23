'use server';

import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { productImages } from '@/db/schema';

export async function setPrimaryProductImageAction(
  productId: string,
  imageId: string,
) {
  try {
    await db.transaction(async (tx) => {
      // Remove every PIMARY STATE for each image
      await tx
        .update(productImages)
        .set({
          isPrimary: false,
        })
        .where(eq(productImages.productId, productId));

      // Set the selected image as PRIMARY
      await tx
        .update(productImages)
        .set({
          isPrimary: true,
        })
        .where(
          and(
            eq(productImages.id, imageId),
            eq(productImages.productId, productId),
          ),
        );
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Failed to set primary product image:', error);

    return {
      success: false,
      error: 'Nu s-a putut schimba imaginea principala.',
    };
  }
}
