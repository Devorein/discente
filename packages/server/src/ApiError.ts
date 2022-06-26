import { Response } from 'express';
import { ErrorApiResponse } from './types';
import Logger from './utils/logger';

export default class ApiError extends Error {
  statusCode: number;

  constructor(
    message?: string,
    statusCode?: number,
    errorOptions?: ErrorOptions
  ) {
    super(message || 'Something went wrong, please try again.', errorOptions);
    this.name = 'ApiError';
    this.statusCode = statusCode || 500;
  }

  handleResponse(res: Response<ErrorApiResponse>) {
    res.status(this.statusCode);
    res.json({
      status: 'error',
      error: this.message
    });
    Logger.error(this.message);
  }
}

export class UniqueConstraintViolationError extends ApiError {
  static statusCode: number = 400

  static messageConstructor(entity: string, field: string) {
    return `A ${entity} with that ${field} already exists`
  }

  constructor(entity: string, field: string) {
    super(UniqueConstraintViolationError.messageConstructor(entity, field), UniqueConstraintViolationError.statusCode)
  }
}