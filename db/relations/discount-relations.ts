import { relations } from 'drizzle-orm';

import { discounts, productVariants } from '@/db/schemas/shop-schema';

export const discountsRelations = relations(discounts, ({ one }) => ({
  variant: one(productVariants, {
    fields: [discounts.variantId],
    references: [productVariants.id],
  }),
}));
