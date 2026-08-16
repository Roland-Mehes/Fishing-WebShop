import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { products } from '@/db/schema';

import type { UpdateProductInput } from '@/lib/validation/products/update-product-schema';

export async function updateProduct(data: UpdateProductInput) {
  await db
    .update(products)
    .set({
      name: data.name,
      categoryId: data.categoryId,
      active: data.active,
      updatedAt: new Date(),
    })
    .where(eq(products.id, data.productId));

  return {
    success: true,
  };
}
