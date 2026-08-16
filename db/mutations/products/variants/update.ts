import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { productVariants } from '@/db/schema';

import { type UpdateVariantInput } from '@/lib/validation/products/product-variants-schema';

export async function updateVariant(data: UpdateVariantInput) {
  await db
    .update(productVariants)
    .set({
      variantName: data.variantName,
      sku: data.sku,
      ean: data.ean,
      price: data.price,
      stock: data.stock,
      reservedStock: data.reservedStock,
      active: data.active,
      isDefault: data.isDefault,
      updatedAt: new Date(),
    })
    .where(eq(productVariants.id, data.variantId));

  return {
    success: true,
  };
}
