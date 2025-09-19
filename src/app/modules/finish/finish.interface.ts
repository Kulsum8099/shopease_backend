import { Model } from 'mongoose';

export type IFinish = {
  name: string;
  description?: string;
  activeStatus: boolean;
};

export type finishModel = Model<IFinish, Record<string, unknown>>;
