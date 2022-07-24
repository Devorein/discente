import { User } from '@prisma/client';
import { v4 } from 'uuid';
import courseController from '../../src/controllers/courseController';
import { registerUser } from '../../src/models/User';
import { CreateCourse, SuccessApiResponse } from '../../src/types';
import { expectCourseResponse } from '../helpers/course';
import { mockRequest, mockResponse } from '../helpers/mocks';

// test this user for updating
let instructor: User;
const userPassword = 'Secret123$$';

beforeAll(async () => {
  instructor = await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: v4().slice(0, 10),
    name: 'John Doe',
    role: 'teacher'
  });
});

describe('courseController.create', () => {
  it('should create course without any errors', async () => {
    const createCoursePayload: CreateCourse['payload'] = {
      description: 'description',
      image: 'image',
      price: 0,
      status: 'private',
      tags: ['tag 1'],
      title: 'title'
    };

    const mockedRequest = mockRequest<CreateCourse['payload']>({
      user: {
        id: instructor.id
      },
      body: createCoursePayload
    });
    const mockedResponse = mockResponse();
    await courseController.create(mockedRequest, mockedResponse);
    const mockedResponseData = mockedResponse.mockedJson.mock
      .calls[0][0] as SuccessApiResponse<CreateCourse['data']>;

    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expectCourseResponse(createCoursePayload, mockedResponseData.data);
  });
});
