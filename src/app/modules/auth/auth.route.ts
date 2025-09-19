import express from 'express';
import { AuthController } from './auth.controller';
import authenticate from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post('/signup', validateRequest(AuthValidation.createUserZodSchema), AuthController.signUp);

router.post('/signin', AuthController.signIn);

router.patch(
  '/update-userInfo/:userId',
  authenticate,
  validateRequest(AuthValidation.updateUserZodSchema),
  AuthController.updateUser
);
router.get(
  '/users',
  AuthController.getAllUsers
);
router.get(
  '/userInfo/:userId',
  AuthController.getUserInfo
)

router.patch(
  "/change-password/:userId",
  authenticate,
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword
);
router.post('/logout', authenticate, AuthController.logout);

export const AuthRoutes = router;
