import { Course } from '@prisma/client';

export function expectCourseResponse(
  {
    description,
    image,
    price,
    status,
    tags,
    title
  }: Pick<
    Course,
    'description' | 'image' | 'price' | 'tags' | 'title' | 'status'
  > &
    Partial<Course>,
  response: Course
) {
  expect(response).toMatchObject<Course>({
    description,
    image,
    price,
    tags,
    title,
    status,
    createdBy: expect.any(String),
    id: expect.any(String),
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
  });
}
