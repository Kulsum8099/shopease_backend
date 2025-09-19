import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StyleValidation } from './style.validation';
import { StyleController } from './style.controller';
import authenticate from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-style',
  authenticate,
  validateRequest(StyleValidation.createStyleZodSchema),
  StyleController.createStyle
);

router.get('/', StyleController.getAllStyles);

router.get('/active', StyleController.getActiveStyles);

router.get('/:id', StyleController.getStyleById);

router.patch(
  '/update-style/:id',
  authenticate,
  validateRequest(StyleValidation.updateStyleZodSchema),
  StyleController.updateStyle
);

export const StyleRoutes = router;
