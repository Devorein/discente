import { prisma } from '../config';
import {
  CourseWithInstructor,
  CreateCourse,
  GetPaginatedCourses,
  PaginatedCourses,
  Prisma
} from '../types';

export async function createCourse(
  payload: CreateCourse['payload'],
  createdBy: string
) {
  const createdCourse = await prisma.course.create({
    data: {
      description: payload.description,
      image: payload.image,
      price: payload.price,
      title: payload.title,
      createdBy,
      status: payload.status,
      tags: payload.tags
    }
  });

  return createdCourse;
}

export async function getCreatedCourses(
  payload: GetPaginatedCourses['payload'],
  userId: string
): Promise<PaginatedCourses> {
  const totalCreatedCourses = await prisma.course.count({
    where: {
      createdBy: userId
    }
  });
  const courseFindManyArgs: Prisma.CourseFindManyArgs = {
    select: {
      id: true,
      createdAt: true,
      createdBy: true,
      description: true,
      image: true,
      price: true,
      tags: true,
      instructor: {
        select: {
          name: true,
          avatar: true,
          id: true,
          username: true
        }
      },
      status: true,
      title: true,
      updatedAt: true
    },
    // TODO: fix for ratings and enrolled as they are aggregated values
    orderBy: [
      {
        [payload.sort]: payload.order
      },
      {
        id: payload.order
      }
    ],
    where: {
      createdBy: userId
    }
  };

  if (payload.cursor) {
    courseFindManyArgs.skip = 1;
    courseFindManyArgs.cursor = {
      id: payload.cursor
    };
  }
  courseFindManyArgs.take = payload.take;

  const paginatedCourses = (await prisma.course.findMany(
    courseFindManyArgs
  )) as unknown as CourseWithInstructor[];

  return {
    items: paginatedCourses,
    total: totalCreatedCourses,
    next:
      paginatedCourses.length < payload.take
        ? null
        : paginatedCourses[paginatedCourses.length - 1]?.id
  };
}
