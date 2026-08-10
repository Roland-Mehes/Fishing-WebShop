import { BrandListItem } from '@/db/queries/brands/list';
import { getImageUrl } from '@/lib/storage/get-image';
import Image from 'next/image';
import { BrandActions } from '../../app/admin/brands/_components/brand-actions';

export const brandColumns = [
  {
    key: 'logo',
    header: 'Logo',
    render: (brand: BrandListItem) =>
      brand.brandLogoUrl ? (
        <div className="flex h-10 w-15 items-center justify-center">
          <Image
            src={getImageUrl(brand.brandLogoUrl)!}
            alt={brand.name}
            width={120}
            height={80}
            sizes="60px"
            className="max-h-10 max-w-15 object-contain"
            unoptimized
          />
        </div>
      ) : (
        <div className="flex h-10 w-15 items-center justify-center">
          <span className="text-sm text-muted-foreground">Fara Logo</span>
        </div>
      ),
  },
  {
    key: 'brand',
    header: 'Brand',
    render: (brand: BrandListItem) => brand.name,
  },

  {
    key: 'products',
    header: 'Products',
    render: (brand: BrandListItem) => brand.productCount,
  },

  {
    key: 'actions',
    header: 'Actions',
    render: (brand: BrandListItem) => <BrandActions brandId={brand.id} />,
  },
];
