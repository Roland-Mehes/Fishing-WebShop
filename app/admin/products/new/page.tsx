import AdminBreadcrumbs from '@/app/admin/_components/AdminBreadcrumbs';

import ProductForm from '../_components/ProductForm';

import { getProductBrands, getProductsByCategory } from '@/db/queries/products';

const NewProductPage = async () => {
  const brands = await getProductBrands();
  const categories = await getProductsByCategory();

  return (
    <>
      <AdminBreadcrumbs
        breadcrumbs={[
          {
            label: 'Products',
            href: '/admin/products',
          },
          {
            label: 'New Product',
          },
        ]}
      />

      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Add Product</h1>

        <p className="text-muted-foreground">Create a new product</p>
      </div>

      <ProductForm brands={brands} categories={categories} />
    </>
  );
};

export default NewProductPage;
