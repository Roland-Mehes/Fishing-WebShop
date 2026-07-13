import ProductForm from '../_components/ProductForm';

import { getCategoriesSelectOptions } from '@/db/queries/categories/list';

import { getProductBrands } from '@/db/queries/brands/list';

const NewProductPage = async () => {
  const brands = await getProductBrands();
  const categories = await getCategoriesSelectOptions();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Add Product</h1>

        <p className="text-muted-foreground">Create a new product</p>
      </div>

      <ProductForm brands={brands} categories={categories} />
    </>
  );
};

export default NewProductPage;
