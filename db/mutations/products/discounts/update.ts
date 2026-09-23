import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db';
import { discounts } from '@/db/schema';

import type { DiscountInput } from '@/lib/validation/products/discounts-schema';

type UpdateDiscountInput = DiscountInput & {
  variantId: string;
};

export async function updateDiscount(data: UpdateDiscountInput) {
  const [discount] = await db
    .update(discounts)
    .set({
      type: data.type,
      value: data.value,
      startsAt: data.startsAt ? new Date(data.startsAt) : null,
      endsAt: data.endsAt ? new Date(data.endsAt) : null,
      active: data.active,
    })
    .where(
      and(
        eq(discounts.variantId, data.variantId),
        eq(discounts.active, true),
        isNull(discounts.deletedAt),
      ),
    )
    .returning();

  return discount;
}
