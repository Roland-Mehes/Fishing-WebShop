import { db } from '@/db';
import { brands } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const restoreBrandMutation = async (brandId: string) => {
  const [brand] = await db
    .update(brands)
    .set({ deletedAt: null, updatedAt: new Date() })
    .where(eq(brands.id, brandId))
    .returning({ id: brands.id });

  return brand;
};
