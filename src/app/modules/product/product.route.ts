import express from 'express';
import { ProductController } from './product.controller';
import { upload } from '../../util/multerConfig';
import authenticate from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
// import { ProductValidation } from './product.validation';

const router = express.Router();

router.post(
  '/create-product',
  authenticate,
  // validateRequest(ProductValidation.createProductZodSchema),
  upload.array('images', 10),
  ProductController.createProduct
);

router.get('/', ProductController.getAllProducts);

router.get('/active', ProductController.getActiveProducts);

router.get('/:id', ProductController.getProduct);

router.get('/slug/:slug', ProductController.getProductBySlug);

router.patch(
  '/update-product/:id',
  authenticate,
  // validateRequest(ProductValidation.updateProductZodSchema),
  upload.array('images', 10),
  ProductController.updateProduct
);
router.delete(
  '/delete-image/:id',
  authenticate,
  ProductController.deleteProductImage
);
export const ProductRoutes = router;
