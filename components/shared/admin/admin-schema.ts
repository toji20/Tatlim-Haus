import { z } from 'zod';

export const adminFormSchema = z.object({
    name: z.string(),
    price: z.string(),
    imageUrl: z.string(),
    categoryId: z.string(),
});

export type AdminFormValues = z.infer<typeof adminFormSchema>;
