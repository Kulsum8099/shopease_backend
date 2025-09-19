import { Schema, model } from 'mongoose';
import {
  IInstallationType,
  installationTypeModel,
} from './installation.interface';

const installationTypeSchema = new Schema<IInstallationType>({
  name: {
    type: 'string',
    required: true,
    trim: true,
  },
  description: {
    type: 'string',
    trim: true,
  },
  activeStatus: {
    type: 'boolean',
    default: true,
  },
});

export const InstallationType = model<IInstallationType, installationTypeModel>(
  'InstallationType',
  installationTypeSchema
);
