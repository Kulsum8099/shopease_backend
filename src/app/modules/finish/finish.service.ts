import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IFinish } from './finish.interface';
import { Finish } from './finish.model';

// ? Create a finish

const createFinish = async (payload: IFinish): Promise<IFinish | null> => {
  const result = await Finish.create(payload);
  return result;
};

// ? Get all finish

const getAllFinish = async (): Promise<IFinish[] | null> => {
  const result = await Finish.find().lean();
  return result;
};

// ? Get all active finish

const getActiveFinish = async (): Promise<IFinish[] | null> => {
  const result = await Finish.find({ activeStatus: true }).lean();
  return result;
};

// ? Get a single finish

const getFinish = async (id: string): Promise<IFinish | null> => {
  const result = await Finish.findById(id);

  // * Check if the finish exists

  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Finish not found');

  return result;
};

// ? Update a finish

const updateFinish = async (
  id: string,
  payload: Partial<IFinish>
): Promise<IFinish | null> => {
  // * Check if the finish exists

  const finish = await Finish.findById(id);

  if (!finish) throw new ApiError(httpStatus.NOT_FOUND, 'Finish not found');

  // * Update the finish

  const result = await Finish.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const FinishService = {
  createFinish,
  getAllFinish,
  getActiveFinish,
  getFinish,
  updateFinish,
};
