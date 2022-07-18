import { Router } from 'express';
import { userController } from '../controllers';
import { isAuthenticated } from '../middlewares';

const userRouter = Router();

userRouter.delete(
  '/',
  isAuthenticated,
  userController.delete
);

export default userRouter;
