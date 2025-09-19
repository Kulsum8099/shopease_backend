import { Model } from 'mongoose';

export type IContact = {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  createdAt?: Date;
};

export type ContactModel = Model<IContact, Record<string, unknown>>;
