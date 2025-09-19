import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../../shared/asyncHandler';
import sendResponse from '../../../shared/sendResponse';
import { ContactService } from './contact.service';
import { IContact } from './contact.interface';

// POST /create-contact
const createContact = asyncHandler(async (req: Request, res: Response) => {
  const result = await ContactService.createContact(req.body);

  sendResponse<IContact>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Message sent successfully!',
    data: result,
  });
});

// GET /
const getContacts = asyncHandler(async (req: Request, res: Response) => {
  const result = await ContactService.getContacts();

  sendResponse<IContact[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Contacts fetched successfully!',
    data: result,
  });
});

export const ContactController = {
  createContact,
  getContacts,
};
