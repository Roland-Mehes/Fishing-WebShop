import { db } from '@/db';
import { productVariants } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const restoreVariantMutation = async (variantId: string) => {
  const [variant] = await db
    .update(productVariants)
    .set({ deletedAt: null, updatedAt: new Date() })
    .where(eq(productVariants.id, variantId))
    .returning({ id: productVariants.id });

  return variant;
};
