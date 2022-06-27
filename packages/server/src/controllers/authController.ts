import { Request, Response } from 'express';
import { loginUser, registerUser } from '../models';
import { ApiResponse, LoginUserPayload, LoginUserResponse, RegisterUserPayload, RegisterUserResponse } from '../types';
import { addUserAuthCookieToResponse, handleError, handleSuccess, removeSecretUserFields } from '../utils';

export const authController = {
  register: async (
    req: Request<any, any, RegisterUserPayload>,
    res: Response<ApiResponse<RegisterUserResponse>>
  ) => {
    try {
      const user = await registerUser(req.body);
      addUserAuthCookieToResponse(res, user);
      handleSuccess<RegisterUserResponse>(res, removeSecretUserFields(user));
    } catch (err) {
      handleError(res, err);
    }
  },

  login: async (
    req: Request<any, any, LoginUserPayload>,
    res: Response<ApiResponse<LoginUserResponse>>
  ) => {
    try {
      const user = await loginUser(req.body);
      addUserAuthCookieToResponse(res, user, req.body.remember);
      handleSuccess<LoginUserResponse>(res, removeSecretUserFields(user));
    } catch (err) {
      handleError(res, err);
    }
  },
}