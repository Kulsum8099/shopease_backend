import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ContactController } from './contact.controller';
import { ContactValidation } from './contact.validation';
import authenticate from '../../middlewares/auth';

const router = express.Router();

// Public: Anyone can send a contact message
router.post(
  '/create-contact',
  validateRequest(ContactValidation.createContactZodSchema),
  ContactController.createContact
);

// Admin-only: See all messages
router.get('/', authenticate, ContactController.getContacts);

export const ContactRoutes = router;
