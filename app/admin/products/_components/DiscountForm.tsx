'use client';

import {
  Controller,
  useWatch,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

import type { EditVariantWithDiscountInput } from '@/lib/validation/products/product-variants-schema';

type DiscountFormProps = {
  register: UseFormRegister<EditVariantWithDiscountInput>;
  control: Control<EditVariantWithDiscountInput>;
  errors: FieldErrors<EditVariantWithDiscountInput>['discount'];
  price: number;
};

const DiscountForm = ({
  register,
  control,
  errors,
  price,
}: DiscountFormProps) => {
  const discountType = useWatch({
    control,
    name: 'discount.type',
  });

  const discountValue = useWatch({
    control,
    name: 'discount.value',
  });

  const discountActive = useWatch({
    control,
    name: 'discount.active',
  });

  const promoPrice = Math.max(
    0,
    discountType === 'percentage'
      ? price - (price * discountValue) / 100
      : price - discountValue,
  );

  return (
    <div className="space-y-6 border-t pt-6">
      <div>
        <h3 className="text-sm font-medium">Reducere</h3>

        <p className="text-sm text-muted-foreground">
          Configureaza reducerea si perioada promotionala.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="discount-type">Tip reducere</Label>

        <select
          id="discount-type"
          {...register('discount.type')}
          className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm"
        >
          <option value="percentage">Procentual</option>
          <option value="fixed">Valoare fixa</option>
        </select>

        {errors?.type && (
          <p className="text-sm text-destructive">{errors.type.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="discount-value">
          {discountType === 'percentage' ? 'Reducere (%)' : 'Reducere (RON)'}
        </Label>

        <Input
          id="discount-value"
          type="number"
          min="0"
          max={discountType === 'percentage' ? 100 : undefined}
          step="0.01"
          {...register('discount.value', {
            setValueAs: (value) => (value === '' ? 0 : Number(value)),
          })}
          aria-invalid={!!errors?.value}
        />

        {errors?.value && (
          <p className="text-sm text-destructive">{errors.value.message}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="discount-starts-at">Data inceput</Label>

          <Input
            id="discount-starts-at"
            type="datetime-local"
            {...register('discount.startsAt')}
            aria-invalid={!!errors?.startsAt}
          />

          {errors?.startsAt && (
            <p className="text-sm text-destructive">
              {errors.startsAt.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="discount-ends-at">Data sfarsit</Label>

          <Input
            id="discount-ends-at"
            type="datetime-local"
            {...register('discount.endsAt')}
            aria-invalid={!!errors?.endsAt}
          />

          {errors?.endsAt && (
            <p className="text-sm text-destructive">{errors.endsAt.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="discount-active">Activ</Label>

        <Controller
          control={control}
          name="discount.active"
          render={({ field }) => (
            <Switch
              id="discount-active"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </div>

      {discountActive && discountValue > 0 && (
        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="text-sm text-muted-foreground">Pret promotional</div>

          <div className="mt-1 text-2xl font-semibold">
            {promoPrice.toFixed(2)} RON
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountForm;
