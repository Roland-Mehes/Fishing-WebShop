import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { products, productImages } from '@/db/schema';

export async function getProductForEdit(productId: string) {
  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
    columns: {
      id: true,
      name: true,
    },
    with: {
      images: {
        columns: {
          id: true,
          imageKey: true,
          alt: true,
          sortOrder: true,
          isPrimary: true,
        },
      },
    },
  });

  return product;
}
