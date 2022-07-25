import { Prisma, User } from '@prisma/client';
import { ApiRequest, Paginated, PaginationPayload } from './api';
import { UserWithoutSecretFields } from './data';

export type RegisterUser = ApiRequest<
  Pick<Prisma.UserCreateInput, 'name' | 'username' | 'email' | 'role'> & {
    password: string;
  },
  UserWithoutSecretFields
>;

export type LoginUser = ApiRequest<
  {
    password: string;
    usernameOrEmail: string;
    remember?: boolean;
  },
  UserWithoutSecretFields
>;

export type UserSortableFields =
  | 'createdAt'
  | 'updatedAt'
  | 'name'
  | 'username'
  | 'status';
export type PaginatedUsers = Paginated<UserWithoutSecretFields>;
export type GetPaginatedUsers = ApiRequest<
  PaginationPayload<UserSortableFields>,
  PaginatedUsers
>;

export type GetCurrentUser = ApiRequest<null, UserWithoutSecretFields>;

export type ChangeUserPassword = ApiRequest<{
  currentPassword: string;
  newPassword: string;
}>;

export type LogoutUser = ApiRequest<{
  allDevices?: boolean;
}>;

export type DeleteUser = ApiRequest;

export type UpdateUser = ApiRequest<
  Pick<User, 'username' | 'email'> & Partial<Pick<User, 'name' | 'status'>>,
  UserWithoutSecretFields
>;
