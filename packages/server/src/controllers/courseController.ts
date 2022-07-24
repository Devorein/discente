import { Request, Response } from 'express';
import { createCourse } from '../models';
import { CreateCourse, User } from '../types';
import { handleError, handleSuccess } from '../utils';

const courseController = {
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
