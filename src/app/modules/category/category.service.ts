import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICategory } from './category.interface';
import { Category } from './category.model';

// ? Create a new category

const createCategory = async (
  payload: ICategory,
  logoPath: string
): Promise<ICategory | null> => {
  payload.logo = logoPath;
  const result = await Category.create(payload);
  return result;
};

// ? Get all categories

const getAllCategories = async (): Promise<ICategory[] | null> => {
  const result = await Category.find({}).lean();
  return result;
};

// ? Get all categories

const getActiveCategories = async (): Promise<ICategory[] | null> => {
  const result = await Category.find({ activeStatus: true }).lean();
  return result;
};

// ? Get a single category

const getCategory = async (id: string): Promise<ICategory | null> => {
  const result = await Category.findById(id);

  // * Check if the category exists

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');

  return result;
};

// ? Update a category

const updateCategory = async (
  id: string,
  payload: Partial<ICategory>,
  logoPath?: string
): Promise<ICategory | null> => {
  // * Check if the category exists

  const category = await Category.findById(id);

  if (!category) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');

  // * Update the category
const categoryData: Partial<ICategory> = { ...payload };
  if (logoPath) {
    categoryData.logo = logoPath;
  }
  const result = await Category.findByIdAndUpdate({ _id: id }, categoryData, {
    new: true,
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getActiveCategories,
  getCategory,
  updateCategory,
};
