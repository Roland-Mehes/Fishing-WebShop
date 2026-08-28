import { db } from '@/db';
import { productImages, productVariants } from '@/db/schema';
import { sql, count, isNull } from 'drizzle-orm';

export const primaryImageSubquery = db
  .selectDistinctOn([productImages.productId], {
    productId: productImages.productId,
    imageUrl: productImages.imageKey,
  })
  .from(productImages)
  .orderBy(
    productImages.productId,
    sql`${productImages.isPrimary} DESC`,
    productImages.sortOrder,
  )
  .as('primaryImage');

// Total Product Variant Count
export const variantsCountSubquery = db
  .select({
    productId: productVariants.productId,
    variantsCount: count(productVariants.id).as('variants_count'),
  })
  .from(productVariants)
  .where(isNull(productVariants.deletedAt))
  .groupBy(productVariants.productId)
  .as('variants_count_subquery');
