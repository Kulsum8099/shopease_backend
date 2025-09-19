import { z } from 'zod';

const createShippingAddressSchema = z.object({
    body: z.object({
        fullName: z.string().min(1, 'Full name is required'),
        phoneNumber: z.string()
            .min(11, 'Phone number must be exactly 11 digits')
            .max(11, 'Phone number must be exactly 11 digits')
            .regex(/^[0-9]+$/, 'Phone number must contain only digits'),
        streetAddress: z.string().min(1, 'Street address is required'),
        city: z.string().min(1, 'City is required'),
        state: z.string().min(1, 'State/Province is required'),
        postalCode: z.string().min(1, 'ZIP/Postal code is required'),
        country: z.string().min(1, 'Country is required'),
        isDefault: z.boolean().optional(),
    }),
});

const updateShippingAddressSchema = z.object({
    body: z.object({
        fullName: z.string().min(1).optional(),
        phoneNumber: z.string()
            .min(11, 'Phone number must be exactly 11 digits')
            .max(11, 'Phone number must be exactly 11 digits')
            .regex(/^[0-9]+$/, 'Phone number must contain only digits')
            .optional(),
        streetAddress: z.string().min(1).optional(),
        city: z.string().min(1).optional(),
        state: z.string().min(1).optional(),
        postalCode: z.string().min(1).optional(),
        country: z.string().min(1).optional(),
        isDefault: z.boolean().optional(),
    }),
});

export const ShippingAddressValidation = {
    createShippingAddressSchema,
    updateShippingAddressSchema,
};