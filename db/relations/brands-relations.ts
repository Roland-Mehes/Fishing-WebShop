import { relations } from 'drizzle-orm';

import { brands, products } from '@/db/schemas/shop-schema';

export const brandsRelations = relations(brands, ({ many }) => ({
  products: many(products),
}));
