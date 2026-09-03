import ProductCard from '@/components/ProductCard';
import { getShopProducts } from '@/db/queries/products/shop';
import Pagination from '../_components/Pagination';

type ProductsPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { page } = await searchParams;

  const currentPage = Math.max(1, Number(page) || 1);

  const result = await getShopProducts({
    page: currentPage,
    pageSize: 5,
  });

  return (
    <main className="max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {result.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={result.totalPages} />
    </main>
  );
}
