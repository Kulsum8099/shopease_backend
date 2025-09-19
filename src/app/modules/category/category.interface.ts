import { Model } from 'mongoose';

export type ICategory = {
  name: string;
  description?: string;
  logo: string;
};

export type categoryModel = Model<ICategory, Record<string, unknown>>;
