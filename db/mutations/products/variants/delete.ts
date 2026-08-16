import { db } from '@/db';
import { productVariants } from '@/db/schema';
import { and, asc, eq, isNull, ne } from 'drizzle-orm';

export async function deleteVariantMutation(variantId: string) {
  return db.transaction(async (tx) => {
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

    const now = new Date();

    // Soft delete
    await tx
      .update(productVariants)
      .set({
        deletedAt: now,
        active: false,
        isDefault: false,
        updatedAt: now,
      })
      .where(eq(productVariants.id, variantId));

    // If deleted variant was the default,
    // assign default to the first available active variant.
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

      if (newDefaultVariant) {
        await tx
          .update(productVariants)
          .set({
            isDefault: true,
            updatedAt: now,
          })
          .where(eq(productVariants.id, newDefaultVariant.id));
      }
    }

    return variant;
  });
}
