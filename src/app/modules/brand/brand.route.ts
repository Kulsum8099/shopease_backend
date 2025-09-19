import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BrandController } from './brand.controller';
import { BrandValidation } from './brand.validation';
import { upload } from '../../util/multerConfig';
import authenticate from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-brand',
  authenticate,
  upload.single('logo'),
  validateRequest(BrandValidation.createBrandZodSchema),
  BrandController.createBrand
);

router.get('/', BrandController.getBrands);

router.get('/active', BrandController.getActiveBrands);

router.get('/:id', BrandController.getBrand);

// router.put(
//   'update-brand/:id',
//   upload.single('logo'),
//   // validateRequest(BrandValidation.updateBrandZodSchema),
//   BrandController.updateBrand
// );

router.patch(
  '/update-brand/:id',
  authenticate,
  upload.single('logo'),
  BrandController.updateBrand
);

export const BrandRoutes = router;
