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

export class NotFoundError extends ApiError {
  static statusCode: number = 404;

  static messageConstructor(entity: string) {
    return `Couldn't find ${entity}`
  }

  constructor(entity: string) {
    super(NotFoundError.messageConstructor(entity), NotFoundError.statusCode)
  }
}

export class UserNotFoundError extends NotFoundError {
  static message: string = NotFoundError.messageConstructor('user')

  constructor() {
    super('user')
  }
}

export class IncorrectPasswordError extends ApiError {
  static message: string = 'Incorrect password'

  static statusCode: number = 401

  constructor() {
    super(IncorrectPasswordError.message, IncorrectPasswordError.statusCode)
  }
}

export class NotAuthenticatedError extends ApiError {
  static message: string = 'Not authenticated'

  static statusCode: number = 401

  constructor() {
    super(NotAuthenticatedError.message, NotAuthenticatedError.statusCode)
  }
}

export class UpdateFailedError extends ApiError {
  static statusCode: number = 400

  static messageConstructor(entity: string) {
    return `Failed to update ${entity}`
  }

  constructor(entity: string) {
    super(UpdateFailedError.messageConstructor(entity), UpdateFailedError.statusCode)
  }
}