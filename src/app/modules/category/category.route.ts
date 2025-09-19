import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validation';
import { CategoryController } from './category.controller';
import authenticate from '../../middlewares/auth';
import { upload } from '../../util/multerConfig';
const router = express.Router();

router.post(
  '/create-category',
  authenticate,
  upload.single('logo'),
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryController.createCategory
);

router.get('/', CategoryController.getAllCategories);

router.get('/active', CategoryController.getActiveCategories);

router.get('/:id', CategoryController.getCategory);

router.patch(
  '/update-category/:id',
  authenticate,
    upload.single('logo'),
  CategoryController.updateCategory
);

export const CategoryRoutes = router;
