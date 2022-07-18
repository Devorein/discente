import { Request, Response } from 'express';
import { deleteUserById, updateUserById } from '../models/User';
import { DeleteUser, UpdateUser, User } from '../types';
import {
  handleError,
  handleSuccess,
  removeCookieFromResponse,
  removeSecretUserFields
} from '../utils';

const userController = {
  update: async (
    req: Request<any, any, UpdateUser['payload']>,
    res: Response<UpdateUser['response']>
  ) => {
    try {
      const user = req.user as User;
      const updateData = req.body;
      const resUser = await updateUserById(user.id, updateData);
      return handleSuccess<UpdateUser['data']>(
        res,
        removeSecretUserFields(resUser)
      );
    } catch (err) {
      return handleError(res, err);
    }
  },

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
