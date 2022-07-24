import { User } from '@prisma/client';
import { v4 } from 'uuid';
import { createCourse, registerUser } from '../../src/models';
import { CreateCourse } from '../../src/types';
import { expectCourseResponse } from '../helpers/course';

let instructor: User;
const userPassword = 'Secret123$';

beforeAll(async () => {
  instructor = await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: `${v4()}1`,
    name: 'John Doe',
    role: 'instructor'
  });
});

describe('createCourse', () => {
  it(`Should create course`, async () => {
    const createCoursePayload: CreateCourse['payload'] = {
      description: 'description',
      image: 'image',
      price: 0,
      status: 'private',
      tags: ['tag 1'],
      title: 'title'
    };
    const createdCourse = await createCourse(
      createCoursePayload,
      instructor.id
    );
    expectCourseResponse(createCoursePayload, createdCourse);
  });
});
