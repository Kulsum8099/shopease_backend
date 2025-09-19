import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IStyle } from './style.interface';
import { Style } from './style.model';

// ? Create a style

const createStyle = async (payload: IStyle): Promise<IStyle | null> => {
  const result = await Style.create(payload);
  return result;
};

// ? Get all styles

const getAllStyles = async (): Promise<IStyle[] | null> => {
  const result = await Style.find().lean();
  return result;
};

// ? Get active styles

const getActiveStyles = async (): Promise<IStyle[] | null> => {
  const result = await Style.find({ activeStatus: true }).lean();
  return result;
};

// ? Get a single style by id

const getStyleById = async (id: string): Promise<IStyle | null> => {
  const result = await Style.findById(id);

  // * Check if the style exists

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Style not found');

  return result;
};

// ? Update a style

const updateStyle = async (
  id: string,
  payload: Partial<IStyle>
): Promise<IStyle | null> => {
  // * Check if the style exists

  const style = await Style.findById(id);

  if (!style) throw new ApiError(httpStatus.NOT_FOUND, 'Style not found');

  // * Update the style

  const result = await Style.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const StyleService = {
  createStyle,
  getAllStyles,
  getActiveStyles,
  getStyleById,
  updateStyle,
};
