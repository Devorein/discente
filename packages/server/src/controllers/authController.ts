import { Request, Response } from 'express';
import { registerUser } from '../models';
import { ApiResponse, RegisterUserPayload, RegisterUserResponse } from '../types';
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
}