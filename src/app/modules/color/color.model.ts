import { Schema, model } from 'mongoose';
import { colorModel, IColor } from './color.interface';

const colorSchema = new Schema<IColor>({
  name: {
    type: 'string',
    required: true,
    trim: true,
  },
  code: {
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

export const Color = model<IColor, colorModel>('Color', colorSchema);
