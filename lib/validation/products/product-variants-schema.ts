import { z } from 'zod';

import { DiscountSchema } from './discounts-schema';

export const EditVariantFormSchema = z
  .object({
    variantName: z.string().min(1, 'Numele variantei este obligatoriu'),

    sku: z.string().min(1, 'SKU este obligatoriu'),

    ean: z.string().optional(),

    price: z
      .number({ error: 'Pretul trebuie sa fie un numar valid' })
      .min(0, 'Pretul nu poate fi negativ'),

    stock: z
      .number({
        error: 'Stocul trebuie sa fie un numar valid',
      })
      .min(0, 'Stocul nu poate fi negativ'),

    reservedStock: z
      .number({
        error: 'Stocul rezervat trebuie sa fie un numar valid',
      })
      .min(0, 'Stocul rezervat nu poate fi negativ'),

    active: z.boolean(),

    isDefault: z.boolean(),
  })
  .refine((data) => data.reservedStock <= data.stock, {
    message: 'Stocul rezervat nu poate fi mai mare decat stocul total',
    path: ['reservedStock'],
  });

export const UpdateVariantSchema = EditVariantFormSchema.extend({
  variantId: z.string().uuid('ID-ul variantei este invalid'),
  productId: z.string().min(1, 'ID-ul produsului este obligatoriu'),
});

export type FormFields = z.infer<typeof EditVariantFormSchema>;
export type UpdateVariantInput = z.infer<typeof UpdateVariantSchema>;

export const EditVariantWithDiscountSchema = z
  .object({
    variant: EditVariantFormSchema,
    discount: DiscountSchema,
  })
  .refine(
    (data) => {
      if (data.discount.type !== 'fixed') return true;

      return data.discount.value < data.variant.price;
    },
    {
      message: 'Reducerea fixa trebuie sa fie mai mica decat pretul produsului',
      path: ['discount', 'value'],
    },
  );

export type EditVariantWithDiscountInput = z.infer<
  typeof EditVariantWithDiscountSchema
>;

export const UpdateVariantWithDiscountSchema = UpdateVariantSchema.extend({
  discount: DiscountSchema,
});

export type UpdateVariantWithDiscountInput = z.infer<
  typeof UpdateVariantWithDiscountSchema
>;
