import { Request, Response } from 'express';
import {
  deleteUserById
} from '../models/User';
import {
  DeleteUser, User
} from '../types';
import {
  handleError,
  handleSuccess, removeCookieFromResponse
} from '../utils';

const userController = {
  delete: async (req: Request, res: Response) => {
    try {
      const user = req.user as User;
      await deleteUserById(user.id);
      removeCookieFromResponse(res);
      return handleSuccess<DeleteUser['data']>(res, null);
    } catch (err) {
      return handleError(res, err);
    }
  }
};

export default userController;
