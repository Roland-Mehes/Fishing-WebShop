'use server';

import { revalidatePath } from 'next/cache';

import { updateVariantWithDiscount } from '@/db/mutations/products/variants/update-with-discount';

import {
  UpdateVariantWithDiscountSchema,
  type UpdateVariantWithDiscountInput,
} from '@/lib/validation/products/product-variants-schema';

export async function updateVariantAction(
  data: UpdateVariantWithDiscountInput,
) {
  const validated = UpdateVariantWithDiscountSchema.parse(data);

  await updateVariantWithDiscount(validated);

  revalidatePath(`/admin/products/${validated.productId}`);

  return {
    success: true,
  };
}
