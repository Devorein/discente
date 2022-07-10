import { v4 } from "uuid";
import authRouter from "../../src/routers/authRouter";
import {
  RegisterUserPayload
} from '../../src/types';
import { hashPassword } from "../../src/utils";
import { createSupertestAssertions } from '../helpers/supertest';

const { assertSupertestErrorRequest, assertSupertestSuccessRequest, router } = createSupertestAssertions()

router.use('/auth', authRouter);

const userPassword = 'Secret123$';

describe('POST /auth/register', () => {
  it(`Should fail if incorrect payload is passed`, async () => {
    await assertSupertestErrorRequest({
      endpoint: 'auth/register',
      method: "post",
      statusCode: 400,
      payload: {
        name: "Hello World"
      }
    })
  })

  it(`Should pass if payload is correct`, async () => {
    await assertSupertestSuccessRequest<RegisterUserPayload>({
      endpoint: 'auth/register',
      method: "post",
      payload: {
        email: `${v4()}@gmail.com`,
        password: await hashPassword(userPassword),
        username: v4().slice(0, 10),
        name: 'John Doe'
      }
    })
  })
})