import EditProductForm from '../_components/EditProductForm';

import { getCategoriesSelectOptions } from '@/db/queries/categories/list';

import { getProductBrands } from '@/db/queries/brands/list';

const NewProductPage = async () => {
  const brands = await getProductBrands();
  const categories = await getCategoriesSelectOptions();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Adauga Produs</h1>

        <p className="text-muted-foreground">Creeaza un produs nou</p>
      </div>

      <EditProductForm brands={brands} categories={categories} />
    </>
  );
};

export default NewProductPage;
