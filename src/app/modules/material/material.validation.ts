import { z } from 'zod';

const createMaterialZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Material name is required',
    }),

    description: z.string(),
  }),
});

const updateMaterialZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),

    description: z.string().optional(),
    activeStatus: z.boolean().optional(),
  }),
});

export const MaterialValidation = {
  createMaterialZodSchema,
  updateMaterialZodSchema,
};
