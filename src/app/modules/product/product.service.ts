/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';
import fs from 'fs/promises';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IProduct, IProductFilters } from './product.interface';
import { Product } from './product.model';
import { validateId } from '../../util/validateId';
import { IPaginationOptions } from '../../interfaces/pagination';
import { paginationHelpers } from '../../util/paginationHelper';
import { SortOrder } from 'mongoose';
import { productSearchableFields } from './product.constant';

// ? Create a new product

const createProduct = async (
  payload: IProduct,
  imagePaths: string[]
): Promise<IProduct | null> => {
  // * Check if there are at least one image

  if (imagePaths.length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'At least one image is required'
    );
  }

  // * Add the images to the payload

  payload.images = imagePaths;

  // * Validate reference IDs

  // const { brand, category, material, finish, style, color, installation } =
  const {category} =
    payload;
  validateId(category, 'category');

  // * Save to database

  const result = await Product.create(payload);

  return result.populate([
    'category',
  ]);
};

// ? Get all products

export const getAllProducts = async (
  paginationOptions: IPaginationOptions,
  filters: IProductFilters
) => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: any[] = [];

  // Search on string fields only
  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // Exact match filters
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Price filter
  if (minPrice || maxPrice) {
    const priceCondition: any = {};
    if (minPrice) priceCondition.$gte = Number(minPrice);
    if (maxPrice) priceCondition.$lte = Number(maxPrice);
    andConditions.push({ price: priceCondition });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;

  const whereConditions = andConditions.length ? { $and: andConditions } : {};

  const data = await Product.find(whereConditions)
    .populate('category')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Product.countDocuments(whereConditions);

  return {
    meta: { page, limit, total },
    data,
  };
};

export const getActiveProducts = async (
  paginationOptions: IPaginationOptions,
  filters: IProductFilters
) => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: any[] = [];

  // Only active products
  andConditions.push({ activeStatus: true });

  // Search
  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // Exact filters
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Price filter
  if (minPrice || maxPrice) {
    const priceCondition: any = {};
    if (minPrice) priceCondition.$gte = Number(minPrice);
    if (maxPrice) priceCondition.$lte = Number(maxPrice);
    andConditions.push({ price: priceCondition });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;

  const whereConditions = andConditions.length ? { $and: andConditions } : {};

  const data = await Product.find(whereConditions)
    .populate('category')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Product.countDocuments(whereConditions);

  return {
    meta: { page, limit, total },
    data,
  };
};

// ? Get a product by id

const getProductById = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findById(id).populate([
    'category',
  ]);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  return result;
};

const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
  const result = await Product.findOne({ slug }).populate([
    'category',
  ]);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  return result;
};


// ? Update a product

const updateProduct = async (
  id: string,
  payload: Partial<IProduct>,
  imagePaths: string[]
): Promise<IProduct | null> => {
  // * Find the product by ID

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  // * Validate reference IDs
  const { category } =
    payload;

  validateId(category, 'category');

  // * Update the product with new data
  Object.assign(product, payload);

  // * Update images if new ones are provided
if (imagePaths.length > 0) {
  product.images = [...product.images, ...imagePaths];
}


  // * Save updated product to the database
  await product.save();

  // * Populate and return the updated product
  return product.populate([
    'category',
  ]);
};
const deleteProductImage = async (id: string, imagePath: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  // Remove imagePath from product.images array
  product.images = product.images.filter(img => img !== imagePath);

  // Delete image file from disk
  const fullImagePath = path.join(process.cwd(), 'public', imagePath);
  try {
    await fs.access(fullImagePath);
    await fs.unlink(fullImagePath);
  } catch (err) {
    console.log('Image file does not exist or failed to delete:', err);
  }

  // Save updated product
  await product.save();

  return product;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getActiveProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProductImage
};
