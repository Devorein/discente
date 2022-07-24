import { NextFunction, Request, Response } from 'express';
import { BaseSchema } from 'yup';
import ApiError from '../ApiError';

import { ErrorApiResponse } from '../types';
import { handleError } from '../utils';

const validateData =
  (validationSchema: BaseSchema, checkQuery?: boolean) =>
  async (
    req: Request<any, any, any, any>,
    res: Response<ErrorApiResponse>,
    next: NextFunction
  ) => {
    try {
      if (checkQuery && !req.query) {
        throw new ApiError('Query is required', 400);
      } else if (!checkQuery && !req.body) {
        throw new ApiError('Payload is required', 400);
      }
      // throws an error if not valid
      const validatedData = await validationSchema.validate(
        checkQuery ? req.query : req.body
      );
      if (checkQuery) {
        req.query = validatedData;
      } else {
        req.body = validatedData;
      }
      next();
    } catch (err) {
      handleError(res, new ApiError(err.message, 400));
    }
  };

export default validateData;
