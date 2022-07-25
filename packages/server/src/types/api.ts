import { Course, Prisma, User } from '@prisma/client';
import { CourseWithInstructor, UserWithoutSecretFields } from './data';

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

export type SortOrder = 'asc' | 'desc';

export type PaginationPayload<Sort extends string> = Record<string, any> & {
  cursor: string | null;
  take: number;
  sort: Sort;
  order: SortOrder;
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
  'name' | 'username' | 'email' | 'role'
> & { password: string };
export type RegisterUser = ApiRequest<
  RegisterUserPayload,
  UserWithoutSecretFields
>;

type LoginUserPayload = {
  password: string;
  usernameOrEmail: string;
  remember?: boolean;
};
export type LoginUser = ApiRequest<LoginUserPayload, UserWithoutSecretFields>;

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
  Partial<Pick<User, 'name' | 'status'>>;
export type UpdateUser = ApiRequest<UpdateUserPayload, UserWithoutSecretFields>;

type CreateCoursePayload = Pick<
  Course,
  | 'description'
  | 'image'
  | 'price'
  | 'status'
  | 'tags'
  | 'title'
  | 'briefDescription'
>;
export type CreateCourse = ApiRequest<CreateCoursePayload, Course>;

export type PaginatedCourses = Paginated<CourseWithInstructor>;
export type CourseSortableFields =
  | 'title'
  | 'createdAt'
  | 'updatedAt'
  | 'price'
  | 'ratings'
  | 'enrolled'
  | 'status';
export type GetPaginatedCourses = ApiRequest<
  PaginationPayload<CourseSortableFields>,
  PaginatedCourses
>;
