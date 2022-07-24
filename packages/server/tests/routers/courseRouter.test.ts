import { v4 } from 'uuid';
import { registerUser } from '../../src/models';
import courseRouter from '../../src/routers/courseRouter';
import { CreateCourse, User } from '../../src/types';
import { getUserToken } from '../../src/utils';
import { createSupertestAssertions } from '../helpers/supertest';

const { assertSupertestErrorRequest, assertSupertestSuccessRequest, router } =
  createSupertestAssertions();

router.use('/course', courseRouter);

let learner: User;
let instructor: User;
const userPassword = 'Secret123$';
let learnerToken: string;
let instructorToken: string;

beforeAll(async () => {
  learner = await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: v4().slice(0, 10),
    name: 'John Doe',
    role: 'learner'
  });

  instructor = await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: v4().slice(0, 10),
    name: 'John Doe',
    role: 'teacher'
  });

  learnerToken = getUserToken(learner);
  instructorToken = getUserToken(instructor);
});

describe('POST /course', () => {
  it(`Should fail if incorrect payload is passed`, async () => {
    await assertSupertestErrorRequest({
      endpoint: 'course',
      method: 'post',
      payload: {
        data: '123'
      },
      statusCode: 400
    });
  });

  it(`Should fail if no cookie is passed`, async () => {
    await assertSupertestErrorRequest<CreateCourse['payload']>({
      endpoint: 'course',
      method: 'post',
      payload: {
        description: 'description',
        image: 'image',
        price: 0,
        status: 'private',
        tags: [],
        title: 'title'
      },
      statusCode: 401
    });
  });

  it(`Should fail if the user is not an instructor`, async () => {
    await assertSupertestErrorRequest<CreateCourse['payload']>({
      endpoint: 'course',
      method: 'post',
      payload: {
        description: 'description',
        image: 'image',
        price: 0,
        status: 'private',
        tags: [],
        title: 'title'
      },
      cookie: learnerToken,
      statusCode: 403
    });
  });

  it(`Should pass if the user is an instructor`, async () => {
    await assertSupertestSuccessRequest<CreateCourse['payload']>({
      endpoint: 'course',
      method: 'post',
      payload: {
        description: 'description',
        image: 'image',
        price: 0,
        status: 'private',
        tags: ['tag 1'],
        title: 'title'
      },
      cookie: instructorToken
    });
  });
});
