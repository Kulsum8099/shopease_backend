import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { ISigninResponse, IUser } from './auth.interface';
import { AuthService } from './auth.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../product/product.constant';

//? @desc    create a new user
//? @route   POST /api/v1/auth/signup
//? @access  public

const signUp = asyncHandler(async (req: Request, res: Response) => {

  const { ...userData } = req.body;

  const result = await AuthService.signup(userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

//? @desc    sign in
//? @route   POST /api/v1/auth/signin
//? @access  public

const signIn = asyncHandler(async (req: Request, res: Response) => {
  const { ...userData } = req.body;

  const result = await AuthService.signin(userData);

  sendResponse<ISigninResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged in successfully!',
    data: result,
  });
});

//? @desc    refresh token
//? @route   POST /api/v1/auth/refresh-token
//? @access  public

const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { ...refreshToken } = req.body;

  const result = await AuthService.refreshToken(refreshToken);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh token created successfully!',
    data: result,
  });
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { ...updatedData } = req.body;

  const result = await AuthService.updateUser(userId, updatedData);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!',
    data: result,
  });
});


//? @desc    logout
//? @route   POST /api/v1/auth/logout
//? @access  private

const logout = asyncHandler(async (req: Request, res: Response) => {
  const { userId, refreshToken } = req.body;

  const result = await AuthService.logout(userId, refreshToken);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged out successfully!',
    data: result,
  });
});

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  
  // Extract search and role filters
  const filters = {
    searchTerm: req.query.searchTerm as string,
    role: req.query.role as string
  };
  
  const result = await AuthService.getAllUsers(paginationOptions, filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getUserInfo = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'User Id is required',
    });
  }

  const result = await AuthService.getUserById(userId);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully!',
    data: result,
  });
});

const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;

  const userId = req.params.userId;

  const result = await AuthService.changePassword(userId, currentPassword, newPassword);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully!',
    data: result,
  });
});


export const AuthController = {
  signUp,
  signIn,
  refreshToken,
  logout,
  updateUser,
  getUserInfo,
  changePassword,
  getAllUsers
};
