import {
  loginUserPayloadSchema,
  registerUserPayloadSchema
} from '@discente/shared';

import { Router } from 'express';
import { authController } from '../controllers';
import { validateData } from '../middlewares';

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

export default authRouter;