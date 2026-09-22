'use server';

import { db } from '@/db';
import { productImages, products } from '@/db/schema';
import { uploadImage } from '@/lib/storage/upload-image';
import { eq, max } from 'drizzle-orm';

export async function uploadProductImages(formData: FormData) {
  try {
    const productId = formData.get('productId');

    if (typeof productId !== 'string' || !productId) {
      return {
        success: false,
        error: 'Produsul nu a fost identificat.',
      };
    }

    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
      columns: {
        id: true,
      },
    });

    if (!product) {
      return {
        success: false,
        error: 'Produsul nu exista.',
      };
    }

    const files = formData
      .getAll('images')
      .filter((value): value is File => value instanceof File);

    if (!files.length) {
      return {
        success: false,
        error: 'Nu a fost selectata nicio imagine.',
      };
    }

    const existingImages = await db
      .select({
        sortOrder: max(productImages.sortOrder),
      })
      .from(productImages)
      .where(eq(productImages.productId, productId));

    const currentMaxSortOrder = existingImages[0]?.sortOrder ?? -1;

    const uploadedImages = [];

    for (const [index, file] of files.entries()) {
      if (!file.type.startsWith('image/')) {
        continue;
      }

      const { key } = await uploadImage(file, `products/${productId}`);

      uploadedImages.push({
        productId,
        imageKey: key,
        alt: null,
        sortOrder: currentMaxSortOrder + index + 1,
        isPrimary: currentMaxSortOrder === -1 && index === 0,
      });
    }

    if (!uploadedImages.length) {
      return {
        success: false,
        error: 'Nu au fost gasite imagini valide.',
      };
    }

    await db.insert(productImages).values(uploadedImages);

    return {
      success: true,
    };
  } catch (error) {
    console.error('UPLOAD_PRODUCT_IMAGES_ERROR', error);

    return {
      success: false,
      error: 'Imaginile nu au putut fi incarcate.',
    };
  }
}
