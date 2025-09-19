/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { ProductService } from './product.service';
import { IProduct } from './product.interface';
import ApiError from '../../../errors/ApiError';
import pick from '../../../shared/pick';
import { paginationFields, productFilterableFields } from './product.constant';

//? @desc    create a new product
//? @route   POST /api/v1/product/create-product
//? @access  private

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { ...productData } = req.body;

  // * Extract relative paths for images
  const imagePaths = req.files
    ? (req.files as Express.Multer.File[]).map(file => {
      // * Remove everything before and including `public/` in the file path
      const relativePath = file.path.split('public')[1];
      // * Ensure it uses forward slashes
      return relativePath.replace(/\\/g, '/').replace(/^\//, ''); // Remove leading slash
    })
    : [];

  const result = await ProductService.createProduct(productData, imagePaths);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully!',
    data: result,
  });
});

//? @desc    get all products
//? @route   GET /api/v1/product
//? @access  public

const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, productFilterableFields);

  const result = await ProductService.getAllProducts(
    paginationOptions,
    filters
  );

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No products found');
  }

  // * Add domain name to each image path

  const domain = `${req.protocol}://${req.get('host')}`;
  const updatedResult = result.data.map((product: any) => {
    return {
      ...product,
      images: (product.images || []).map(
        (image: string) => `${domain}/${image}`
      ),
    };
  });

  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully!',
    data: updatedResult,
    meta: result.meta,
  });
});

//? @desc    get active products
//? @route   GET /api/v1/product/active
//? @access  public

const getActiveProducts = asyncHandler(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, productFilterableFields);

  const result = await ProductService.getActiveProducts(
    paginationOptions,
    filters
  );

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No products found');
  }

  // * Add domain name to each image path

  const domain = `${req.protocol}://${req.get('host')}`;
  const updatedResult = result.data.map((product: any) => {
    return {
      ...product,
      images: (product.images || []).map(
        (image: string) => `${domain}/${image}`
      ),
    };
  });

  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Active Products fetched successfully!',
    data: updatedResult,
    meta: result.meta,
  });
});

//? @desc    get a product
//? @route   GET /api/product/:id
//? @access  public

const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProductService.getProductById(id);

  // * Add domain name to each image path
  if (result) {
    const domain = `${req.protocol}://${req.get('host')}`;
    result.images = (result.images || []).map(image => `${domain}/${image}`);
  }

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched successfully!',
    data: result,
  });
});

//? @desc    update a product
//? @route   PATCH /api/product/update-product/:id
//? @access  private

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updateData } = req.body;

  // * Extract relative paths for images
  const imagePaths = req.files
    ? (req.files as Express.Multer.File[]).map(file => {
      // * Remove everything before and including `public/` in the file path
      const relativePath = file.path.split('public')[1];
      // * Ensure it uses forward slashes
      return relativePath.replace(/\\/g, '/').replace(/^\//, '');
    })
    : [];

  const result = await ProductService.updateProduct(id, updateData, imagePaths);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully!',
    data: result,
  });
});

//? @desc    get a product by slug
//? @route   GET /api/v1/product/slug/:slug
//? @access  public

const getProductBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const result = await ProductService.getProductBySlug(slug);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const domain = `${req.protocol}://${req.get('host')}`;
  result.images = (result.images || []).map(image => `${domain}/${image}`);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched successfully by slug!',
    data: result,
  });
});


const deleteProductImage = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { imagePath } = req.body;

  if (!imagePath) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Image path is required to delete image',
    });
  }

  const updatedProduct = await ProductService.deleteProductImage(id, imagePath);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Image deleted successfully!',
    data: updatedProduct,
  });
});




export const ProductController = {
  createProduct,
  getAllProducts,
  getActiveProducts,
  getProduct,
  getProductBySlug,
  updateProduct,
  deleteProductImage
};
