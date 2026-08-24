import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
  numeric,
  pgEnum,
  AnyPgColumn,
  unique,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

import { user } from './auth-schema';
import { sql } from 'drizzle-orm';

/* =========================
 ENUMs
========================= */

export const discountEnum = pgEnum('discount_type', ['percentage', 'fixed']);

/* =========================
   BRANDS
========================= */

export const brands = pgTable(
  'brands',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    name: varchar('name', {
      length: 100,
    }).notNull(),

    slug: varchar('slug', {
      length: 255,
    }).notNull(),

    logoKey: text(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    uniqueIndex('brand_name_active_unique')
      .on(table.name)
      .where(sql`${table.deletedAt} IS NULL`),

    uniqueIndex('brands_slug_active_unique')
      .on(table.slug)
      .where(sql`${table.deletedAt} IS NULL`),
  ],
);

/* =========================
   CATEGORIES
========================= */

export const categories = pgTable(
  'categories',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    name: varchar('name', {
      length: 255,
    }).notNull(),

    slug: varchar('slug', {
      length: 255,
    }).notNull(),

    imageKey: text('image_key'),

    isFeatured: boolean('is_featured').notNull().default(false),

    sortOrder: integer('sort_order').notNull().default(0),

    parentId: uuid('parent_id').references((): AnyPgColumn => categories.id, {
      onDelete: 'set null',
    }),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    uniqueIndex('categories_slug_active_unique')
      .on(table.slug)
      .where(sql`${table.deletedAt} IS NULL`),
  ],
);

/* =========================
   PRODUCTS
========================= */

export const products = pgTable(
  'products',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    brandId: uuid('brand_id')
      .references(() => brands.id, {
        onDelete: 'restrict',
      })
      .notNull(),

    categoryId: uuid('category_id')
      .references(() => categories.id, {
        onDelete: 'restrict',
      })
      .notNull(),

    name: varchar('name', {
      length: 255,
    }).notNull(),

    seoTitle: varchar('seo_title', { length: 255 }),
    seoDescription: text('seo_description'),

    slug: varchar('slug', {
      length: 255,
    }).notNull(),

    shortDescription: text('short_description'),

    description: text('description'),

    ratingAverage: numeric('rating_average', {
      precision: 3,
      scale: 2,
      mode: 'number',
    })
      .default(0)
      .notNull(),

    ratingCount: integer('rating_count').default(0).notNull(),

    active: boolean('active').default(true).notNull(),

    deletedAt: timestamp('deleted_at'),

    createdAt: timestamp('created_at').defaultNow().notNull(),

    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('products_slug_active_unique')
      .on(table.slug)
      .where(sql`${table.deletedAt} IS NULL`),
  ],
);

/* =========================
   PRODUCT IMAGES
========================= */

export const productImages = pgTable('product_images', {
  id: uuid('id').defaultRandom().primaryKey(),

  productId: uuid('product_id')
    .references(() => products.id, {
      onDelete: 'cascade',
    })
    .notNull(),

  imageUrl: text('image_url'),

  alt: varchar('alt', {
    length: 255,
  }),

  // IF there is more pohoto to a product, which is the order they are shown under the CARD.
  sortOrder: integer('sort_order').default(0).notNull(),

  // IF there is more pohoto to a product, which is the first one visible on the CARD.
  isPrimary: boolean('is_primary').default(false).notNull(),
});

/* =========================
   PRODUCT VARIANTS
========================= */
// ide jonnek majd az anyagok , pl monofil , carbon , szinek , gyartok
export const productVariants = pgTable(
  'product_variants',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    productId: uuid('product_id')
      .references(() => products.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    sku: varchar('sku', {
      length: 100,
    }).notNull(),

    ean: varchar('ean', {
      length: 50,
    }),

    variantName: varchar('variant_name', {
      length: 255,
    }).notNull(),

    price: numeric('price', {
      precision: 10,
      scale: 2,
      mode: 'number',
    }).notNull(),

    stock: integer('stock').default(0).notNull(),

    reservedStock: integer('reserved_stock').default(0).notNull(),

    active: boolean('active').default(true).notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),

    updatedAt: timestamp('updated_at').defaultNow().notNull(),

    deletedAt: timestamp('deleted_at'),

    sortOrder: integer('sort_order').default(0).notNull(),
    isDefault: boolean('is_default').default(false).notNull(),
  },
  (table) => [
    uniqueIndex('product_variants_sku_active_unique')
      .on(table.sku)
      .where(sql`${table.deletedAt} IS NULL`),

    uniqueIndex('product_variants_one_default_per_product')
      .on(table.productId)
      .where(sql`${table.isDefault}=true AND ${table.deletedAt} IS NULL`),
  ],
);

//  Ide jonnek majd a bot hosszak , horog meret , zsinor vastagsag
export const productVariantAttributes = pgTable(
  'product_variant_attributes',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    variantId: uuid('variant_id')
      .references(() => productVariants.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    attributeId: uuid('attribute_id')
      .references(() => attributeDefinitions.id)
      .notNull(),

    value: text('value').notNull(),
  },
  (table) => [
    unique('variant_attribute_uniqe').on(table.variantId, table.attributeId),
  ],
);
/* =========================
   DISCOUNTS
========================= */

export const discounts = pgTable('discounts', {
  id: uuid('id').defaultRandom().primaryKey(),

  variantId: uuid('variant_id')
    .references(() => productVariants.id, {
      onDelete: 'cascade',
    })
    .notNull(),

  type: discountEnum('type').default('percentage').notNull(),

  value: numeric('value', {
    precision: 10,
    scale: 2,
    mode: 'number',
  }).notNull(),

  startsAt: timestamp('starts_at'),

  endsAt: timestamp('ends_at'),

  active: boolean('active').default(true).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/* =========================
   REVIEWS
========================= */

export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),

  productId: uuid('product_id')
    .references(() => products.id, {
      onDelete: 'cascade',
    })
    .notNull(),

  userId: text('user_id')
    .references(() => user.id)
    .notNull(),

  rating: integer('rating').notNull(),

  title: varchar('title', {
    length: 255,
  }),

  comment: text('comment'),

  approved: boolean('approved').default(false).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/* =========================
   Product attributes definition
========================= */

export const attributeDefinitions = pgTable(
  'attribute_definitions',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    name: varchar('name', {
      length: 255,
    }).notNull(),

    slug: varchar('slug', {
      length: 255,
    }).notNull(),

    unit: varchar('unit', {
      length: 50,
    }),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    uniqueIndex('attribute_definitions_slug_active_unique')
      .on(table.slug)
      .where(sql`${table.deletedAt} IS NULL`),
  ],
);

/* =========================
   Product attributes
========================= */

export const productAttributes = pgTable(
  'product_attributes',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    productId: uuid('product_id')
      .references(() => products.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    attributeId: uuid('attribute_id')
      .references(() => attributeDefinitions.id)
      .notNull(),

    value: text('value').notNull(),
  },
  (table) => [
    unique('product_attribute_uniq').on(table.productId, table.attributeId),
  ],
);
