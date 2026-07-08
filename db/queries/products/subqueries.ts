import { db } from '@/db';
import { productImages } from '@/db/schema';
import { sql } from 'drizzle-orm';

export const primaryImageSubquery = db
  .selectDistinctOn([productImages.productId], {
    productId: productImages.productId,
    imageUrl: productImages.imageUrl,
  })
  .from(productImages)
  .orderBy(
    productImages.productId,
    sql`${productImages.isPrimary} DESC`,
    productImages.sortOrder,
  )
  .as('primaryImage');
