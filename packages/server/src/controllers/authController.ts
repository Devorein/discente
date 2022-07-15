import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { changePasswordById, incrementTokenVersionById, loginUser, registerUser } from '../models';
import { ApiResponse, ChangeUserPasswordPayload, GetCurrentUserResponse, LoginUserPayload, LoginUserResponse, LogoutUserPayload, RegisterUserPayload, RegisterUserResponse } from '../types';
import { addCookieToResponse, handleError, handleSuccess, removeCookieFromResponse, removeSecretUserFields, verifyPassword } from '../utils';

const authController = {
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

  logout: async (
    req: Request<any, any, LogoutUserPayload>,
    res: Response<ApiResponse<undefined>>
  ) => {
    try {
      removeCookieFromResponse(res);
      if (req.body?.allDevices) {
        await incrementTokenVersionById(req.user!.id);
      }
      return handleSuccess<undefined>(res, undefined);
    } catch (err) {
      return handleError(res, err);
    }
  },

  changePassword: async (
    req: Request<any, any, ChangeUserPasswordPayload>,
    res: Response<ApiResponse<undefined>>
  ) => {
    try {
      const user = req.user as User;
      await verifyPassword(user.hashedPass!, req.body.currentPassword);
      await changePasswordById(user.id, req.body.newPassword);
      removeCookieFromResponse(res);
      handleSuccess(res, undefined);
    } catch (err) {
      handleError(res, err);
    }
  },

  me: async (
    req: Request,
    res: Response<ApiResponse<GetCurrentUserResponse>>
  ) => {
    try {
      const loggedInUser = removeSecretUserFields(
        req.user!
      );
      return handleSuccess<GetCurrentUserResponse>(res, loggedInUser);
    } catch (err) {
      return handleError(res, err);
    }
  }
}

export default authController;