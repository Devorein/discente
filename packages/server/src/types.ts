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

export type UserWithoutSecretFields = Omit<User, 'hashedPass' | 'tokenVersion'>;

// API payload and response types

export type RegisterUserPayload = Pick<
  Prisma.UserCreateInput,
  'name' | 'username' | 'email'
> & { password: string };

export type RegisterUserResponse = UserWithoutSecretFields;
