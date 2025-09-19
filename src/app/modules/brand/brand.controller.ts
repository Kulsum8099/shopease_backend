import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { IBrand } from './brand.interface';
import { BrandService } from './brand.service';
import ApiError from '../../../errors/ApiError';

//? @desc    create a new brand
//? @route   POST /api/v1/brand/create-brand
//? @access  private

const createBrand = asyncHandler(async (req: Request, res: Response) => {
  const { ...brandData } = req.body;

  const logo = req.file;

  // * handing image required error

  if (!logo) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Logo image is required!');
  }

  // * defining image path

  const logoPath = `/uploads/${logo.filename}`;

  const result = await BrandService.createBrand(brandData, logoPath);

  sendResponse<IBrand>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Brand created successfully!',
    data: result,
  });
});

//? @desc    get all brands
//? @route   GET /api/v1/brand
//? @access  public

const getBrands = asyncHandler(async (req: Request, res: Response) => {
  const result = await BrandService.getBrands();

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No brands found');
  }
  const brands = result.map(brand => ({
    ...brand,
    logo: brand.logo ? `${req.protocol}://${req.get('host')}${brand.logo}` : '',
  }));

  sendResponse<IBrand[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brands fetched successfully!',
    data: brands,
  });
});

//? @desc    get all active brands
//? @route   GET /api/v1/brand/active
//? @access  public

const getActiveBrands = asyncHandler(async (req: Request, res: Response) => {
  const result = await BrandService.getActiveBrands();

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No brands found');
  }
  const brands = result.map(brand => ({
    ...brand,
    logo: brand.logo ? `${req.protocol}://${req.get('host')}${brand.logo}` : '',
  }));

  sendResponse<IBrand[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Active Brands fetched successfully!',
    data: brands,
  });
});

//? @desc    get a brand
//? @route   GET /api/v1/brand/:id
//? @access  public

const getBrand = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BrandService.getBrandById(id);

  // * Add the domain prefix to the logo URL before sending the response

  if (result?.logo) {
    result.logo = `${req.protocol}://${req.get('host')}{result.logo}`;
  }

  sendResponse<IBrand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand fetched successfully!',
    data: result,
  });
});

//? @desc    update a brand
//? @route   PATCH /api/v1/brand/update-brand/:id
//? @access  private

const updateBrand = asyncHandler(async (req: Request, res: Response) => {
  const brandId = req.params.id;
  const { ...brandData } = req.body;

  let logoPath: string | undefined = undefined;
  const logo = req.file;

  if (logo) {
    logoPath = `/uploads/${logo.filename}`;
  }

  const updatedBrand = await BrandService.updateBrand(
    brandId,
    brandData,
    logoPath
  );

  // * Add the domain prefix to the logo URL before sending the response

  if (updatedBrand?.logo) {
    updatedBrand.logo = `${req.protocol}://${req.get('host')}${
      updatedBrand.logo
    }`;
  }

  sendResponse<IBrand>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand updated successfully!',
    data: updatedBrand,
  });
});

export const BrandController = {
  createBrand,
  getBrands,
  getActiveBrands,
  getBrand,
  updateBrand,
};
