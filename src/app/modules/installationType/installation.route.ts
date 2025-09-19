import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { InstallationTypeValidation } from './installation.validation';
import { InstallationTypeController } from './installation.controller';
import authenticate from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-installation-type',
  authenticate,
  validateRequest(InstallationTypeValidation.createInstallationZodSchema),
  InstallationTypeController.createInstallationType
);

router.get('/', InstallationTypeController.getAllInstallationTypes);

router.get('/active', InstallationTypeController.getActiveInstallationTypes);

router.get('/:id', InstallationTypeController.getInstallationTypeById);

router.patch(
  '/update-installation-type/:id',
  authenticate,
  validateRequest(InstallationTypeValidation.updateInstallationZodSchema),
  InstallationTypeController.updateInstallationType
);

export const InstallationTypeRoutes = router;
