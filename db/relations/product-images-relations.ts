import { relations } from 'drizzle-orm';

import { products, productImages } from '@/db/schemas/shop-schema';

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));
