import { products, productVariants } from '@/db/schema';
import { and, eq, ilike, or, sql, type SQL } from 'drizzle-orm';

export type ProductListFilters = {
  categoryId?: string;
  brandId?: string;
  active?: boolean;

  page?: number;
  pageSize?: number;

  search?: string;
};

export function buildProductFilters({
  categoryId,
  brandId,
  active,
  search,
}: ProductListFilters): SQL[] {
  const filters: SQL[] = [];

  if (categoryId) {
    filters.push(eq(products.categoryId, categoryId));
  }

  if (brandId) {
    filters.push(eq(products.brandId, brandId));
  }

  if (active !== undefined) {
    filters.push(eq(products.active, active));
  }

  if (search?.trim()) {
    const searchPattern = `%${search.trim()}%`;

    filters.push(
      or(
        ilike(products.name, searchPattern),

        sql`exists (
          select 1
          from ${productVariants}
          where ${productVariants.productId} = ${products.id}
            and (
              ${productVariants.sku} ilike ${searchPattern}
              or ${productVariants.ean} ilike ${searchPattern}
            )
        )`,
      )!,
    );
  }

  return filters;
}
