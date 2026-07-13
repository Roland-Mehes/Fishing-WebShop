import { z } from 'zod';

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, 'Numele trebuie să conțină minim 2 caractere.')
    .max(100, 'Numele este prea lung.'),

  email: z.email('Adresă de email invalidă.'),

  password: z
    .string()
    .min(8, 'Parola trebuie să conțină minim 8 caractere.')
    .max(100, 'Parola este prea lungă.'),
});

export type SignupSchema = z.infer<typeof signupSchema>;
