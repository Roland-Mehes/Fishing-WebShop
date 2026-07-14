import { getProductForEdit } from '@/db/queries/products/details';

type PageProps = {
  params: Promise<{ id: string }>;
};

const ProductVariants = async ({ params }: PageProps) => {
  const { id } = await params;

  // product slug = ex. cralusso-method-basket
  const product = await getProductForEdit(id);

  if (!product) {
    return <div>{id} Not found!</div>;
  }

  const primaryImage = product.images.find((image) => image.isPrimary);

  return (
    <div>
      <h1>{product.name}</h1>

      <p>Brand: {product.brand?.name}</p>
      <p>Category: {product.category?.name}</p>

      {/* {primaryImage?.imageUrl} */}

      {product.images.map((image, idx) => (
        <p key={idx}>{image.imageUrl}</p>
      ))}
    </div>
  );
};

export default ProductVariants;
