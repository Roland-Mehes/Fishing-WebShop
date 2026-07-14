import { db } from '@/db';
import { productVariants } from '@/db/schema';

import { eq } from 'drizzle-orm';

export async function getProductVariants(productId: string) {
  return db
    .select({
      id: productVariants.id,
      variantName: productVariants.variantName,
      sku: productVariants.sku,
      ean: productVariants.ean,
      price: productVariants.price,
      stock: productVariants.stock,
      reservedStock: productVariants.reservedStock,
      active: productVariants.active,
      isDefault: productVariants.isDefault,
    })
    .from(productVariants)
    .where(eq(productVariants.productId, productId));
}

export type VariantListItems = Awaited<
  ReturnType<typeof getProductVariants>
>[number];
