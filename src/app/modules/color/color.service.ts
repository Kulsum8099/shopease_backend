import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IColor } from './color.interface';
import { Color } from './color.model';

// ? Create a color

const createColor = async (payload: IColor): Promise<IColor | null> => {
  const result = await Color.create(payload);
  return result;
};

// ? Get all colors

const getAllColors = async (): Promise<IColor[] | null> => {
  const result = await Color.find().lean();
  return result;
};

// ? Get all active colors

const getActiveColors = async (): Promise<IColor[] | null> => {
  const result = await Color.find({ activeStatus: true }).lean();
  return result;
};

// ? Get a single color by id

const getColorById = async (id: string): Promise<IColor | null> => {
  const result = await Color.findById(id);

  // * Check if the color exists

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Color not found');

  return result;
};

// ? Update a color

const updateColor = async (
  id: string,
  payload: Partial<IColor>
): Promise<IColor | null> => {
  // * Check if the color exists

  const color = await Color.findById(id);

  if (!color) throw new ApiError(httpStatus.NOT_FOUND, 'Color not found');

  // * Update the color

  const result = await Color.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const ColorService = {
  createColor,
  getAllColors,
  getActiveColors,
  getColorById,
  updateColor,
};
