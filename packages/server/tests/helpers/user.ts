import {
  ApiResponse,
  SuccessApiResponse,
  UserWithoutSecretFields
} from '../../src/types';

export function expectUserApiResponse(
  {
    email = '',
    username = '',
    name = '',
    status = "public",
    avatar = null,
    role = "learner"
  }: Partial<Pick<UserWithoutSecretFields, 'avatar' | 'email' | 'username' | 'name' | "status" | 'role'>>,
  apiResponse: SuccessApiResponse<UserWithoutSecretFields>
) {
  expect(apiResponse).toMatchObject<ApiResponse<UserWithoutSecretFields>>({
    data: expect.objectContaining<UserWithoutSecretFields>({
      email,
      username,
      name,
      id: expect.any(String),
      role,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      avatar,
      status
    }),
    status: 'success'
  });
}

export function expectUserResponse(
  {
    email = '',
    username = '',
    name = '',
    status = 'public',
    avatar = null,
    role = "learner"
  }: Partial<Pick<UserWithoutSecretFields, 'email' | 'username' | 'name' | 'avatar' | 'status' | 'role'>>,
  response: UserWithoutSecretFields
) {
  expect(response).toMatchObject<UserWithoutSecretFields>({
    email,
    username,
    id: expect.any(String),
    name,
    role,
    status,
    avatar,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  });
}