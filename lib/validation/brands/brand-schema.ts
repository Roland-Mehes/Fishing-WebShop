import { z } from 'zod';

export const createBrandSchema = z.object({
  name: z.string().min(2, 'Numele producatorului este necesar').max(100),
});

export type CreateBrandInput = z.infer<typeof createBrandSchema>;
