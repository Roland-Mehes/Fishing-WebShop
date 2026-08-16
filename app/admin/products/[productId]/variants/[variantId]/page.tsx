import { getVariantById } from '@/db/queries/products/variants';
import EditVariantForm from '../../../_components/EditVariantForm';
import { toast } from 'sonner';

type PageProps = {
  params: Promise<{ variantId: string; productId: string }>;
};

const ProductVariantPage = async ({ params }: PageProps) => {
  const { variantId } = await params;

  const variant = await getVariantById(variantId);

  if (!variant) {
    toast.error('Varianta nu era gasita!');
    throw new Error('Variant not found');
  }

  return (
    <div>
      <EditVariantForm variant={variant} />
    </div>
  );
};

export default ProductVariantPage;
