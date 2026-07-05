import { relations } from 'drizzle-orm';

import { products, reviews } from '@/db/schemas/shop-schema';

export const reviewsRelations = relations(reviews, ({ one }) => ({
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
}));
