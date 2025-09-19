import { Model } from 'mongoose';
import { IShippingAddress } from '../shipping-address/shipping-address.interface';
export type IUser = {
  email: string;
  password: string;
  refreshTokens: string[];
  fullName: string;
  phoneNumber: string;
  address: string;
  role: 'admin' | 'customer';
  shippingAddresses?: IShippingAddress[];
};

export type ISigninResponse = {
  id: string;
  email: string;
  role: 'admin' | 'customer';
  accessToken: string;
  refreshToken: string;
};

export type IUserResponse = Omit<IUser, 'password' | 'refreshTokens'> & {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type userModel = Model<IUser, Record<string, unknown>>;
