import { relations } from 'drizzle-orm';

import {
  products,
  brands,
  categories,
  productImages,
  productVariants,
  reviews,
  productAttributes,
} from '@/db/schemas/shop-schema';

export const productsRelations = relations(products, ({ one, many }) => ({
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),

  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),

  images: many(productImages),

  variants: many(productVariants),

  reviews: many(reviews),

  attributes: many(productAttributes),
}));
