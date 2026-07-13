'use server';
import { db } from '@/db';
import { brands } from '@/db/schema';
import { eq } from 'drizzle-orm';

import { revalidatePath } from 'next/cache';

export async function deleteBrand(id: string) {
  await db
    .update(brands)
    .set({ deletedAt: new Date() })
    .where(eq(brands.id, id));

  revalidatePath('/admin/brands');

  return {
    succes: true,
  };
}
