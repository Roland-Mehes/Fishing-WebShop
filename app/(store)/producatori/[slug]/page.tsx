import { notFound } from 'next/navigation';

import ProductCard from '@/app/(store)/_components/product/ProductCard';
import { getBrandBySlug } from '@/db/queries/brands/list';
import { getShopProducts } from '@/db/queries/products/shop';
import Pagination from '../../_components/Pagination';

type BrandPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function BrandPage({
  params,
  searchParams,
}: BrandPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;

  const currentPage = Math.max(1, Number(page) || 1);

  const brand = await getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const result = await getShopProducts({
    page: currentPage,
    pageSize: 1,
    brandSlug: slug,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-12">
      <section>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{brand.name}</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {result.total} {result.total > 1 ? 'produse' : 'produs'}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {result.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <Pagination currentPage={result.page} totalPages={result.totalPages} />
    </main>
  );
}
