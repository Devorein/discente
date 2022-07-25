import { CourseSortableFields } from '@discente/shared';
import { Course } from '@prisma/client';
import { ApiRequest, Paginated, PaginationPayload } from './api';
import { CourseWithInstructor } from './data';

export type CreateCourse = ApiRequest<
  Pick<
    Course,
    | 'description'
    | 'image'
    | 'price'
    | 'status'
    | 'tags'
    | 'title'
    | 'briefDescription'
    | 'category'
    | 'language'
    | 'level'
    | 'subtitle'
  >,
  Course
>;

export type PaginatedCourses = Paginated<CourseWithInstructor>;

export type GetPaginatedCourses = ApiRequest<
  PaginationPayload<CourseSortableFields>,
  PaginatedCourses
>;
