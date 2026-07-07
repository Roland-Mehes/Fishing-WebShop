import { TableColumn } from '@/app/admin/_components/data-table/types';
import { brands } from '@/db/schema';

import Image from 'next/image';

type BrandRow = typeof brands.$inferInsert;

export const brandColumns: TableColumn<BrandRow>[] = [
  {
    key: 'logo',
    header: 'Logo',
    render: (brand) =>
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
    key: 'label',
    header: 'Name',
    render: (brand) => brand.name,
  },
];
