import { db } from '@/db';

import {
  brands,
  categories,
  productImages,
  productVariants,
  products,
} from '@/db/schema';
import { and, eq, ilike, isNull, or, sql } from 'drizzle-orm';

const PRODUCT_SEARCH_LIMIT = 5;
const BRAND_SEARCH_LIMIT = 3;
const CATEGORY_LIMIT = 3;

export const searchProducts = async (query: string) => {
  const search = query.trim();

  if (!search) return [];

  const searchTerm = `%${search}%`;

  return db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,

      imageUrl: sql<string | null>`(
            select ${productImages.imageKey} from ${productImages} where ${productImages.productId} = ${products.id} and ${productImages.isPrimary} = true order by ${productImages.sortOrder} asc limit 1 
        )`,

      price: productVariants.price,
    })
    .from(products)
    .innerJoin(
      productVariants,
      and(
        eq(productVariants.productId, products.id),
        eq(productVariants.isDefault, true),
      ),
    )
    .where(
      and(
        eq(products.active, true),
        isNull(products.deletedAt),
        eq(productVariants.active, true),
        isNull(productVariants.deletedAt),

        or(
          ilike(products.name, searchTerm),

          sql`exists (select 1 from ${productVariants} search_variant where search_variant.product_id = ${products.id} and search_variant.deleted_at is null and search_variant.active is true and (search_variant.sku ilike ${searchTerm} or search_variant.ean ilike ${searchTerm}))`,
        ),
      ),
    )
    .limit(PRODUCT_SEARCH_LIMIT);
};

export const searchBrands = async (query: string) => {
  const search = query.trim();

  if (!search) return [];

  const searchTerm = `%${search}%`;

  return db
    .select({ id: brands.id, name: brands.name, slug: brands.slug })
    .from(brands)
    .where(and(ilike(brands.name, searchTerm), isNull(brands.deletedAt)))
    .limit(BRAND_SEARCH_LIMIT);
};

export async function searchCategories(query: string) {
  const search = query.trim();

  if (!search) {
    return [];
  }

  const searchTerm = `%${search}%`;

  return db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
    })
    .from(categories)
    .where(
      and(ilike(categories.name, searchTerm), isNull(categories.deletedAt)),
    )
    .limit(CATEGORY_LIMIT);
}
