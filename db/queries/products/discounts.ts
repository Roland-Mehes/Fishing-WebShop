import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db';
import { discounts } from '@/db/schema';

// GET ACTIVE discounts

export async function getActiveDiscountByVariantId(variantId: string) {
  return db.query.discounts.findFirst({
    where: and(
      eq(discounts.variantId, variantId),
      eq(discounts.active, true),
      isNull(discounts.deletedAt),
    ),
  });
}
