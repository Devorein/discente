import { Response } from 'express';
import ApiError from '../ApiError';
import { ErrorApiResponse, SuccessApiResponse } from '../types';
import Logger from './logger';

/**
 * Handles the Error Response
 * @param res Express Response
 * @param err Error if any
 * @param statusCode Status Code
 * @param message Message
 */
function handleError(
  res: Response<ErrorApiResponse>,
  err?: ApiError | Error,
  statusCode: number = 500,
  message: string = 'Something went wrong, please try again!'
) {
  if (err instanceof ApiError) return err.handleResponse(res);
  res.status(statusCode)
  res.json({
    status: 'error',
    error: err?.message || message
  });
  return Logger.error(err);
}

/**
 * Handles the Success Response
 * @param res Express Response
 * @param data Response Data
 * @param statusCode Status code
 */
function handleSuccess<SuccessData>(
  res: Response<SuccessApiResponse<SuccessData>>,
  data: SuccessData,
  statusCode?: number
) {
  res.status(statusCode || 200)
  res.json({
    status: 'success',
    data
  });
}

export { handleError, handleSuccess };
