import { Model } from 'mongoose';

export type IBrand = {
  name: string;
  logo: string;
  description?: string;
  activeStatus: boolean;
};

export type brandModel = Model<IBrand, Record<string, unknown>>;
