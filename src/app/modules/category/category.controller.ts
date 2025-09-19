import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { ICategory } from './category.interface';
import { CategoryService } from './category.service';
import ApiError from '../../../errors/ApiError';

//? @desc    create a new category
//? @route   POST /api/v1/category/create-category
//? @access  private

const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { ...categoryData } = req.body;

  const logo = req.file;
  // * handing image required error

  if (!logo) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Logo image is required!');
  }

  // * defining image path

  const logoPath = `/uploads/${logo.filename}`;

  const result = await CategoryService.createCategory(categoryData, logoPath);

  sendResponse<ICategory>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully!',
    data: result,
  });
});

//? @desc    Fetch all categories
//? @route   GET /api/v1/category
//? @access  public

const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategories();
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Category found');
  }
  const categories = result.map(category => ({
    ...category,
    logo: category.logo ? `${req.protocol}://${req.get('host')}${category.logo}` : '',
  }));

  sendResponse<ICategory[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched successfully!',
    data: categories,
  });
});

//? @desc    Fetch active categories
//? @route   GET /api/v1/category/active
//? @access  public

const getActiveCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await CategoryService.getActiveCategories();

    sendResponse<ICategory[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Active Categories fetched successfully!',
      data: result,
    });
  }
);

//? @desc    Fetch a category
//? @route   GET /api/v1/category/:id
//? @access  public

const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CategoryService.getCategory(id);

  sendResponse<ICategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched successfully!',
    data: result,
  });
});

//? @desc    update a category
//? @route   PATCH /api/v1/category/:id
//? @access  private

const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  const { ...categoryData } = req.body;
  let logoPath: string | undefined = undefined;
  const logo = req.file;
  if (logo) {
    logoPath = `/uploads/${logo.filename}`;
  }
  const updatedCategory = await CategoryService.updateCategory(
    categoryId,
    categoryData,
    logoPath
  );
  if (updatedCategory?.logo) {
    updatedCategory.logo = `${req.protocol}://${req.get('host')}${updatedCategory.logo
      }`;
  }
  sendResponse<ICategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully!',
    data: updatedCategory,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategories,
  getActiveCategories,
  getCategory,
  updateCategory,
};
