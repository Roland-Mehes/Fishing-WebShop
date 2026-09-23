import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db';
import { discounts } from '@/db/schema';

export async function deactivateDiscount(variantId: string) {
  const [discount] = await db
    .update(discounts)
    .set({
      active: false,
    })
    .where(
      and(
        eq(discounts.variantId, variantId),
        eq(discounts.active, true),
        isNull(discounts.deletedAt),
      ),
    )
    .returning();

  return discount;
}
