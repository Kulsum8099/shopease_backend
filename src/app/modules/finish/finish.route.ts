import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FinishValidation } from './finish.validation';
import { FinishController } from './finish.controller';
import authenticate from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-finish',
  authenticate,
  validateRequest(FinishValidation.createFinishZodSchema),
  FinishController.createFinish
);

router.get('/', FinishController.getAllFinish);

router.get('/active', FinishController.getActiveFinish);

router.get('/:id', FinishController.getFinish);

router.patch(
  '/update-finish/:id',
  authenticate,
  validateRequest(FinishValidation.updateFinishZodSchema),
  FinishController.updateFinish
);

export const FinishRoutes = router;
