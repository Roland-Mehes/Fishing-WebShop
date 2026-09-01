import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';

import { formatCurrency } from '@/lib/formatters/currency';
import { getImageUrl } from '@/lib/storage/get-image';

type SearchProductItemProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
    price: number;
  };
  onSelect: () => void;
};

const SearchProductItem = ({ product, onSelect }: SearchProductItemProps) => {
  return (
    <Link
      href={`/products/${product.slug}`}
      onClick={onSelect}
      className="
        flex
        items-center
        gap-3
        px-4
        py-2.5
        transition-colors
        hover:bg-muted
      "
    >
      <div
        className="
          relative
          h-12
          w-12
          shrink-0
          overflow-hidden
          rounded-md
          border
          border-border
          bg-muted
        "
      >
        <Image
          src={getImageUrl(product.imageUrl) ?? '/placeholder.png'}
          alt={product.name}
          fill
          sizes="48px"
          className="object-cover"
          onError={(event) => {
            event.currentTarget.src = '/placeholder.png';
          }}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{product.name}</p>

        <p className="mt-0.5 text-sm text-muted-foreground">
          {formatCurrency(product.price)}
        </p>
      </div>
    </Link>
  );
};

export default SearchProductItem;
