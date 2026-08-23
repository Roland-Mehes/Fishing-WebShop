import { db } from '@/db';

export async function getCategoriesSelectOptions() {
  const categoriesList = await db.query.categories.findMany();

  return categoriesList.map((category) => ({
    label: category.name,
    value: category.id,
    image: category.imageKey,
  }));
}
