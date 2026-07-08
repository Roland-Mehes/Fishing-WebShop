import { products, productVariants } from '@/db/schema';
import { eq, ilike, or } from 'drizzle-orm';

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
}: ProductListFilters) {
  const filters = [];

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
    filters.push(
      or(
        ilike(products.name, `%${search}%`),
        ilike(productVariants.sku, `%${search}%`),
        ilike(productVariants.ean, `%${search}%`),
      ),
    );
  }

  return filters;
}
