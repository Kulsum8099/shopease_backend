import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ColorValidation } from './color.validation';
import { ColorController } from './color.controller';

const router = express.Router();

router.post(
  '/create-color',
  validateRequest(ColorValidation.createColorZodSchema),
  ColorController.createColor
);

router.get('/', ColorController.getAllColors);

router.get('/active', ColorController.getActiveColors);

router.get('/:id', ColorController.getColorById);

router.patch(
  '/update-color/:id',
  validateRequest(ColorValidation.updateColorZodSchema),
  ColorController.updateColor
);

export const ColorRoutes = router;
