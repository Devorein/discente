import {
  createCoursePayloadSchema,
  getPaginatedCoursesPayloadSchema
} from '@discente/shared';
import { Router } from 'express';
import { courseController } from '../controllers';
import { isAuthenticated, isAuthorized, validateData } from '../middlewares';

const courseRouter = Router();

courseRouter.get(
  '/created',
  validateData(getPaginatedCoursesPayloadSchema()),
  isAuthenticated,
  isAuthorized(['instructor']),
  courseController.getCreated
);

courseRouter.post(
  '/',
  validateData(createCoursePayloadSchema()),
  isAuthenticated,
  isAuthorized(['instructor']),
  courseController.create
);

export default courseRouter;
