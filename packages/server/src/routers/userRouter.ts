import { updateUserPayloadSchema } from "@discente/shared";
import { Router } from 'express';
import { userController } from '../controllers';
import { isAuthenticated, validateData } from '../middlewares';

const userRouter = Router();

userRouter.put(
  '/',
  validateData(updateUserPayloadSchema()),
  isAuthenticated,
  userController.update
);

userRouter.delete(
  '/',
  isAuthenticated,
  userController.delete
);

export default userRouter;
