import { DataTable } from '../../_components/data-table/DataTable';
import { getBrandsList } from '@/db/queries/brands/list';
import { brandColumns } from '@/config/admin/brands.config';

export default async function BrandTable({ search }: { search?: string }) {
  const brands = await getBrandsList({ search });

  return (
    <DataTable
      data={brands}
      columns={brandColumns}
      getRowId={(brand) => brand.id}
    />
  );
}
