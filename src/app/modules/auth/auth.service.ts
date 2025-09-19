import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { comparePassword, hashPassword } from '../../util/hash';
import { ISigninResponse, IUser } from './auth.interface';
import { User } from './auth.model';
import { jwtHelper } from '../../util/jwt';
import { ShippingAddress } from '../shipping-address/shipping-address.model';
import { IPaginationOptions } from '../../interfaces/pagination';
import { paginationHelpers } from '../../util/paginationHelper';

// ? Sign Up

const signup = async (payload: IUser): Promise<IUser | null> => {
  const { email, password } = payload;
  const alreadyExists = await User.findOne({ email });

  if (alreadyExists) {
    throw new ApiError(httpStatus.CONFLICT, 'User already exists');
  }

  const hashedPassword = await hashPassword(password);
  const user = new User({ ...payload, password: hashedPassword });
  return await User.create(user);
};

// ? Sign In

const signin = async (payload: IUser): Promise<ISigninResponse | null> => {
  const { email, password } = payload;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found with this email');
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  const accessToken = jwtHelper.generateAccessToken({
    id: user._id,
    email: user.email,
    role: user.role
  });
  const refreshToken = jwtHelper.generateRefreshToken({
    id: user._id,
    email: user.email,
    role: user.role
  });

  // * Save refresh token in the database

  user.refreshTokens.push(refreshToken);
  await user.save();

  return {
    id: user._id.toString(),
    email,
    role: user.role,
    accessToken,
    refreshToken,
  };
};

// ? Refresh Token

const refreshToken = async (refreshToken: string) => {
  // *  Verify the refresh token

  const decoded = jwtHelper.verifyRefreshToken(refreshToken) as { id: string };

  // * Find the user and validate the refresh token

  const user = await User.findById(decoded.id);
  if (!user || !user.refreshTokens.includes(refreshToken)) {
    throw new Error('Invalid refresh token');
  }

  // * Issue new tokens
  const accessToken = jwtHelper.generateAccessToken({ id: user._id });
  const newRefreshToken = jwtHelper.generateRefreshToken({ id: user._id });

  // * Replace the old refresh token with a new one
  user.refreshTokens = user.refreshTokens.filter(
    token => token !== refreshToken
  );
  user.refreshTokens.push(newRefreshToken);
  await user.save();

  return { accessToken, refreshToken: newRefreshToken };
};
const updateUser = async (userId: string, updatedData: Partial<IUser>) => {
  const user = await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return user;
};

const getAllUsers = async (
  paginationOptions: IPaginationOptions,
  filters?: { searchTerm?: string; role?: string }
) => {
  const {
    page = 1,
    limit = 10,
    skip,
  } = paginationHelpers.calculatePagination(paginationOptions);

  // Build query conditions
  const queryConditions: any = {};
  
  if (filters?.searchTerm) {
    queryConditions.$or = [
      { fullName: { $regex: filters.searchTerm, $options: 'i' } },
      { email: { $regex: filters.searchTerm, $options: 'i' } },
      { phoneNumber: { $regex: filters.searchTerm, $options: 'i' } }
    ];
  }
  
  if (filters?.role && filters.role !== 'all') {
    queryConditions.role = filters.role;
  }

  const users = await User.find(queryConditions)
    .select('-password -refreshTokens')
    .lean()
    .skip(skip)
    .limit(limit);

  const result = users.map(user => ({
    ...user,
    _id: user._id.toString(),
  }));

  const total = await User.countDocuments(queryConditions);

  return {
    meta: { page, limit, total },
    data: result,
  };
};


const getUserById = async (userId: string) => {
  const user = await User.findById(userId).select(
    'fullName address email phoneNumber'
  );

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Get shipping addresses for this user
  const shippingAddresses = await ShippingAddress.find({ userId });

  // Convert user to plain object and add shipping addresses
  const userWithAddresses = user.toObject();
  userWithAddresses.shippingAddresses = shippingAddresses;

  return userWithAddresses;
};

// const getUserById = async (userId: string) => {
//   const user = await User.findById(userId).select(
//     'fullName address email phoneNumber'
//   );

//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }

//   return user;
// };

// ? Logout

const logout = async (userId: string, refreshToken: string) => {
  const user = await User.findById(userId);

  if (!user) throw new Error('User not found');

  // * Remove the refresh token from the database
  user.refreshTokens = user.refreshTokens.filter(
    token => token !== refreshToken
  );
  await user.save();
};

const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  const user = await User.findById(userId).select('+password');

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isMatch = await comparePassword(currentPassword, user.password);
  if (!isMatch) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Current password is incorrect'
    );
  }
  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  await user.save();

  return { message: 'Password changed successfully' };
};

export const AuthService = {
  signup,
  signin,
  refreshToken,
  updateUser,
  logout,
  getUserById,
  changePassword,
  getAllUsers
};
