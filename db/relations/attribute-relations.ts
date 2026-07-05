import { relations } from 'drizzle-orm';

import {
  attributeDefinitions,
  productAttributes,
  productVariantAttributes,
} from '../schema';

export const attributeDefinitionsRelations = relations(
  attributeDefinitions,
  ({ many }) => ({
    values: many(productAttributes),
    variantValues: many(productVariantAttributes),
  }),
);
