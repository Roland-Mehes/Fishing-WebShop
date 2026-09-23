import { DataTable } from '../../_components/data-table/DataTable';
import { getProductVariants } from '@/db/queries/products/variants';
import { VariantColumns } from '@/config/admin/product-variants.config';
import { getProductById } from '@/db/queries/products/list';

type PageProps = {
  params: Promise<{ productId: string }>;
};

const ProductVariantsPage = async ({ params }: PageProps) => {
  const { productId } = await params;

  const variants = await getProductVariants(productId);
  const product = await getProductById(productId);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{product.name} ezaz</h1>

      <p className="text-muted-foreground ">{variants.length} variante</p>
      <DataTable
        data={variants}
        columns={VariantColumns}
        getRowId={(variant) => variant.variantId}
        getRowClassName={(variant) =>
          variant.deletedAt ? 'bg-muted/40 opacity-50' : undefined
        }
      />
    </div>
  );
};

export default ProductVariantsPage;
