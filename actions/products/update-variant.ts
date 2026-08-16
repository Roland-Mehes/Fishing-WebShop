'use server';

import { revalidatePath } from 'next/cache';

import { updateVariant } from '@/db/mutations/products/variants/update';

import {
  UpdateVariantSchema,
  type UpdateVariantInput,
} from '@/lib/validation/products/product-variants-schema';

export async function updateVariantAction(data: UpdateVariantInput) {
  const validated = UpdateVariantSchema.parse(data);

  await updateVariant(validated);

  revalidatePath(`/admin/products/${validated.productId}`);

  return {
    success: true,
  };
}
