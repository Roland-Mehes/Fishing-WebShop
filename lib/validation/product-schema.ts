import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(3, 'Name must contain at least 3 characters'),

  brandId: z.uuid(),

  categoryId: z.uuid(),

  sku: z.string().min(1, 'SKU is required'),

  ean: z.string().optional(),

  price: z.coerce.number().positive(),

  stock: z.coerce.number().min(0),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
