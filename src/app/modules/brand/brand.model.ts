import { Schema, model } from 'mongoose';
import { brandModel, IBrand } from './brand.interface';

const brandSchema = new Schema<IBrand>({
  name: {
    type: 'string',
    required: true,
    trim: true,
  },
  logo: {
    type: 'string',
    required: true,
  },
  description: {
    type: 'string',
    trim: true,
  },
  activeStatus: {
    type: 'boolean',
    default: true,
  },
});

export const Brand = model<IBrand, brandModel>('Brand', brandSchema);
