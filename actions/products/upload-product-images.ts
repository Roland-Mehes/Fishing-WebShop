'use server';

import { uploadProductImages } from '@/db/mutations/products/images';

export async function uploadProductImagesAction(formData: FormData) {
  const productId = formData.get('productId');

  if (typeof productId !== 'string' || !productId) {
    return {
      success: false,
      error: 'Hiányzik a termék azonosítója.',
    };
  }

  const files = formData
    .getAll('images')
    .filter((value): value is File => value instanceof File);

  if (files.length === 0) {
    return {
      success: false,
      error: 'Nincs kiválasztott kép.',
    };
  }

  try {
    await uploadProductImages(productId, files);

    return {
      success: true,
    };
  } catch (error) {
    console.error('Product image upload failed:', error);

    return {
      success: false,
      error: 'A képek feltöltése sikertelen.',
    };
  }
}
