import { eq, max } from 'drizzle-orm';

import { db } from '@/db';
import { productImages } from '@/db/schema';
import { uploadImage } from '@/lib/storage/upload-image';

export async function uploadProductImages(productId: string, files: File[]) {
  const currentMax = await db
    .select({
      maxSortOrder: max(productImages.sortOrder),
    })
    .from(productImages)
    .where(eq(productImages.productId, productId));

  const startOrder = currentMax[0]?.maxSortOrder ?? -1;

  const values = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const { key } = await uploadImage(file, `products/${productId}`);

    values.push({
      productId,
      imageKey: key,
      sortOrder: startOrder + i + 1,
      isPrimary: startOrder === -1 && i === 0,
    });
  }

  if (values.length > 0) {
    await db.insert(productImages).values(values);
  }

  return { success: true };
}
