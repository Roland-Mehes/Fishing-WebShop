import { getShopProducts } from '@/db/queries/products/shop';
import ProductCard from './product/ProductCard';

export async function FeaturedProducts() {
  const products = await getShopProducts({
    onSale: true,
    pageSize: 5,
  });

  if (products.products.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Promoții recomandate
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
