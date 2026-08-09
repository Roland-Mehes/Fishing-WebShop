import { DataTable } from '../../_components/data-table/DataTable';

import { getProductVariants } from '@/db/queries/products/variants';

import { VariantColumns } from '@/config/admin/product-variants.config';

type PageProps = {
  params: Promise<{ productId: string }>;
};

const ProductVariants = async ({ params }: PageProps) => {
  const { productId } = await params;

  const variants = await getProductVariants(productId);

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground ">{variants.length} variante</p>
      <DataTable
        data={variants}
        columns={VariantColumns}
        getRowId={(variant) => variant.variantId}
      />
    </div>
  );
};

export default ProductVariants;
