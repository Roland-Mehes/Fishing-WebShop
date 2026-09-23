import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db';
import { discounts } from '@/db/schema';

type CreateDiscountInput = {
  variantId: string;
  type: 'percentage' | 'fixed';
  value: number;
  startsAt: Date | null;
  endsAt: Date | null;
  active: boolean;
};

export async function createDiscount(data: CreateDiscountInput) {
  return db.transaction(async (tx) => {
    if (data.active) {
      await tx
        .update(discounts)
        .set({
          active: false,
        })
        .where(
          and(
            eq(discounts.variantId, data.variantId),
            eq(discounts.active, true),
            isNull(discounts.deletedAt),
          ),
        );
    }

    const [discount] = await tx
      .insert(discounts)
      .values({
        variantId: data.variantId,
        type: data.type,
        value: data.value,
        startsAt: data.startsAt,
        endsAt: data.endsAt,
        active: data.active,
      })
      .returning();

    return discount;
  });
}
