import { buildProductFilters } from './filters';
import { db } from '@/db';
import { products, brands, productVariants, categories } from '@/db/schema';
import { eq, and, count } from 'drizzle-orm';
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
      price: productVariants.price,
      ean: productVariants.ean,
      sku: productVariants.sku,
      stock: productVariants.stock,
      category: categories.name,
      active: products.active,
    })
    .from(products)
    .leftJoin(brands, eq(products.brandId, brands.id))
    .leftJoin(productVariants, eq(productVariants.productId, products.id))
    .leftJoin(categories, eq(categories.id, products.categoryId))
    .leftJoin(
      primaryImageSubquery,
      eq(primaryImageSubquery.productId, products.id),
    )
    .where(filters.length ? and(...filters) : undefined)
    .limit(limit)
    .offset(offset);
}

export type ProductListItem = Awaited<
  ReturnType<typeof getProductsList>
>[number];

export async function getProductsCount(filters: ProductListFilters) {
  const whereFilters = buildProductFilters(filters);

  const [{ count: total }] = await db
    .select({
      count: count(),
    })
    .from(products)
    .leftJoin(productVariants, eq(productVariants.productId, products.id))
    .where(whereFilters.length ? and(...whereFilters) : undefined);

  return total;
}
