import { Model } from 'mongoose';

export type IInstallationType = {
  name: string;
  description: string;
  activeStatus: boolean;
};

export type installationTypeModel = Model<
  IInstallationType,
  Record<string, unknown>
>;
