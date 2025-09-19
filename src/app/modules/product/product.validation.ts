import { z } from 'zod';
const colorEnum = ['red', 'blue', 'green', 'yellow', 'black', 'white', 'purple', 'orange', 'pink', 'gray'] as const;
const createProductZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Product name is required',
    }),
    description: z.string({
      required_error: 'Product description is required',
    }),
    category: z.string({
      required_error: 'Category is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    stock: z.number({
      required_error: 'Quantity is required',
    }),
    features: z.string().optional(),  // Changed from array to string
    color: z.enum(colorEnum).optional(), // Added enum validation
  }),
});

const updateProductZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    stock: z.number().optional(),
    category: z.string().optional(),
    features: z.string().optional(),  // Changed from array to string
    color: z.enum(colorEnum).optional(), // Added enum validation
  }),
});

export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
