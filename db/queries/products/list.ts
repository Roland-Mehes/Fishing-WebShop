import { buildProductFilters } from './filters';
import { db } from '@/db';
import { products, brands, productVariants, categories } from '@/db/schema';
import { eq, and, count, isNull, sql } from 'drizzle-orm';
import { DEFAULT_PAGE_SIZE } from '@/lib/pagination';

import { primaryImageSubquery } from './subqueries';

export type ProductListFilters = {
  categoryId?: string;
  brandId?: string;
  active?: boolean;

  page?: number;
  pageSize?: number;

  search?: string;
};

export async function getProductsList({
  categoryId,
  brandId,
  active,
  page,
  pageSize,
  search,
}: ProductListFilters) {
  const filters = buildProductFilters({ categoryId, brandId, active, search });

  const limit = pageSize ?? DEFAULT_PAGE_SIZE;
  const offset = ((page ?? 1) - 1) * limit;

  return db
    .select({
      id: products.id,
      name: products.name,
      createdAt: products.createdAt,
      brandName: brands.name,
      imageUrl: primaryImageSubquery.imageUrl,
      category: categories.name,
      active: products.active,
      variantsCount: sql<number>`
  coalesce(${variantsCountSubquery.variantsCount}, 0)
`.as('variants_count'),
    })
    .from(products)
    .leftJoin(brands, eq(products.brandId, brands.id))
    .leftJoin(categories, eq(categories.id, products.categoryId))
    .leftJoin(
      primaryImageSubquery,
      eq(primaryImageSubquery.productId, products.id),
    )
    .leftJoin(
      variantsCountSubquery,
      eq(variantsCountSubquery.productId, products.id),
    )
    .where(
      and(
        isNull(brands.deletedAt),
        filters.length ? and(...filters) : undefined,
      ),
    )
    .limit(limit)
    .offset(offset);
}

export type ProductListItem = Awaited<
  ReturnType<typeof getProductsList>
>[number];

// Total Product Variant Count

const variantsCountSubquery = db
  .select({
    productId: productVariants.productId,
    variantsCount: count(productVariants.id).as('variants_count'),
  })
  .from(productVariants)
  .groupBy(productVariants.productId)
  .as('variants_count_subquery');

// Total Product Count

export async function getProductsCount(filters: ProductListFilters) {
  const whereFilters = buildProductFilters(filters);

  const [{ count: total }] = await db
    .select({
      count: count(),
    })
    .from(products)
    .where(whereFilters.length ? and(...whereFilters) : undefined);

  return total;
}
