import { prisma } from '../config';
import { CreateCourse } from '../types';

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
