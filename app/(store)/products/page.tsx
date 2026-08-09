import ProductCard from '@/components/ProductCard';
import { getShopProducts } from '@/db/queries/products/shop';

export default async function ProductsPage() {
  const products = await getShopProducts({
    page: 1,
    pageSize: 20,
  });

  return (
    <main className="max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

//  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 md:p-10"></div>
