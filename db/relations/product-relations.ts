import { relations } from 'drizzle-orm';

import { productAttributes, products, attributeDefinitions } from '../schema';

export const productAttributesRelations = relations(
  productAttributes,
  ({ one }) => ({
    product: one(products, {
      fields: [productAttributes.productId],
      references: [products.id],
    }),

    attribute: one(attributeDefinitions, {
      fields: [productAttributes.attributeId],
      references: [attributeDefinitions.id],
    }),
  }),
);
