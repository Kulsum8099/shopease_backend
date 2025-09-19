import { Model, Types } from 'mongoose';
import { ICategory } from '../category/category.interface';

export type IProductColor = 'red' | 'blue' | 'green' | 'yellow' | 'black' | 'white' | 'purple' | 'orange' | 'pink' | 'gray';

export type IProduct = {
  slug?: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  images: string[];
  category?: Types.ObjectId | ICategory;
  activeStatus?: boolean;
  features?: string;  // Changed from string[] to string
  color?: IProductColor; // Changed to enum type
};

export type productModel = Model<IProduct, Record<string, unknown>>;

export type IProductFilters = {
  searchTerm?: string;
  id?: string;
  category?: string;
  maxPrice?: any;
  minPrice?:any;
};
