import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IMaterial } from './material.interface';
import { Material } from './material.model';

// ? Create a material

const createMaterial = async (
  payload: IMaterial
): Promise<IMaterial | null> => {
  const result = await Material.create(payload);
  return result;
};

// ? Get all materials

const getAllMaterials = async (): Promise<IMaterial[] | null> => {
  const result = await Material.find().lean();
  return result;
};

// ? Get all active materials

const getActiveMaterials = async (): Promise<IMaterial[] | null> => {
  const result = await Material.find({ activeStatus: true }).lean();
  return result;
};

// ? Get a single material

const getMaterial = async (id: string): Promise<IMaterial | null> => {
  const result = await Material.findById(id);

  // * Check if the material exists

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Material not found');

  return result;
};

// ? Update a material

const updateMaterial = async (
  id: string,
  payload: Partial<IMaterial>
): Promise<IMaterial | null> => {
  // * Check if the material exists

  const material = await Material.findById(id);

  if (!material) throw new ApiError(httpStatus.NOT_FOUND, 'Material not found');

  // * Update the material

  const result = await Material.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const MaterialService = {
  createMaterial,
  getAllMaterials,
  getActiveMaterials,
  getMaterial,
  updateMaterial,
};
