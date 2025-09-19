import { Model } from 'mongoose';

export type IStyle = {
  name: string;
  description: string;
  activeStatus: boolean;
};

export type styleModel = Model<IStyle, Record<string, unknown>>;
