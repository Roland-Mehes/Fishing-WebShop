import { relations } from 'drizzle-orm';

import {
  products,
  productVariants,
  discounts,
  productVariantAttributes,
} from '@/db/schemas/shop-schema';

export const productVariantsRelations = relations(
  productVariants,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),

    discounts: many(discounts),
    variantAttributes: many(productVariantAttributes),
  }),
);
