import { Model } from 'mongoose';

export type IMaterial = {
  name: string;
  description: string;
  activeStatus: boolean;
};

export type materialModel = Model<IMaterial, Record<string, unknown>>;
