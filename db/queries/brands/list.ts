import { db } from '@/db';
import { brands, products } from '@/db/schema';
import { and, ilike, count, eq, isNull, isNotNull, sql } from 'drizzle-orm';

type GetBrandsListParams = {
  search?: string;
};

export async function getBrandsList({ search }: GetBrandsListParams) {
  const filters = [];

  const searchValue = search?.trim();

  if (searchValue) {
    filters.push(ilike(brands.name, `%${searchValue}%`));
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
    )
    .orderBy(sql`${brands.deletedAt} IS NOT NULL`, brands.name);
}

export type BrandListItem = Awaited<ReturnType<typeof getBrandsList>>[number];

export async function getProductBrands() {
  const brandsList = await db.query.brands.findMany({
    where: isNull(brands.deletedAt),
  });

  return brandsList.map((brand) => ({
    id: brand.id,
    label: brand.name,
    value: brand.id,
    logo: brand.logoKey,
  }));
}

export async function getBrandSelectOptions() {
  const brandsList = await db.query.brands.findMany({
    where: isNull(brands.deletedAt),
  });

  return brandsList.map((brand) => ({
    label: brand.name,
    value: brand.id,
  }));
}

export async function getBrandsStats() {
  const [totalResult, activeResult, deletedResult] = await Promise.all([
    db
      .select({
        count: count(),
      })
      .from(brands),

    db
      .select({
        count: count(),
      })
      .from(brands)
      .where(isNull(brands.deletedAt)),

    db
      .select({
        count: count(),
      })
      .from(brands)
      .where(isNotNull(brands.deletedAt)),
  ]);

  return {
    total: totalResult[0]?.count ?? 0,
    active: activeResult[0]?.count ?? 0,
    deleted: deletedResult[0]?.count ?? 0,
  };
}
