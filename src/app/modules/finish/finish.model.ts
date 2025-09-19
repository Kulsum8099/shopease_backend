import { Schema, model } from 'mongoose';
import { finishModel, IFinish } from './finish.interface';

const finishSchema = new Schema<IFinish>({
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

export const Finish = model<IFinish, finishModel>('Finish', finishSchema);
