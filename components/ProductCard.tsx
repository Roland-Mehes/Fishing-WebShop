import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = () => {
  return (
    <Card className="w-full max-w-sm overflow-hidden pt-0 group transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
      {/* IMAGE WRAPPER */}
      <Link href="/">
        <div className="relative overflow-hidden">
          <Image
            src="/mulineta.jpg"
            alt="Product image"
            width={400}
            height={300}
            className="h-48  w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* BADGE */}
          <div className="absolute left-2 top-2">
            <Badge variant="sale">-50%</Badge>
          </div>
        </div>

        <CardHeader className="space-y-2 pt-3">
          <CardTitle className="text-base font-semibold leading-tight">
            Mulineta Shimano AERLEX 25 XTC 14000
          </CardTitle>

          {/* RATING */}
          <div className="flex items-center gap-1 text-sm">
            <Star size={16} className="text-primary fill-primary" />
            <Star size={16} className="text-primary fill-primary" />
            <Star size={16} className="text-primary fill-primary" />
            <Star size={16} className="text-muted-foreground" />
            <Star size={16} className="text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">(6)</span>
          </div>

          {/* PRICE */}
          <div className="flex items-end gap-2">
            <span className="text-sm text-muted-foreground line-through">
              500 RON
            </span>
            <span className="text-xl font-bold text-primary">250 RON</span>
          </div>
        </CardHeader>
      </Link>
      <CardFooter>
        <Button className="w-full group/button">
          <ShoppingCart className="mr-2 h-4 w-4 group-hover/button:translate-x-0.5 transition" />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
