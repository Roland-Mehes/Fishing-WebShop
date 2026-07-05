import { DataTable } from '../../data-table/DataTable';

import { getProducts } from '@/db/queries/products';

import { productColumns } from '@/app/admin/config/PRODUCTS';

export default async function ProductTable() {
  const products = await getProducts();

  return (
    <DataTable
      data={products}
      columns={productColumns}
      getRowId={(p) => p.id}
    />
  );
}
