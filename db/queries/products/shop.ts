import { and, eq, ilike, isNull, or, sql, count, type SQL } from 'drizzle-orm';

import { db } from '@/db';
import {
  brands,
  discounts,
  productImages,
  productVariants,
  products,
} from '@/db/schema';

import { DEFAULT_PAGE_SIZE } from '@/lib/pagination';

export type ShopProductFilters = {
  categoryId?: string;
  brandId?: string;
  brandSlug?: string;
  search?: string;

  inStock?: boolean;
  onSale?: boolean;

  minPrice?: number;
  maxPrice?: number;

  page?: number;
  pageSize?: number;
};

export async function getShopProducts({
  categoryId,
  brandId,
  brandSlug,
  search,
  inStock = true,
  onSale,
  minPrice,
  maxPrice,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
}: ShopProductFilters = {}) {
  const limit = pageSize;
  const offset = (page - 1) * limit;

  const filters: SQL<unknown>[] = [
    eq(products.active, true),
    isNull(products.deletedAt),
    isNull(brands.deletedAt),
    isNull(productVariants.deletedAt),
    eq(productVariants.active, true),
  ];

  /*
   * STOCK FILTER
   *
   * Available stock = stock - reservedStock
   */
  if (inStock) {
    filters.push(
      sql`${productVariants.stock} - ${productVariants.reservedStock} > 0`,
    );
  }

  /*
   * CATEGORY
   */
  if (categoryId) {
    filters.push(eq(products.categoryId, categoryId));
  }

  /*
   * BRAND
   */
  if (brandId) {
    filters.push(eq(products.brandId, brandId));
  }

  if (brandSlug) {
    filters.push(eq(brands.slug, brandSlug));
  }

  /*
   * SEARCH
   *
   * Search by:
   * - product name
   * - any variant SKU
   * - any variant EAN
   */
  if (search?.trim()) {
    const searchTerm = `%${search.trim()}%`;

    const searchFilter = or(
      ilike(products.name, searchTerm),

      sql`exists (
        select 1
        from ${productVariants} search_variant
        where search_variant.product_id = ${products.id}
          and (
            search_variant.sku ilike ${searchTerm}
            or search_variant.ean ilike ${searchTerm}
          )
      )`,
    );

    if (searchFilter) {
      filters.push(searchFilter);
    }
  }

  /*
   * PRICE RANGE
   *
   * Price comes from the default variant.
   */
  if (minPrice !== undefined) {
    filters.push(sql`${productVariants.price} >= ${minPrice}`);
  }

  if (maxPrice !== undefined) {
    filters.push(sql`${productVariants.price} <= ${maxPrice}`);
  }

  /*
   * ON SALE
   *
   * A product is considered "on sale" if its default variant
   * has an active discount at the current time.
   */
  if (onSale) {
    filters.push(
      sql`exists (
        select 1
        from ${discounts} sale_discount
        where sale_discount.variant_id = ${productVariants.id}
          and sale_discount.active = true
          and (
            sale_discount.starts_at is null
            or sale_discount.starts_at <= now()
          )
          and (
            sale_discount.ends_at is null
            or sale_discount.ends_at >= now()
          )
      )`,
    );
  }

  /*
   * QUERY
   */
  const [rows, totalResult] = await Promise.all([
    db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,

        /*
         * PRIMARY IMAGE
         */
        imageUrl: sql<string | null>`(
        select ${productImages.imageKey}
        from ${productImages}
        where ${productImages.productId} = ${products.id}
          and ${productImages.isPrimary} = true
        order by ${productImages.sortOrder} asc
        limit 1
      )`,

        /*
         * DEFAULT VARIANT
         */
        variantId: productVariants.id,
        sku: productVariants.sku,

        price: productVariants.price,
        stock: productVariants.stock,
        reservedStock: productVariants.reservedStock,

        /*
         * RATING
         *
         * Already stored/aggregated on products.
         */
        ratingAverage: products.ratingAverage,
        ratingCount: products.ratingCount,

        /*
         * ACTIVE DISCOUNT
         */
        discountType: sql<'percentage' | 'fixed' | null>`(
        select ${discounts.type}
        from ${discounts}
        where ${discounts.variantId} = ${productVariants.id}
          and ${discounts.active} = true
          and (
            ${discounts.startsAt} is null
            or ${discounts.startsAt} <= now()
          )
          and (
            ${discounts.endsAt} is null
            or ${discounts.endsAt} >= now()
          )
        order by ${discounts.createdAt} desc
        limit 1
      )`,

        discountValue: sql<number | null>`(
        select ${discounts.value}
        from ${discounts}
        where ${discounts.variantId} = ${productVariants.id}
          and ${discounts.active} = true
          and (
            ${discounts.startsAt} is null
            or ${discounts.startsAt} <= now()
          )
          and (
            ${discounts.endsAt} is null
            or ${discounts.endsAt} >= now()
          )
        order by ${discounts.createdAt} desc
        limit 1
      )`,
      })
      .from(products)

      /*
       * Only the default variant is used for the product card.
       */
      .innerJoin(
        productVariants,
        and(
          eq(productVariants.productId, products.id),
          eq(productVariants.isDefault, true),
        ),
      )

      .leftJoin(brands, eq(brands.id, products.brandId))

      .where(and(...filters))

      .limit(limit)
      .offset(offset),
    db
      .select({ count: count(products.id) })
      .from(products)
      .innerJoin(
        productVariants,
        and(
          eq(productVariants.productId, products.id),
          eq(productVariants.isDefault, true),
        ),
      )
      .leftJoin(brands, eq(brands.id, products.brandId))
      .where(and(...filters)),
  ]);

  const total = totalResult[0]?.count ?? 0;
  const totalPages = Math.ceil(total / limit);

  /*
   * Calculate final price.
   *
   * DB:
   *   price = original price
   *
   * Returned:
   *   price = final price
   *   originalPrice = original price
   */
  return {
    products: rows.map((product) => {
      const hasDiscount =
        product.discountType !== null && product.discountValue !== null;

      let finalPrice = product.price;
      let originalPrice: number | null = null;
      let discountPercentage: number | null = null;

      if (hasDiscount) {
        originalPrice = product.price;

        if (product.discountType === 'percentage') {
          finalPrice = product.price * (1 - product.discountValue! / 100);
          discountPercentage = product.discountValue;
        }

        if (product.discountType === 'fixed') {
          finalPrice = product.price - product.discountValue!;

          discountPercentage =
            product.price > 0
              ? Math.round((product.discountValue! / product.price) * 100)
              : 0;
        }

        finalPrice = Math.max(0, finalPrice);
      }

      return {
        id: product.id,
        variantId: product.variantId,
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        imageUrl: product.imageUrl,
        price: finalPrice,
        originalPrice,
        discountPercentage,
        stock: product.stock,
        availableStock: product.stock - product.reservedStock,
        ratingAverage: product.ratingAverage,
        ratingCount: product.ratingCount,
      };
    }),

    total,
    page,
    pageSize: limit,
    totalPages,
  };
}

export type ShopProductList = Awaited<ReturnType<typeof getShopProducts>>;

export type ShopProductListItem = ShopProductList['products'][number];
