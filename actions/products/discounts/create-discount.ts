'use server';

import { createDiscount } from '@/db/mutations/products/discounts/create';

import { DiscountSchema } from '@/lib/validation/products/discounts-schema';

type CreateDiscountActionInput = {
  variantId: string;
  type: 'percentage' | 'fixed';
  value: number;
  startsAt: string;
  endsAt: string;
  active: boolean;
};

export async function createDiscountAction(data: CreateDiscountActionInput) {
  const parsed = DiscountSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error('Datele reducerii sunt invalide.');
  }

  return createDiscount({
    variantId: data.variantId,
    type: data.type,
    value: data.value,
    startsAt: data.startsAt ? new Date(data.startsAt) : null,
    endsAt: data.endsAt ? new Date(data.endsAt) : null,
    active: data.active,
  });
}
