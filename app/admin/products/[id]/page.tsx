import { DataTable } from '../../_components/data-table/DataTable';

import { getProductVariants } from '@/db/queries/products/variants';
import { VariantColumns } from '@/config/admin/product-variants.config';

type PageProps = {
  params: Promise<{ id: string }>;
};

const ProductVariants = async ({ params }: PageProps) => {
  const { id } = await params;
  const productVariants = await getProductVariants(id);
  return (
    <div>
      <DataTable
        data={productVariants}
        columns={VariantColumns}
        getRowId={(variant) => variant.id}
      />
    </div>
  );
};

export default ProductVariants;
