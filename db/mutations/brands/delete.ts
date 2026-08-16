'use server';
import { db } from '@/db';
import { brands } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function deleteBrandMutation(id: string) {
  await db
    .update(brands)
    .set({ deletedAt: new Date() })
    .where(eq(brands.id, id));

  return {
    success: true,
  };
}
