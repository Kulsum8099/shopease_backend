import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MaterialValidation } from './material.validation';
import { MaterialController } from './material.controller';
import authenticate from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-material',
  authenticate,
  validateRequest(MaterialValidation.createMaterialZodSchema),
  MaterialController.createMaterial
);

router.get('/', MaterialController.getAllMaterials);

router.get('/active', MaterialController.getActiveMaterials);

router.get('/:id', MaterialController.getMaterial);

router.patch(
  '/update-material/:id',
  authenticate,
  MaterialController.updateMaterial
);

export const MaterialRoutes = router;
