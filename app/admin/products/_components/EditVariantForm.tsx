'use client';

import type { ProductVariant } from '@/db/queries/products/variants';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateVariantAction } from '@/actions/products/update-variant';

import { EditVariantFormSchema } from '@/lib/validation/products/product-variants-schema';
import { FormFields } from '@/lib/validation/products/product-variants-schema';

type EditVariantFormProps = {
  variant: ProductVariant;
};

const EditVariantForm = ({ variant }: EditVariantFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(EditVariantFormSchema),
    defaultValues: {
      variantName: variant.variantName,
      sku: variant.sku,
      ean: variant.ean ?? '',
      price: variant.price,
      stock: variant.stock,
      reservedStock: variant.reservedStock,
      active: variant.active,
      isDefault: variant.isDefault,
    },
  });

  const router = useRouter();

  const stock = watch('stock') ?? 0;
  const reservedStock = watch('reservedStock') ?? 0;

  const availableStock = Math.max(0, (stock || 0) - (reservedStock || 0));

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await updateVariantAction({
        ...data,
        variantId: variant.variantId,
        productId: variant.productId,
      });

      reset(data);
      toast.success('Modificarile sunt salvate!');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Erroare la salvare');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="variantName">Varianta</Label>
              <Input
                id="variantName"
                {...register('variantName')}
                aria-invalid={!!errors.variantName}
              />
              {errors.variantName && (
                <p className="text-sm text-destructive">
                  {errors.variantName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                {...register('sku')}
                aria-invalid={!!errors.sku}
              />

              {errors.sku && (
                <p className="text-sm text-destructive">{errors.sku.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="ean">EAN</Label>
              <Input
                id="ean"
                {...register('ean')}
                aria-invalid={!!errors.ean}
              />
              {errors.ean && (
                <p className="text-sm text-destructive">{errors.ean.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="price">Pret</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register('price', {
                  setValueAs: (value) => (value === '' ? 0 : Number(value)),
                })}
                aria-invalid={!!errors.price}
              />
              {errors.price && (
                <p className="text-sm text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="stock">Stoc</Label>
              <Input
                id="stock"
                type="number"
                {...register('stock', {
                  setValueAs: (value) => (value === '' ? 0 : Number(value)),
                })}
                aria-invalid={!!errors.stock}
              />
              {errors.stock && (
                <p className="text-sm text-destructive">
                  {errors.stock.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reservedStock">Rezervat</Label>
              <Input
                id="reservedStock"
                type="number"
                {...register('reservedStock', {
                  setValueAs: (value) => (value === '' ? 0 : Number(value)),
                })}
                aria-invalid={!!errors.reservedStock}
              />
              {errors.reservedStock && (
                <p className="text-sm text-destructive">
                  {errors.reservedStock?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Disponibil</Label>
              <Input value={availableStock} disabled />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Activ</Label>

              <Controller
                control={control}
                name="active"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Varianta implicita</Label>

              <Controller
                control={control}
                name="isDefault"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="min-w-40">
            {isSubmitting ? 'Se salveaza...' : 'Salveaza modificarile'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditVariantForm;
