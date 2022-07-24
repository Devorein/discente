import { createCoursePayloadSchema } from '@discente/shared';
import { Router } from 'express';
import { courseController } from '../controllers';
import { isAuthenticated, isAuthorized, validateData } from '../middlewares';

const courseRouter = Router();

courseRouter.post(
  '/',
  validateData(createCoursePayloadSchema()),
  isAuthenticated,
  isAuthorized(['teacher']),
  courseController.create
);

export default courseRouter;