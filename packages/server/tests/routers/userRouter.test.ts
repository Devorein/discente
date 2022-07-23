import { User } from '@prisma/client';
import { v4 } from 'uuid';
import { registerUser } from '../../src/models/User';
import userRouter from '../../src/routers/userRouter';
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
    name: "John Doe",
    role: "learner"
  });

  user1Token = getUserToken(user1);
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