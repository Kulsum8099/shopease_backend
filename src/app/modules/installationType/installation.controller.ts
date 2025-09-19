import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { InstallationTypeService } from './installation.service';
import { IInstallationType } from './installation.interface';

//? @desc    create a new installation type
//? @route   POST /api/v1/installation-types/create-installation-type
//? @access  private

const createInstallationType = asyncHandler(
  async (req: Request, res: Response) => {
    const { ...installationTypeData } = req.body;
    const result = await InstallationTypeService.createInstallationType(
      installationTypeData
    );

    sendResponse<IInstallationType>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Installation type created successfully!',
      data: result,
    });
  }
);

//? @desc    Fetch all installation types
//? @route   GET /api/v1/installation-types
//? @access  public

const getAllInstallationTypes = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await InstallationTypeService.getAllInstallationTypes();

    sendResponse<IInstallationType[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Installation types fetched successfully!',
      data: result,
    });
  }
);

//? @desc    Fetch all installation types
//? @route   GET /api/v1/installation-types
//? @access  public

const getActiveInstallationTypes = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await InstallationTypeService.getActiveInstallationTypes();

    sendResponse<IInstallationType[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Active Installation types fetched successfully!',
      data: result,
    });
  }
);

//? @desc    Fetch a installation type by id
//? @route   GET /api/v1/installation-types/:id
//? @access  public

const getInstallationTypeById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await InstallationTypeService.getInstallationTypeById(id);

    sendResponse<IInstallationType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Installation type fetched successfully!',
      data: result,
    });
  }
);

//? @desc    update an installation type
//? @route   PATCH /api/v1/installation-types/update-installation-type/:id
//? @access  private

const updateInstallationType = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...installationTypeData } = req.body;
    const result = await InstallationTypeService.updateInstallationType(
      id,
      installationTypeData
    );

    sendResponse<IInstallationType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Installation type updated successfully!',
      data: result,
    });
  }
);

export const InstallationTypeController = {
  createInstallationType,
  getAllInstallationTypes,
  getActiveInstallationTypes,
  getInstallationTypeById,
  updateInstallationType,
};
