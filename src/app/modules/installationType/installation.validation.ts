import { z } from 'zod';

const createInstallationZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Installation type name is required',
    }),
    description: z.string(),
  }),
});

const updateInstallationZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    activeStatus: z.boolean().optional(),
  }),
});

export const InstallationTypeValidation = {
  createInstallationZodSchema,
  updateInstallationZodSchema,
};
