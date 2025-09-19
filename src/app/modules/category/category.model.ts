import { Schema, model } from 'mongoose';
import { categoryModel, ICategory } from './category.interface';

const categorySchema = new Schema<ICategory>({
  name: {
    type: 'string',
    required: true,
    trim: true,
  },
  description: {
    type: 'string',
    trim: true,
  },
  logo: {
    type: 'string',
    required: true,
  },
});

export const Category = model<ICategory, categoryModel>(
  'Category',
  categorySchema
);
