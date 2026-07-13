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
        <Image
          src={getImageUrl(brand.brandLogoUrl)!}
          alt={brand.name}
          className="h-10 w-15 object-contain"
          width={10}
          height={10}
        />
      ) : (
        'Fara Logo'
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
