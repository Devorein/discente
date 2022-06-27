import {
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

export default authRouter;