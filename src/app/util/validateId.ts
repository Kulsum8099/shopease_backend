/* eslint-disable @typescript-eslint/no-explicit-any */

import { Types } from 'mongoose';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const isValidObjectId = (id: any): boolean => {
  return Types.ObjectId.isValid(id);
};

export const validateId = async (id: any, fieldName: string) => {
  if (!id || !isValidObjectId(id) || typeof id !== 'string') {
    throw new ApiError(httpStatus.BAD_REQUEST, `Invalid ${fieldName} ID`);
  }
};
