import { Schema, model } from 'mongoose';
import { IMaterial, materialModel } from './material.interface';

const materialSchema = new Schema<IMaterial>({
  name: {
    type: 'string',
    required: true,
  },
  description: {
    type: 'string',
  },
  activeStatus: {
    type: 'boolean',
    default: true,
  },
});

export const Material = model<IMaterial, materialModel>(
  'Material',
  materialSchema
);
