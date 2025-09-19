import { z } from 'zod';

const createContactZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Full name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    subject: z.string({ required_error: 'Subject is required' }),
    category: z.string({ required_error: 'Category is required' }),
    message: z.string({ required_error: 'Message is required' }),
  }),
});

export const ContactValidation = {
  createContactZodSchema,
};
