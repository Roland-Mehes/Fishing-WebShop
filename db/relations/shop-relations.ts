import { relations } from 'drizzle-orm';

import {
  productAttributes,
  attributeDefinitions,
  categories,
  brands,
  products,
  productImages,
  productVariantAttributes,
  productVariants,
  discounts,
  reviews,
} from '@/db/schemas/shop-schema';

/**
 * Brand → Products
 */
export const brandsRelations = relations(brands, ({ many }) => ({
  products: many(products),
}));

/**
 * Category → Parent / Children / Products
 *
 * A category önmagára hivatkozik a parent/children kapcsolat miatt.
 */
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

/**
 * Product Attribute → Product / Attribute Definition
 */
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

/**
 * Product Image → Product
 */
export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

/**
 * Product Variant Attribute → Variant / Attribute Definition
 */
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

/**
 * Product Variant → Product / Discounts / Attributes
 */
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

/**
 * Attribute Definition → Product Attributes / Variant Attributes
 */
export const attributeDefinitionsRelations = relations(
  attributeDefinitions,
  ({ many }) => ({
    values: many(productAttributes),

    variantValues: many(productVariantAttributes),
  }),
);

/**
 * Discount → Product Variant
 */
export const discountsRelations = relations(discounts, ({ one }) => ({
  variant: one(productVariants, {
    fields: [discounts.variantId],
    references: [productVariants.id],
  }),
}));

/**
 * Review → Product
 */
export const reviewsRelations = relations(reviews, ({ one }) => ({
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
}));

/**
 * Product → Brand / Category / Images / Variants / Reviews / Attributes
 *
 * Ez a Product központi relation-je a webshop domainben.
 */
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
