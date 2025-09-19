import { Schema, model } from 'mongoose';
import { ContactModel, IContact } from './contact.interface';

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Contact = model<IContact, ContactModel>('Contact', contactSchema);
