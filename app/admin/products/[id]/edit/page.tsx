import { getProductForEdit } from '@/db/queries/products';
import ProductForm from '../../_components/ProductForm';

type ProductEditProps = {
  params: Promise<{ id: string }>;
};

const ProductEdit = async ({ params }: ProductEditProps) => {
  const { id } = await params;
  const product = await getProductForEdit(id);

  return <div>{product?.brand.name}</div>;
};

export default ProductEdit;
