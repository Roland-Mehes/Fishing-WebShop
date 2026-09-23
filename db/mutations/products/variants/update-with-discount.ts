import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db';
import { discounts, productVariants } from '@/db/schema';

import type { UpdateVariantWithDiscountInput } from '@/lib/validation/products/product-variants-schema';

export async function updateVariantWithDiscount(
  data: UpdateVariantWithDiscountInput,
) {
  return db.transaction(async (tx) => {
    const { discount, ...variantData } = data;

    // 1. Update variant
    await tx
      .update(productVariants)
      .set({
        variantName: variantData.variantName,
        sku: variantData.sku,
        ean: variantData.ean,
        price: variantData.price,
        stock: variantData.stock,
        reservedStock: variantData.reservedStock,
        active: variantData.active,
        isDefault: variantData.isDefault,
        updatedAt: new Date(),
      })
      .where(eq(productVariants.id, variantData.variantId));

    // 2. Get current active discount
    const activeDiscount = await tx.query.discounts.findFirst({
      where: and(
        eq(discounts.variantId, variantData.variantId),
        eq(discounts.active, true),
        isNull(discounts.deletedAt),
      ),
    });

    // 3. No discount -> create
    if (!activeDiscount && discount.active) {
      await tx.insert(discounts).values({
        variantId: variantData.variantId,
        type: discount.type,
        value: discount.value,
        startsAt: discount.startsAt ? new Date(discount.startsAt) : null,
        endsAt: discount.endsAt ? new Date(discount.endsAt) : null,
        active: true,
      });
    }

    // 4. Existing discount -> update
    if (activeDiscount && discount.active) {
      await tx
        .update(discounts)
        .set({
          type: discount.type,
          value: discount.value,
          startsAt: discount.startsAt ? new Date(discount.startsAt) : null,
          endsAt: discount.endsAt ? new Date(discount.endsAt) : null,
        })
        .where(eq(discounts.id, activeDiscount.id));
    }

    // 5. Existing discount -> deactivate
    if (activeDiscount && !discount.active) {
      await tx
        .update(discounts)
        .set({
          active: false,
        })
        .where(eq(discounts.id, activeDiscount.id));
    }

    return {
      success: true,
    };
  });
}
