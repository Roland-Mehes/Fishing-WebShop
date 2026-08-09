import { products, productVariants } from '@/db/schema';
import { and, eq, ilike, or, type SQL } from 'drizzle-orm';

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
    const searchPattern = `%${search}%`;

    filters.push(
      or(
        ilike(products.name, searchPattern),
        ilike(productVariants.sku, searchPattern),
        ilike(productVariants.ean, searchPattern),
      )!,
    );
  }

  return filters;
}
