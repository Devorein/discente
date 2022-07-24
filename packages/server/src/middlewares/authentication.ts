import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import ApiError, { NotAuthenticatedError } from '../ApiError';
import { COOKIE_NAME, JWT_SECRET, prisma } from '../config';
import { UserJWTPayload } from '../types';
import { handleError, removeCookieFromResponse } from '../utils';

export default async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies[COOKIE_NAME];

    if (!token) {
      throw new NotAuthenticatedError();
    }
    const data = verify(token, JWT_SECRET) as UserJWTPayload;
    const { id, tokenVersion } = data;
    const userFromDb = await prisma.user.findUnique({
      where: { id }
    });
    if (!userFromDb) throw new NotAuthenticatedError();
    if (userFromDb.tokenVersion !== tokenVersion) {
      removeCookieFromResponse(res);
      throw new NotAuthenticatedError();
    }
    req.user = userFromDb;
    return next();
  } catch (err) {
    if (!(err instanceof ApiError))
      return handleError(res, new NotAuthenticatedError());
    return handleError(res, err);
  }
}
