import { db } from '@/db';
import {
  products,
  brands,
  productImages,
  productVariants,
  categories,
} from '@/db/schema';
import { eq, count, and, ilike, or, sql } from 'drizzle-orm';
import { DEFAULT_PAGE_SIZE } from '@/lib/pagination';

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

const primaryImageSubquery = db
  .selectDistinctOn([productImages.productId], {
    productId: productImages.productId,
    imageUrl: productImages.imageUrl,
  })
  .from(productImages)
  .orderBy(
    productImages.productId,
    sql`${productImages.isPrimary} DESC`,
    productImages.sortOrder,
  )
  .as('primaryImage');

export type ProductListItem = Awaited<
  ReturnType<typeof getProductsList>
>[number];

function buildProductFilters({
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

// admin táblázat

// admin edit page
export async function getProductForEdit(id: string) {
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      brand: true,
      category: true,
      images: true,

      variants: {
        with: {
          discounts: true,
          variantAttributes: {
            with: {
              attribute: true,
            },
          },
        },
      },

      attributes: {
        with: {
          attribute: true,
        },
      },
    },
  });
}

//

export async function getProductsByCategory() {
  const categoriesList = await db.query.categories.findMany();

  return categoriesList.map((category) => ({
    label: category.name,
    value: category.id,
  }));
}

//

export async function getProductBrands() {
  const brandsList = await db.query.brands.findMany();

  return brandsList.map((brand) => ({
    id: brand.id,
    label: brand.name,
    value: brand.id,
    logo: brand.brandLogoUrl,
  }));
}

export async function getBrandsList({ search }: { search?: string }) {
  const filters = [];

  if (search?.trim()) {
    filters.push(ilike(brands.name, `%${search}%`));
  }

  return db.query.brands.findMany({
    where: filters.length ? and(...filters) : undefined,
  });
}

//Customer product page

export async function getProductBySlug(slug: string) {
  return db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: {
      brand: true,
      category: true,
      images: true,

      variants: {
        with: {
          discounts: true,
        },
      },

      attributes: {
        with: {
          attribute: true,
        },
      },
    },
  });
}
