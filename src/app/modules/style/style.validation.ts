import { z } from 'zod';

const createStyleZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Style name is required',
    }),
    description: z.string(),
  }),
});

const updateStyleZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    activeStatus: z.boolean().optional(),
  }),
});

export const StyleValidation = {
  createStyleZodSchema,
  updateStyleZodSchema,
};
