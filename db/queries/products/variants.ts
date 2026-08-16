import { db } from '@/db';
import { productVariants } from '@/db/schema';

import { eq, sql } from 'drizzle-orm';

export async function getProductVariants(productId: string) {
  return db
    .select({
      variantId: productVariants.id,
      productId: productVariants.productId,
      variantName: productVariants.variantName,
      sku: productVariants.sku,
      ean: productVariants.ean,
      price: productVariants.price,
      stock: productVariants.stock,
      reservedStock: productVariants.reservedStock,
      active: productVariants.active,
      isDefault: productVariants.isDefault,
      deletedAt: productVariants.deletedAt,
      sortOrder: productVariants.sortOrder,
    })
    .from(productVariants)
    .where(eq(productVariants.productId, productId))
    .orderBy(
      sql`${productVariants.deletedAt} IS NOT NULL`,
      productVariants.variantName,
    );
}

export type VariantListItems = Awaited<
  ReturnType<typeof getProductVariants>
>[number];

// Get Product Variant Attributes

export const getVariantById = async (variantId: string) => {
  const [variant] = await db
    .select({
      variantId: productVariants.id,
      productId: productVariants.productId,
      variantName: productVariants.variantName,
      sku: productVariants.sku,
      ean: productVariants.ean,
      price: productVariants.price,
      stock: productVariants.stock,
      reservedStock: productVariants.reservedStock,
      active: productVariants.active,
      isDefault: productVariants.isDefault,
      sortOrder: productVariants.sortOrder,
    })
    .from(productVariants)
    .where(eq(productVariants.id, variantId));

  return variant;
};

export type ProductVariant = Awaited<ReturnType<typeof getVariantById>>;
