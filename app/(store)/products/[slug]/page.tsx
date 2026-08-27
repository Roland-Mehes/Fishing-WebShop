import { getProductBySlug } from '@/db/queries/products/details';

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const currentProduct = await getProductBySlug(slug);

  return (
    <div>
      <p>{currentProduct?.name}</p>
      <p>{currentProduct?.images[0].imageKey}</p>
      <p>{currentProduct?.description}</p>
      <p>{currentProduct?.ratingAverage}</p>
    </div>
  );
};

export default ProductPage;
