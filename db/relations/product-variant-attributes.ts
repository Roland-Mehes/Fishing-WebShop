import { relations } from 'drizzle-orm';

import {
  productVariantAttributes,
  productVariants,
  attributeDefinitions,
} from '@/db/schemas/shop-schema';

export const productVariantAttributesRelations = relations(
  productVariantAttributes,
  ({ one }) => ({
    variant: one(productVariants, {
      fields: [productVariantAttributes.variantId],
      references: [productVariants.id],
    }),

    attribute: one(attributeDefinitions, {
      fields: [productVariantAttributes.attributeId],
      references: [attributeDefinitions.id],
    }),
  }),
);
