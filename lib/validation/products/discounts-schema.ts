import { z } from 'zod';

export const DiscountSchema = z
  .object({
    type: z.enum(['percentage', 'fixed']),

    value: z.number().min(0, 'Valoarea reducerii nu poate fi negativ'),

    startsAt: z.string(),

    endsAt: z.string(),

    active: z.boolean(),
  })
  .refine(
    (data) => {
      if (!data.startsAt || !data.endsAt) return true;

      return new Date(data.endsAt) >= new Date(data.startsAt);
    },
    {
      message: 'Data de sfarsit trebuie sa fie dupa data de inceput',
      path: ['endsAt'],
    },
  )
  .refine(
    (data) => {
      if (data.type !== 'percentage') return true;

      return data.value <= 100;
    },
    {
      message: 'Reducerea procentuala nu poate depasi 100%',
      path: ['value'],
    },
  );

export type DiscountInput = z.infer<typeof DiscountSchema>;
