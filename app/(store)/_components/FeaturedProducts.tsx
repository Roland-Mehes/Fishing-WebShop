// ... existing code ..
import { getShopProducts } from '@/db/queries/products/shop';
import Image from 'next/image';

export async function FeaturedProducts() {
  const productsWithDiscounts = await getShopProducts({
    onSale: true,
    pageSize: 5,
  });

  if (productsWithDiscounts.length === 0) return 'Nincs Promo';

  return (
    <section className=" mx-auto py-16">
      <div className="container max-w-7xl  mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Promotions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsWithDiscounts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
}: {
  product: Awaited<ReturnType<typeof getShopProducts>>[number];
}) {
  return (
    <div className="group relative rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image */}
      <Image
        height={256}
        width={256}
        src={product.imageUrl || '/placeholder.png'}
        alt={product.name}
        className="w-full h-64 object-cover"
      />

      {/* Content */}
      <div className="p-4 bg-card">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>

        {product.discountPercentage && (
          <span className="inline-block bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold mb-2">
            -{product.discountPercentage}%
          </span>
        )}

        <div className="flex items-center justify-between mt-3">
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              {product.originalPrice.toFixed(2)}€
            </span>
          )}
          <span className="font-bold text-lg">
            {product.price.toFixed(2)} RON
          </span>
        </div>

        {product.stock > 0 && (
          <p className="text-green-600 text-sm mt-1">In Stock</p>
        )}
      </div>
    </div>
  );
}
