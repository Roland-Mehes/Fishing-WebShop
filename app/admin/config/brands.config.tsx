import { BrandListItem } from '@/db/queries/brands/list';
import Image from 'next/image';

export const brandColumns = [
  {
    key: 'logo',
    header: 'Logo',
    render: (brand: BrandListItem) =>
      brand.brandLogoUrl
        ? // <Image
          //   src={brand.logo}
          //   alt={brand.label}
          //   className="h-10 w-10 object-contain"
          //   width={5}
          //   height={5}
          // />
          'Van logo'
        : 'Nincs Logo',
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
    render: (brand: BrandListItem) => 'edit',
  },
];
