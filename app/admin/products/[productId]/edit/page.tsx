import { notFound } from 'next/navigation';

import { getProductForEdit } from '@/db/queries/products/get-product-for-edit';
import ProductImageUpload from '@/app/admin/_components/ProductImageUpload';

type ProductEditPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

const ProductEditPage = async ({ params }: ProductEditPageProps) => {
  const { productId } = await params;

  const product = await getProductForEdit(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Produs: {product.name}</h1>
        <p className="text-sm text-muted-foreground">
          Editeaza informatiile produsului.
        </p>
      </div>

      <ProductImageUpload productId={product} />
    </div>
  );
};

export default ProductEditPage;
