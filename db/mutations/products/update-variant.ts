import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { productVariants } from '@/db/schema';

import {
  UpdateVariantSchema,
  type UpdateVariantInput,
} from '@/lib/validation/products/product-variants-schema';

export async function updateVariant(data: UpdateVariantInput) {
  const validated = UpdateVariantSchema.parse(data);

  await db
    .update(productVariants)
    .set({
      variantName: validated.variantName,
      sku: validated.sku,
      ean: validated.ean,
      price: validated.price,
      stock: validated.stock,
      reservedStock: validated.reservedStock,
      active: validated.active,
      isDefault: validated.isDefault,
      updatedAt: new Date(),
    })
    .where(eq(productVariants.id, validated.variantId));

  return {
    success: true,
  };
}
