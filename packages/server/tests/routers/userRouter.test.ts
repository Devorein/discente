import { User } from '@prisma/client';
import { v4 } from 'uuid';
import { registerUser } from '../../src/models/User';
import userRouter from '../../src/routers/userRouter';
import { UpdateUser } from '../../src/types';
import { getUserToken } from '../../src/utils';
import { createSupertestAssertions } from '../helpers/supertest';

const { assertSupertestErrorRequest, assertSupertestSuccessRequest, router } =
  createSupertestAssertions();

router.use('/user', userRouter);

let user1: User;
const userPassword = 'Secret123$';
let user1Token: string;

beforeAll(async () => {
  user1 = await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: v4().slice(0, 10),
    name: "John Doe"
  });

  user1Token = getUserToken(user1);
});

describe('PUT /user', () => {
  it(`Should fail if incorrect payload is passed`, async () => {
    await assertSupertestErrorRequest({
      endpoint: 'user',
      method: 'put',
      payload: {
        data: '123'
      },
      statusCode: 400
    });
  });

  it(`Should fail if no cookie is passed`, async () => {
    await assertSupertestErrorRequest<UpdateUser['payload']>({
      endpoint: 'user',
      method: 'put',
      payload: {
        email: user1.email,
        username: user1.username,
        name: user1.name,
        status: user1.status
      },
      statusCode: 401
    });
  });

  it(`Should pass if cookie is passed`, async () => {
    await assertSupertestSuccessRequest<UpdateUser['payload']>({
      endpoint: 'user',
      method: 'put',
      payload: {
        email: user1.email,
        username: `${user1.username}a`,
        name: user1.name,
        status: user1.status
      },
      cookie: user1Token
    });
  });
});

describe('DEL /user', () => {
  it(`Should fail if no cookie is passed`, async () => {
    await assertSupertestErrorRequest({
      endpoint: 'user',
      method: 'delete',
      statusCode: 401
    });
  });

  it(`Should pass if cookie is passed`, async () => {
    await assertSupertestSuccessRequest({
      endpoint: 'user',
      method: 'delete',
      cookie: user1Token
    });
  });
});