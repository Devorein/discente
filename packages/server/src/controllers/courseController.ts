import { Request, Response } from 'express';
import { CreateCourse } from '../types';

const courseController = {
  create: async (
    req: Request<any, any, CreateCourse['payload']>,
    res: Response<CreateCourse['response']>
  ) => {}
};

export default courseController;
