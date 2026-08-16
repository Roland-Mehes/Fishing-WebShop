import { z } from 'zod';

export const updateProductSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1, 'Numele produsului este obligatoriu.'),
  categoryId: z.string().min(1, 'Categoria este obligatorie.'),
  active: z.coerce.boolean(),
});

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
