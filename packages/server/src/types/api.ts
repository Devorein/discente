import { Prisma, User } from '@prisma/client';
import {
  UserWithoutSecretFields
} from './data';

export interface ErrorApiResponse {
  status: 'error';
  error: string;
}
export interface SuccessApiResponse<data> {
  status: 'success';
  data: data;
}
export type ApiResponse<Data> = SuccessApiResponse<Data> | ErrorApiResponse;
export type Paginated<Data> = {
  items: Data[];
  total: number;
  next: null | string;
};

export type PaginationPayload = Record<string, any> & {
  cursor: string | null;
  take: number;
};

export interface ApiRequest<
  Payload = null | undefined,
  Data = null | undefined
> {
  payload: Payload;
  data: Data;
  response: ApiResponse<Data>;
}

// API PAYLOAD AND RESPONSE TYPES
type RegisterUserPayload = Pick<
  Prisma.UserCreateInput,
  'name' | 'username' | 'email'
> & { password: string };
export type RegisterUser = ApiRequest<RegisterUserPayload, UserWithoutSecretFields>;

type LoginUserPayload = {
  password: string;
  usernameOrEmail: string;
  remember?: boolean;
};
export type LoginUser = ApiRequest<LoginUserPayload, UserWithoutSecretFields>;

export type PaginatedUsers = Paginated<UserWithoutSecretFields>;
export type GetPaginatedUsers = ApiRequest<PaginationPayload, PaginatedUsers>;

export type GetCurrentUser = ApiRequest<null, UserWithoutSecretFields>;

type ChangeUserPasswordPayload = {
  currentPassword: string;
  newPassword: string;
};
export type ChangeUserPassword = ApiRequest<ChangeUserPasswordPayload>;

type LogoutUserPayload = {
  allDevices?: boolean;
};
export type LogoutUser = ApiRequest<LogoutUserPayload>;

export type DeleteUser = ApiRequest;

type UpdateUserPayload = Pick<User, 'username' | 'email'> &
  Partial<Pick<User, 'name' | 'status'>>
export type UpdateUser = ApiRequest<UpdateUserPayload, UserWithoutSecretFields>;