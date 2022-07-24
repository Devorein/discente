import { Router } from 'express';
import { courseController } from '../controllers';
import { isAuthenticated, isAuthorized } from '../middlewares';

const courseRouter = Router();

courseRouter.post(
  '/',
  isAuthenticated,
  isAuthorized(['teacher']),
  courseController.create
);

export default courseRouter;
