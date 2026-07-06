import { getProductForEdit } from '@/db/queries/products';
import AdminBreadcrumbs from '../../components/AdminBreadcrumbs';

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
    </div>
  );
};

export default page;
