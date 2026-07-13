import { db } from '@/db';
import { brands, products } from '@/db/schema';
import { and, ilike, count, eq } from 'drizzle-orm';
import { isNull } from 'drizzle-orm';

export async function getBrandsList({ search }: { search?: string }) {
  const filters = [isNull(brands.deletedAt)];

  if (search?.trim()) {
    filters.push(ilike(brands.name, `%${search}%`));
  }

  return await db
    .select({
      id: brands.id,
      name: brands.name,
      slug: brands.slug,
      brandLogoUrl: brands.logoKey,
      createdAt: brands.createdAt,
      deletedAt: brands.deletedAt,
      productCount: count(products.id),
    })
    .from(brands)
    .leftJoin(products, eq(products.brandId, brands.id))
    .where(filters.length ? and(...filters) : undefined)
    .groupBy(
      brands.id,
      brands.name,
      brands.slug,
      brands.logoKey,
      brands.createdAt,
      brands.deletedAt,
    );
}

export type BrandListItem = Awaited<ReturnType<typeof getBrandsList>>[number];

export async function getProductBrands() {
  const brandsList = await db.query.brands.findMany();

  return brandsList.map((brand) => ({
    id: brand.id,
    label: brand.name,
    value: brand.id,
    logo: brand.logoKey,
  }));
}

export async function getBrandSelectOptions() {
  const brandsList = await db.query.brands.findMany();

  return brandsList.map((brand) => ({
    label: brand.name,
    value: brand.id,
  }));
}
