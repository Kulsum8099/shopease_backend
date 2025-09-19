import { z } from 'zod';

const createColorZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Color name is required',
    }),
    code: z
      .string({
        required_error: 'Color code is required',
      })
      .length(6, {
        message: 'Color code have to be a 6 character hexadecimal number',
      }),
    description: z.string(),
  }),
});

const updateColorZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    code: z
      .string()
      .length(6, {
        message: 'Color code have to be a 6 character hexadecimal number',
      })
      .optional(),
    description: z.string().optional(),
    activeStatus: z.boolean().optional(),
  }),
});

export const ColorValidation = {
  createColorZodSchema,
  updateColorZodSchema,
};
