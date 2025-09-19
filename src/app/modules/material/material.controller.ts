import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { MaterialService } from './material.service';
import { IMaterial } from './material.interface';

//? @desc    create a new material
//? @route   POST /api/v1/material/create-material
//? @access  private

const createMaterial = asyncHandler(async (req: Request, res: Response) => {
  const { ...materialData } = req.body;
  const result = await MaterialService.createMaterial(materialData);

  sendResponse<IMaterial>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Material created successfully!',
    data: result,
  });
});

//? @desc    Fetch all materials
//? @route   GET /api/v1/material
//? @access  public

const getAllMaterials = asyncHandler(async (req: Request, res: Response) => {
  const result = await MaterialService.getAllMaterials();

  sendResponse<IMaterial[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Materials fetched successfully!',
    data: result,
  });
});

//? @desc    Fetch active materials
//? @route   GET /api/v1/material/active
//? @access  public

const getActiveMaterials = asyncHandler(async (req: Request, res: Response) => {
  const result = await MaterialService.getActiveMaterials();

  sendResponse<IMaterial[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Active Materials fetched successfully!',
    data: result,
  });
});

//? @desc    Fetch a material by id
//? @route   GET /api/v1/material/:id
//? @access  public

const getMaterial = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await MaterialService.getMaterial(id);

  sendResponse<IMaterial>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Material fetched successfully!',
    data: result,
  });
});

//? @desc    update a new material
//? @route   PATCH /api/v1/material/:id
//? @access  private

const updateMaterial = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...materialData } = req.body;
  const result = await MaterialService.updateMaterial(id, materialData);

  sendResponse<IMaterial>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Material updated successfully!',
    data: result,
  });
});

export const MaterialController = {
  createMaterial,
  getAllMaterials,
  getActiveMaterials,
  getMaterial,
  updateMaterial,
};
