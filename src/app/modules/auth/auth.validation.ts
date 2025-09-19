import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    fullName: z.string({
      required_error: 'Full name is required',
    }).optional(),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Password must be at least 8 characters'),
    phoneNumber: z
      .string({
        required_error: 'Phone number is required',
      })
      .min(11, 'Phone number must be exactly 11 digits')
      .max(11, 'Phone number must be exactly 11 digits')
      .regex(/^[0-9]+$/, 'Phone number must contain only digits')
      .optional(),
    address: z.string().optional(),
    role: z.enum(['admin', 'customer']).optional(),
    confirmPassword: z.string({
      required_error: 'Confirm password is required',
    }),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    fullName: z.string().min(4).optional(),
    email: z.string().email("Invalid email format").optional(),
    phoneNumber: z.string().min(10).optional(),
    address: z.string().min(4).optional(),
  })
});


const changePasswordZodSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(8, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  }),
});
export const AuthValidation = {
  createUserZodSchema,
  updateUserZodSchema,
  changePasswordZodSchema
};
