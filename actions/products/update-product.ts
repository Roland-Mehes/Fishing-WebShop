'use server';

import { revalidatePath } from 'next/cache';

import { updateProduct } from '@/db/mutations/products/update-product';

import { updateProductSchema } from '@/lib/validation/products/update-product-schema';

export async function updateProductAction(formData: FormData) {
  const parsed = updateProductSchema.safeParse({
    productId: formData.get('productId'),
    name: formData.get('name'),
    categoryId: formData.get('categoryId'),
    active: formData.get('active'),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message);
  }

  await updateProduct(parsed.data);

  revalidatePath(`/admin/products/${parsed.data.productId}`);
  revalidatePath(`/admin/products/${parsed.data.productId}/edit`);
}
