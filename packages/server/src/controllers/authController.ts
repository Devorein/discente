import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { changePasswordById, incrementTokenVersionById, loginUser, registerUser } from '../models';
import { ChangeUserPassword, GetCurrentUser, LoginUser, LogoutUser, RegisterUser } from '../types';
import { addCookieToResponse, handleError, handleSuccess, removeCookieFromResponse, removeSecretUserFields, verifyPassword } from '../utils';

const authController = {
  register: async (
    req: Request<any, any, RegisterUser['payload']>,
    res: Response<RegisterUser['response']>
  ) => {
    try {
      const user = await registerUser(req.body);
      addCookieToResponse(res, user);
      handleSuccess<RegisterUser['data']>(res, removeSecretUserFields(user));
    } catch (err) {
      handleError(res, err);
    }
  },

  login: async (
    req: Request<any, any, LoginUser['payload']>,
    res: Response<LoginUser['response']>
  ) => {
    try {
      const user = await loginUser(req.body);
      addCookieToResponse(res, user, req.body.remember);
      handleSuccess<LoginUser['data']>(res, removeSecretUserFields(user));
    } catch (err) {
      handleError(res, err);
    }
  },

  logout: async (
    req: Request<any, any, LogoutUser['payload']>,
    res: Response<LogoutUser['response']>
  ) => {
    try {
      removeCookieFromResponse(res);
      if (req.body?.allDevices) {
        await incrementTokenVersionById(req.user!.id);
      }
      return handleSuccess<LogoutUser['data']>(res, undefined);
    } catch (err) {
      return handleError(res, err);
    }
  },

  changePassword: async (
    req: Request<any, any, ChangeUserPassword['payload']>,
    res: Response<ChangeUserPassword['response']>
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
    res: Response<GetCurrentUser['response']>
  ) => {
    try {
      const loggedInUser = removeSecretUserFields(
        req.user!
      );
      return handleSuccess<GetCurrentUser['data']>(res, loggedInUser);
    } catch (err) {
      return handleError(res, err);
    }
  }
}

export default authController;