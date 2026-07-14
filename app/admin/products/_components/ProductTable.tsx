import { DataTable } from '../../_components/data-table/DataTable';

import { getProductsList } from '@/db/queries/products/list';

import { productColumns } from '@/config/admin/products.config';

type ProductTableProps = {
  categoryId?: string;
  brandId?: string;
  active?: boolean;
  page?: number;
  search?: string;
};

export default async function ProductTable({
  categoryId,
  brandId,
  active,
  page,
  search,
}: ProductTableProps) {
  const products = await getProductsList({
    categoryId,
    brandId,
    active,
    page,
    search,
  });

  return (
    <DataTable
      data={products}
      columns={productColumns}
      getRowId={(product) => product.id}
    />
  );
}
