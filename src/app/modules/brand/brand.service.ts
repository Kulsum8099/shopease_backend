import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBrand } from './brand.interface';
import { Brand } from './brand.model';

// ? Create a new brand

const createBrand = async (
  payload: IBrand,
  logoPath: string
): Promise<IBrand | null> => {
  // * Add the logo path to the payload
  payload.logo = logoPath;

  // * Save to database
  const result = await Brand.create(payload);
  return result;
};

// ? Get All Brands

const getBrands = async (): Promise<IBrand[] | null> => {
  const result = await Brand.find({}).lean();
  return result;
};

// ? Get all active brands

const getActiveBrands = async (): Promise<IBrand[] | null> => {
  const result = await Brand.find({ activeStatus: true }).lean();
  return result;
};

// ? Get a brand by id

const getBrandById = async (id: string): Promise<IBrand | null> => {
  const result = await Brand.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }

  return result;
};

// ? Update a brand

const updateBrand = async (
  id: string,
  payload: Partial<IBrand>,
  logoPath?: string
): Promise<IBrand | null> => {
  const brand = await Brand.findById(id);

  if (!brand) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found');
  }

  const brandData: Partial<IBrand> = { ...payload };

  if (logoPath) {
    brandData.logo = logoPath;
  }

  const result = await Brand.findByIdAndUpdate(id, brandData, { new: true });
  return result;
};

export const BrandService = {
  createBrand,
  getBrands,
  getActiveBrands,
  getBrandById,
  updateBrand,
};
