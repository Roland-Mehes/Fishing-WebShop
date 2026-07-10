import { db } from '@/db';
import { brands, products } from '@/db/schema';
import { and, ilike, count, eq } from 'drizzle-orm';

export async function getBrandsList({ search }: { search?: string }) {
  const filters = [];

  if (search?.trim()) {
    filters.push(ilike(brands.name, `%${search}%`));
  }

  return await db
    .select({
      id: brands.id,
      name: brands.name,
      slug: brands.slug,
      brandLogoUrl: brands.brandLogoUrl,
      createdAt: brands.createdAt,
      productCount: count(products.id),
    })
    .from(brands)
    .leftJoin(products, eq(products.brandId, brands.id))
    .where(filters.length ? and(...filters) : undefined)
    .groupBy(
      brands.id,
      brands.name,
      brands.slug,
      brands.brandLogoUrl,
      brands.createdAt,
    );
}

export type BrandListItem = Awaited<ReturnType<typeof getBrandsList>>[number];

export async function getProductBrands() {
  const brandsList = await db.query.brands.findMany();

  return brandsList.map((brand) => ({
    id: brand.id,
    label: brand.name,
    value: brand.id,
    logo: brand.brandLogoUrl,
  }));
}

export async function getBrandSelectOptions() {
  const brandsList = await db.query.brands.findMany();

  return brandsList.map((brand) => ({
    label: brand.name,
    value: brand.id,
  }));
}

// export async function getBrandWithProductCount() {
//   return await db
//     .select({
//       id: brands.id,
//       name: brands.name,
//       slug: brands.slug,
//       logoUrl: brands.brandLogoUrl,
//       productCount: count(products.id),
//     })
//     .from(brands)
//     .leftJoin(products, eq(products.brandId, brands.id))
//     .groupBy(brands.id, brands.name, brands.slug, brands.brandLogoUrl);
// }
