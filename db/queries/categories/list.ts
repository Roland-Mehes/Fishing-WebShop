import { db } from '@/db';
import { categories } from '@/db/schema';
import { eq, asc, and, isNull } from 'drizzle-orm';

export async function getCategoriesSelectOptions() {
  const categoriesList = await db
    .select({
      id: categories.id,
      name: categories.name,
      imageKey: categories.imageKey,
    })
    .from(categories)
    .where(isNull(categories.deletedAt))
    .orderBy(asc(categories.name));

  return categoriesList.map((category) => ({
    label: category.name,
    value: category.id,
    image: category.imageKey,
  }));
}

export async function getFeaturedCategories() {
  return db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      imageKey: categories.imageKey,
    })
    .from(categories)
    .where(
      and(
        eq(categories.isFeatured, true),
        isNull(categories.parentId),
        isNull(categories.deletedAt),
      ),
    )
    .orderBy(asc(categories.sortOrder), asc(categories.name));
}
