import { db } from '@/db';
import { products } from '@/db/schema';

type CreateProductMutationInput = {
  name: string;
  slug: string;
  brandId: string;
  categoryId: string;
  active: boolean;
};

export async function createProductMutation(data: CreateProductMutationInput) {
  const [product] = await db.insert(products).values(data).returning();

  return product;
}
