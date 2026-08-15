'use server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { generateSlug } from '@/lib/generateSlug';
import { eq } from 'drizzle-orm';
import { CreateProductFormData } from '@/lib/validation/products/create-product-schema';

export const createProduct = async (data: CreateProductFormData) => {
  const slug = await generateUniqueProductSlug(data.name);

  const [product] = await db
    .insert(products)
    .values({
      name: data.name,
      slug,
      brandId: data.brandId,
      categoryId: data.categoryId,
      active: true,
    })
    .returning();

  return product;
};

const generateUniqueProductSlug = async (name: string) => {
  const baseSlug = generateSlug(name);

  let slug = baseSlug;
  let counter = 2;

  while (true) {
    const existing = await db.query.products.findFirst({
      where: eq(products.slug, slug),
    });

    if (!existing) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};
