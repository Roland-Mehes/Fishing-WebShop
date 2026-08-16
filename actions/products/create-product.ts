'use server';

import { generateSlug } from '@/lib/generateSlug';
import { eq } from 'drizzle-orm';

import { products } from '@/db/schema';
import { db } from '@/db';

import { createProductMutation } from '@/db/mutations/products/create';
import { CreateProductFormData } from '@/lib/validation/products/create-product-schema';

export const createProduct = async (data: CreateProductFormData) => {
  const slug = await generateUniqueProductSlug(data.name);

  return createProductMutation({
    name: data.name,
    slug,
    brandId: data.brandId,
    categoryId: data.categoryId,
    active: true,
  });
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
