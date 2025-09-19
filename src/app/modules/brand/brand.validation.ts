import { z } from 'zod';

const createBrandZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Brand name is required',
    }),
    // logo: z
    //   .instanceof(Buffer)
    //   .refine(
    //     file => file.size > 0,
    //     { message: 'Brand logo is required' }
    //   ),
    description: z.string(),
  }),
});

const updateBrandZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    // logo: z.instanceof(Buffer).optional(),
    description: z.string().optional(),
    activeStatus: z.boolean().optional(),
  }),
});

export const BrandValidation = {
  createBrandZodSchema,
  updateBrandZodSchema,
};
