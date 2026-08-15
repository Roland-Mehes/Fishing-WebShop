'use client';

import { createProductAction } from '@/actions/products/create-product-action';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SelectOption } from '@/types/ui';

type ProductFormProps = {
  brands: SelectOption[];
  categories: SelectOption[];
};

export default function AddNewProductForm({
  brands,
  categories,
}: ProductFormProps) {
  return (
    <form action={createProductAction}>
      <div className="space-y-6">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <h2 className="font-semibold">Product Information</h2>

            <div>
              <label>Nume</label>

              <Input name="name" required />
            </div>

            <div>
              <label>Producator</label>

              <select
                name="brandId"
                required
                className="w-full rounded-md border px-3 py-2 bg-muted"
              >
                <option value="">Selecteaza Producator</option>

                {brands.map((brand) => (
                  <option key={brand.value} value={brand.value}>
                    {brand.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Categorie</label>

              <select
                name="categoryId"
                required
                className="w-full rounded-md border px-3 py-2 bg-muted"
              >
                <option value="">Selecteaza Categoria</option>

                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 pt-6">
            <h2 className="font-semibold">Default Variant</h2>

            <div>
              <label>SKU</label>

              <Input name="sku" required />
            </div>

            <div>
              <label>EAN</label>

              <Input name="ean" />
            </div>

            <div>
              <label>Pret (RON)</label>

              <Input type="number" step="0.01" name="price" required />
            </div>

            <div>
              <label>Stoc</label>

              <Input type="number" name="stock" required />
            </div>
          </CardContent>
        </Card>

        <Button type="submit">Save Product</Button>
      </div>
    </form>
  );
}
