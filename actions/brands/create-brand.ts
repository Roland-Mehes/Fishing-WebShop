'use server';

import slugify from 'slugify';
import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db';
import { brands } from '@/db/schema';

import { uploadImage } from '@/lib/storage/upload-image';
import { createBrandSchema } from '@/lib/validation/brands/brand-schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function createBrand(formData: FormData) {
  const isAdmin = await auth.api.getSession({ headers: await headers() });

  if (isAdmin?.user.role !== 'super_admin') {
    throw new Error('Unauthorized');
  }

  const validatedFields = createBrandSchema.safeParse({
    name: formData.get('name'),
    logoKey: formData.get('image'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name } = validatedFields.data;

  const slug = slugify(name, {
    lower: true,
    strict: true,
    trim: true,
  });

  const existingBrand = await db.query.brands.findFirst({
    where: and(eq(brands.slug, slug), isNull(brands.deletedAt)),
  });

  if (existingBrand) {
    return {
      success: false,
      error: 'A brand with this name already exists.',
    };
  }

  let logoKey: string | null = null;

  const image = formData.get('image');

  if (image instanceof File && image.size > 0) {
    const uploaded = await uploadImage(image, 'brands');

    logoKey = uploaded.key;
  }

  const [brand] = await db
    .insert(brands)
    .values({
      name,
      slug,
      logoKey,
    })
    .returning();

  return {
    success: true,
    data: brand,
  };
}
