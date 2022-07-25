import { Request, Response } from 'express';
import { createCourse, getCreatedCourses } from '../models';
import { CreateCourse, GetPaginatedCourses, User } from '../types';
import { handleError, handleSuccess } from '../utils';

const courseController = {
  getCreated: async (
    req: Request,
    res: Response<GetPaginatedCourses['response']>
  ) => {
    try {
      const userId = (req.user as User).id;
      const myCourses = await getCreatedCourses(
        req.query as GetPaginatedCourses['payload'],
        userId
      );
      return handleSuccess<GetPaginatedCourses['data']>(res, myCourses);
    } catch (err) {
      return handleError(res, err);
    }
  },

  create: async (
    req: Request<any, any, CreateCourse['payload']>,
    res: Response<CreateCourse['response']>
  ) => {
    try {
      const userId = (req.user as User).id;
      const createdCourse = await createCourse(req.body, userId);
      return handleSuccess<CreateCourse['data']>(res, createdCourse);
    } catch (err) {
      return handleError(res, err);
    }
  }
};

export default courseController;
