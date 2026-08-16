'use client';

import { createProductAction } from '@/actions/products/create-product-action';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectOption } from '@/types/ui';

type ProductFormProps = {
  brands: SelectOption[];
  categories: SelectOption[];
};

export default function EditProductForm({
  brands,
  categories,
}: ProductFormProps) {
  return (
    <form action={createProductAction}>
      <div className="space-y-6">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <h2 className="font-semibold">Product Information</h2>

            <div className="space-y-2">
              <Label htmlFor="name">Nume</Label>

              <Input id="name" name="name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandId">Producător</Label>

              <select
                id="brandId"
                name="brandId"
                required
                className="w-full rounded-md border bg-muted px-3 py-2"
              >
                <option value="">Selectează producător</option>

                {brands.map((brand) => (
                  <option key={brand.value} value={brand.value}>
                    {brand.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">Categorie</Label>

              <select
                id="categoryId"
                name="categoryId"
                required
                className="w-full rounded-md border bg-muted px-3 py-2"
              >
                <option value="">Selectează categoria</option>

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

            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>

              <Input id="sku" name="sku" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ean">EAN</Label>

              <Input id="ean" name="ean" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Preț (RON)</Label>

              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stoc</Label>

              <Input id="stock" name="stock" type="number" min="0" required />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Adaugă produs</Button>
        </div>
      </div>
    </form>
  );
}
