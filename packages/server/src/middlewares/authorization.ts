import { UserRole } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { NotAuthenticatedError, NotAuthorizedError } from '../ApiError';
import { handleError } from '../utils';

export default function isAuthorized(roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return handleError(res, new NotAuthenticatedError());
    if (Array.isArray(roles) && roles.includes(req.user.role as UserRole))
      return next();
    return handleError(res, new NotAuthorizedError());
  };
}
