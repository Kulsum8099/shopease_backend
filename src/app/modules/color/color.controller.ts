import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { ColorService } from './color.service';
import { IColor } from './color.interface';

//? @desc    create a new color
//? @route   POST /api/v1/color/create-color
//? @access  private

const createColor = asyncHandler(async (req: Request, res: Response) => {
  const { ...colorData } = req.body;
  const result = await ColorService.createColor(colorData);

  sendResponse<IColor>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Color created successfully!',
    data: result,
  });
});

//? @desc    Fetch all colors
//? @route   GET /api/v1/color
//? @access  public

const getAllColors = asyncHandler(async (req: Request, res: Response) => {
  const result = await ColorService.getAllColors();

  sendResponse<IColor[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Colors fetched successfully!',
    data: result,
  });
});

//? @desc    Fetch all colors
//? @route   GET /api/v1/color/active
//? @access  public

const getActiveColors = asyncHandler(async (req: Request, res: Response) => {
  const result = await ColorService.getActiveColors();

  sendResponse<IColor[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Active Colors fetched successfully!',
    data: result,
  });
});

//? @desc    Fetch a color by id
//? @route   GET /api/v1/color/:id
//? @access  public

const getColorById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ColorService.getColorById(id);

  sendResponse<IColor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Color fetched successfully!',
    data: result,
  });
});

//? @desc    update a color
//? @route   PATCH /api/v1/color/update-color/:id
//? @access  private

const updateColor = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...colorData } = req.body;
  const result = await ColorService.updateColor(id, colorData);

  sendResponse<IColor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Color updated successfully!',
    data: result,
  });
});

export const ColorController = {
  createColor,
  getAllColors,
  getActiveColors,
  getColorById,
  updateColor,
};
