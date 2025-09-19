import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { IFinish } from './finish.interface';
import { FinishService } from './finish.service';

//? @desc    create a new finish
//? @route   POST /api/v1/finish/create-finish
//? @access  private

const createFinish = asyncHandler(async (req: Request, res: Response) => {
  const { ...finishData } = req.body;
  const result = await FinishService.createFinish(finishData);

  sendResponse<IFinish>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Finish created successfully!',
    data: result,
  });
});

//? @desc    Fetch all finish
//? @route   GET /api/v1/finish
//? @access  public

const getAllFinish = asyncHandler(async (req: Request, res: Response) => {
  const result = await FinishService.getAllFinish();

  sendResponse<IFinish[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Finish fetched successfully!',
    data: result,
  });
});

//? @desc    Fetch all active finish
//? @route   GET /api/v1/finish/active
//? @access  public

const getActiveFinish = asyncHandler(async (req: Request, res: Response) => {
  const result = await FinishService.getActiveFinish();

  sendResponse<IFinish[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Active Finish fetched successfully!',
    data: result,
  });
});

//? @desc    Fetch a finish by id
//? @route   GET /api/v1/finish/:id
//? @access  public

const getFinish = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await FinishService.getFinish(id);

  sendResponse<IFinish>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Finish fetched successfully!',
    data: result,
  });
});

//? @desc    update a finish
//? @route   PATCH /api/v1/finish/update-finish/:id
//? @access  private

const updateFinish = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...finishData } = req.body;
  const result = await FinishService.updateFinish(id, finishData);

  sendResponse<IFinish>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Finish updated successfully!',
    data: result,
  });
});

export const FinishController = {
  createFinish,
  getAllFinish,
  getActiveFinish,
  getFinish,
  updateFinish,
};
