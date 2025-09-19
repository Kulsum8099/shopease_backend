import { Model } from 'mongoose';

export type IColor = {
  name: string;
  code: string;
  description: string;
  activeStatus: boolean;
};

export type colorModel = Model<IColor, Record<string, unknown>>;
