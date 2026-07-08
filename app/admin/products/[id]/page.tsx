import { getProductForEdit } from '@/db/queries/products/details';
import AdminBreadcrumbs from '../../_components/AdminBreadcrumbs';

type PageProps = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  // product slug = ex. cralusso-method-basket
  const product = await getProductForEdit(id);

  if (!product) {
    return <div>{id} Not found!</div>;
  }

  const primaryImage = product.images.find((image) => image.isPrimary);

  return (
    <div>
      <AdminBreadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/admin/products' },
          { label: product.name },
        ]}
      />
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

export default page;
