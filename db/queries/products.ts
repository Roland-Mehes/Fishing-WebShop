import { db } from '@/db';
import {
  products,
  brands,
  productImages,
  productVariants,
  categories,
} from '@/db/schema';
import { eq, count } from 'drizzle-orm';

export async function getProducts() {
  return db
    .select({
      id: products.id,
      name: products.name,
      createdAt: products.createdAt,
      brandName: brands.name,
      imageUrl: productImages.imageUrl,
      price: productVariants.price,
      ean: productVariants.ean,
      sku: productVariants.sku,
      stock: productVariants.stock,
      category: categories.name,
      active: products.active,
    })
    .from(products)
    .leftJoin(brands, eq(products.brandId, brands.id))
    .leftJoin(productImages, eq(productImages.productId, products.id))
    .leftJoin(productVariants, eq(productVariants.productId, products.id))
    .leftJoin(categories, eq(categories.id, products.categoryId));
}

export type ProductRow = Awaited<ReturnType<typeof getProducts>>[number];

// admin táblázat
export async function getProductsTable() {
  return db.query.products.findMany({
    with: {
      brand: true,
      category: true,
      images: {
        limit: 1,
      },
      variants: {
        limit: 1,
      },
    },
  });
}

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

// storefront category page
export function getProductsByCategory(categorySlug: string) {
  console.log(categorySlug);
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

export async function getActiveProductsCount() {
  const result = await db
    .select({
      count: count(),
    })
    .from(products)
    .where(eq(products.active, true));

  return result[0].count;
}
