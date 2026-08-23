import { Badge } from '@/components/ui/badge';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { ShopProductListItem } from '@/db/queries/products/shop';
import { getImageUrl } from '@/lib/storage/get-image';
import { AddToCartButton } from '@/app/(store)/_components/AddToCartButton';

type ProductCardProps = {
  product: ShopProductListItem;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const imageUrl = getImageUrl(product.imageUrl);

  return (
    <Card className="w-full max-w-sm overflow-hidden pt-0 group transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
      {/* IMAGE WRAPPER */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative overflow-hidden">
          <Image
            src={imageUrl || '/placeholder.png'}
            alt={product.name}
            width={400}
            height={300}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Discount Badge */}
          {product.discountPercentage !== null && (
            <div className="absolute left-2 top-2">
              <Badge variant="sale">-{product.discountPercentage}%</Badge>
            </div>
          )}
        </div>

        <CardHeader className="space-y-2 pt-3">
          {/* Name */}
          <CardTitle className="line-clamp-2 text-base font-semibold leading-tight">
            {product.name}
          </CardTitle>

          {/* RATING */}
          <div className="flex items-center gap-1 text-sm">
            {Array.from({ length: 5 }).map((_, index) => {
              const filled = index < Math.round(product.ratingAverage);

              return (
                <Star
                  key={index}
                  size={16}
                  className={
                    filled
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  }
                />
              );
            })}

            <span className="ml-2 text-muted-foreground">
              ({product.ratingCount})
            </span>
          </div>

          {/* PRICE */}
          <div className="flex items-end gap-2">
            {product.originalPrice !== null && (
              <span className="text-sm text-muted-foreground line-through">
                {product.originalPrice.toFixed(2)} RON
              </span>
            )}

            <span className="text-xl font-bold text-primary">
              {product.price.toFixed(2)} RON
            </span>
          </div>
        </CardHeader>
      </Link>

      {/* Add to Cart */}
      <CardFooter>
        <AddToCartButton
          variantId={product.variantId}
          productId={product.id}
          name={product.name}
          slug={product.slug}
          sku={product.sku}
          price={product.price}
          image={imageUrl || '/placeholder.png'}
        />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
