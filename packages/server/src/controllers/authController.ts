import { Request, Response } from 'express';
import { loginUser, registerUser } from '../models';
import { ApiResponse, LoginUserPayload, LoginUserResponse, RegisterUserPayload, RegisterUserResponse } from '../types';
import { addCookieToResponse, handleError, handleSuccess, removeSecretUserFields } from '../utils';

export const authController = {
  register: async (
    req: Request<any, any, RegisterUserPayload>,
    res: Response<ApiResponse<RegisterUserResponse>>
  ) => {
    try {
      const user = await registerUser(req.body);
      addCookieToResponse(res, user);
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
      addCookieToResponse(res, user, req.body.remember);
      handleSuccess<LoginUserResponse>(res, removeSecretUserFields(user));
    } catch (err) {
      handleError(res, err);
    }
  },
}