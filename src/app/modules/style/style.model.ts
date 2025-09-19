import { Schema, model } from 'mongoose';
import { IStyle, styleModel } from './style.interface';

const styleSchema = new Schema<IStyle>({
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

export const Style = model<IStyle, styleModel>('Style', styleSchema);
