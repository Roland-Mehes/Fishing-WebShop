import { relations } from 'drizzle-orm';

import { categories, products } from '@/db/schemas/shop-schema';

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: 'category_parent',
  }),

  children: many(categories, {
    relationName: 'category_parent',
  }),

  products: many(products),
}));
