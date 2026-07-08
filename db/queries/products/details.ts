import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { products } from '@/db/schema';

export async function getProductForEdit(id: string) {
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      brand: true,
      category: true,
      images: true,

      variants: {
        with: {
          discounts: true,
          variantAttributes: {
            with: {
              attribute: true,
            },
          },
        },
      },

      attributes: {
        with: {
          attribute: true,
        },
      },
    },
  });
}

export async function getProductBySlug(slug: string) {
  return db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: {
      brand: true,
      category: true,
      images: true,

      variants: {
        with: {
          discounts: true,
        },
      },

      attributes: {
        with: {
          attribute: true,
        },
      },
    },
  });
}
