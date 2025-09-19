import { z } from 'zod';

const createFinishZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Finish name is required',
    }),
    description: z.string(),
  }),
});

const updateFinishZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    activeStatus: z.boolean().optional(),
  }),
});

export const FinishValidation = {
  createFinishZodSchema,
  updateFinishZodSchema,
};
