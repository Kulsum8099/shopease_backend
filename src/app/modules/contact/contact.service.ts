import { IContact } from './contact.interface';
import { Contact } from './contact.model';

const createContact = async (payload: IContact): Promise<IContact> => {
  return await Contact.create(payload);
};

const getContacts = async (): Promise<IContact[]> => {
  return await Contact.find({}).sort({ createdAt: -1 }).lean();
};

export const ContactService = {
  createContact,
  getContacts,
};
