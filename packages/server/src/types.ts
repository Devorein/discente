import type { Prisma, User } from '@prisma/client';

export interface ErrorApiResponse {
  status: 'error';
  error: string;
}
export interface SuccessApiResponse<data> {
  status: 'success';
  data: data;
}
export type ApiResponse<Data> = SuccessApiResponse<Data> | ErrorApiResponse;

// Model types
export type UserWithoutSecretFields = Omit<User, 'hashedPass' | 'tokenVersion'>;

export type UserJWTPayload = Omit<
  User,
  'createdAt' | 'updatedAt' | 'name' | 'hashedPass' | 'avatar' | 'status'
>;

// API payload and response types

export type RegisterUserPayload = Pick<
  Prisma.UserCreateInput,
  'name' | 'username' | 'email'
> & { password: string };

export type RegisterUserResponse = UserWithoutSecretFields;

export type LoginUserPayload = {
  password: string;
  usernameOrEmail: string;
  remember?: boolean;
};

export type LoginUserResponse = UserWithoutSecretFields

export type LogoutUserPayload = {
  allDevices?: boolean;
};

export type GetCurrentUserResponse = UserWithoutSecretFields

export type ChangeUserPasswordPayload = {
  currentPassword: string;
  newPassword: string;
};