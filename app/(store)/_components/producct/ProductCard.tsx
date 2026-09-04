import { Badge } from '@/components/ui/badge';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { ShopProductListItem } from '@/db/queries/products/shop';
import { getImageUrl } from '@/lib/storage/get-image';
import { AddToCartButton } from '@/app/(store)/_components/AddToCartButton';
import { formatCurrency } from '@/lib/formatters/currency';

type ProductCardProps = {
  product: ShopProductListItem;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const imageUrl = getImageUrl(product.imageUrl);

  return (
    <Card className="group overflow-hidden pt-0 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
      {/* IMAGE WRAPPER */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-4/3 overflow-hidden bg-muted/30">
          <Image
            src={imageUrl || '/placeholder.png'}
            alt={product.name}
            // width={400}
            // height={300}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
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
          <div className="flex items-center gap-1.5 text-sm">
            <Star className="size-4 fill-primary text-primary" />
            <span className="font-medium">
              {product.ratingAverage.toFixed(1)}
            </span>
            <span className="text-muted-foreground">
              ({product.ratingCount})
            </span>
          </div>

          {/* PRICE */}
          <div className="flex items-baseline gap-2">
            <span
              className={
                product.originalPrice !== null
                  ? 'text-lg font-bold text-primary'
                  : 'text-lg font-bold'
              }
            >
              {formatCurrency(product.price)}
            </span>

            {product.originalPrice !== null && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
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
