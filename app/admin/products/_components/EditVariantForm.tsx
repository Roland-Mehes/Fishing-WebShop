'use client';

import type { ProductVariant } from '@/db/queries/products/variants';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateVariantAction } from '@/actions/products/update-variant';
import {
  EditVariantWithDiscountSchema,
  type EditVariantWithDiscountInput,
} from '@/lib/validation/products/product-variants-schema';
import DiscountForm from './DiscountForm';

import { formatDateTimeLocal } from '@/lib/formatters/date';

type EditVariantFormProps = {
  variant: ProductVariant;
};

const EditVariantForm = ({ variant }: EditVariantFormProps) => {
  const activeDiscount = variant.discounts.find(
    (discount) => discount.active && !discount.deletedAt,
  );

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditVariantWithDiscountInput>({
    resolver: zodResolver(EditVariantWithDiscountSchema),
    defaultValues: {
      variant: {
        variantName: variant.variantName,
        sku: variant.sku,
        ean: variant.ean ?? '',
        price: variant.price,
        stock: variant.stock,
        reservedStock: variant.reservedStock,
        active: variant.active,
        isDefault: variant.isDefault,
      },

      discount: {
        type: activeDiscount?.type ?? 'percentage',
        value: activeDiscount?.value ?? 0,
        startsAt: activeDiscount
          ? formatDateTimeLocal(activeDiscount.startsAt)
          : '',
        endsAt: activeDiscount
          ? formatDateTimeLocal(activeDiscount.endsAt)
          : '',
        active: activeDiscount?.active ?? false,
      },
    },
  });

  const router = useRouter();

  const stock = watch('variant.stock') ?? 0;
  const reservedStock = watch('variant.reservedStock') ?? 0;

  const availableStock = Math.max(0, (stock || 0) - (reservedStock || 0));

  const onSubmit: SubmitHandler<EditVariantWithDiscountInput> = async (
    data,
  ) => {
    try {
      await updateVariantAction({
        ...data.variant,
        variantId: variant.id,
        productId: variant.productId,
        discount: data.discount,
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
                {...register('variant.variantName')}
                aria-invalid={!!errors.variant?.variantName}
              />
              {errors.variant?.variantName && (
                <p className="text-sm text-destructive">
                  {errors.variant.variantName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                {...register('variant.sku')}
                aria-invalid={!!errors.variant?.sku}
              />

              {errors.variant?.sku && (
                <p className="text-sm text-destructive">
                  {errors.variant?.sku.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="ean">EAN</Label>
              <Input
                id="ean"
                {...register('variant.ean')}
                aria-invalid={!!errors.variant?.ean}
              />
              {errors.variant?.ean && (
                <p className="text-sm text-destructive">
                  {errors.variant.ean.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="price">Pret</Label>

              <Input
                id="price"
                type="number"
                step="0.01"
                {...register('variant.price', {
                  setValueAs: (value) => (value === '' ? 0 : Number(value)),
                })}
                aria-invalid={!!errors.variant?.price}
              />

              {errors.variant?.price && (
                <p className="text-sm text-destructive">
                  {errors.variant.price.message}
                </p>
              )}
            </div>

            <DiscountForm
              register={register}
              control={control}
              errors={errors.discount}
              price={watch('variant.price')}
            />
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
                {...register('variant.stock', {
                  setValueAs: (value) => (value === '' ? 0 : Number(value)),
                })}
                aria-invalid={!!errors.variant?.stock}
              />
              {errors.variant?.stock && (
                <p className="text-sm text-destructive">
                  {errors.variant.stock.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reservedStock">Rezervat</Label>
              <Input
                id="reservedStock"
                type="number"
                {...register('variant.reservedStock', {
                  setValueAs: (value) => (value === '' ? 0 : Number(value)),
                })}
                aria-invalid={!!errors.variant?.reservedStock}
              />
              {errors.variant?.reservedStock && (
                <p className="text-sm text-destructive">
                  {errors.variant.reservedStock?.message}
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
                name="variant.active"
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
                name="variant.isDefault"
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
