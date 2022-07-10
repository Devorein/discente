import {
  changeUserPasswordPayloadSchema, loginUserPayloadSchema,
  registerUserPayloadSchema
} from '@discente/shared';

import { Router } from 'express';
import { authController } from '../controllers';
import { isAuthenticated, validateData } from '../middlewares';

const authRouter = Router();

authRouter.post(
  '/register',
  validateData(registerUserPayloadSchema()),
  authController.register
);

authRouter.post(
  '/login',
  validateData(loginUserPayloadSchema()),
  authController.login
);

authRouter.put(
  '/change-password',
  validateData(changeUserPasswordPayloadSchema()),
  isAuthenticated,
  authController.changePassword
);

authRouter.post('/logout', isAuthenticated, authController.logout);
authRouter.get('/me', isAuthenticated, authController.me)

export default authRouter;