type ProductEditPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

const ProductEditPage = async ({ params }: ProductEditPageProps) => {
  const { productId } = await params;

  return <div>{productId}</div>;
};

export default ProductEditPage;
