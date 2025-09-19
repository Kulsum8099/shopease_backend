import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { StyleService } from './style.service';
import { IStyle } from './style.interface';

//? @desc    create a new style
//? @route   POST /api/v1/style/create-style
//? @access  private

const createStyle = asyncHandler(async (req: Request, res: Response) => {
  const { ...styleData } = req.body;
  const result = await StyleService.createStyle(styleData);

  sendResponse<IStyle>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Style created successfully!',
    data: result,
  });
});

//? @desc    Fetch all styles
//? @route   GET /api/v1/style
//? @access  public

const getAllStyles = asyncHandler(async (req: Request, res: Response) => {
  const result = await StyleService.getAllStyles();

  sendResponse<IStyle[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Styles fetched successfully!',
    data: result,
  });
});

//? @desc    Fetch active styles
//? @route   GET /api/v1/style/active
//? @access  public

const getActiveStyles = asyncHandler(async (req: Request, res: Response) => {
  const result = await StyleService.getActiveStyles();

  sendResponse<IStyle[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Active Styles fetched successfully!',
    data: result,
  });
});

//? @desc    Fetch a style by id
//? @route   GET /api/v1/style/:id
//? @access  public

const getStyleById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await StyleService.getStyleById(id);

  sendResponse<IStyle>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Style fetched successfully!',
    data: result,
  });
});

//? @desc    update a style
//? @route   PATCH /api/v1/style/update-style/:id
//? @access  private

const updateStyle = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...styleData } = req.body;
  const result = await StyleService.updateStyle(id, styleData);

  sendResponse<IStyle>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Style updated successfully!',
    data: result,
  });
});

export const StyleController = {
  createStyle,
  getAllStyles,
  getActiveStyles,
  getStyleById,
  updateStyle,
};
