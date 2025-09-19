import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IInstallationType } from './installation.interface';
import { InstallationType } from './installation.model';

// ? Create a installation type

const createInstallationType = async (
  payload: IInstallationType
): Promise<IInstallationType | null> => {
  const result = await InstallationType.create(payload);
  return result;
};

// ? Get all installation types

const getAllInstallationTypes = async (): Promise<
  IInstallationType[] | null
> => {
  const result = await InstallationType.find().lean();
  return result;
};

// ? Get active installation types

const getActiveInstallationTypes = async (): Promise<
  IInstallationType[] | null
> => {
  const result = await InstallationType.find({ activeStatus: true }).lean();
  return result;
};

// ? Get a single installation type by id

const getInstallationTypeById = async (
  id: string
): Promise<IInstallationType | null> => {
  const result = await InstallationType.findById(id);

  // * Check if the installation type exists

  if (!result)
    throw new ApiError(httpStatus.NOT_FOUND, 'Installation type not found');

  return result;
};

// ? Update a installation type

const updateInstallationType = async (
  id: string,
  payload: Partial<IInstallationType>
): Promise<IInstallationType | null> => {
  // * Check if the installation type exists

  const installationType = await InstallationType.findById(id);

  if (!installationType)
    throw new ApiError(httpStatus.NOT_FOUND, 'Installation type not found');

  // * Update the installation type

  const result = await InstallationType.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

export const InstallationTypeService = {
  createInstallationType,
  getAllInstallationTypes,
  getActiveInstallationTypes,
  getInstallationTypeById,
  updateInstallationType,
};
