import { User } from "@prisma/client";
import { v4 } from "uuid";
import { registerUser } from "../../src/models";
import authRouter from "../../src/routers/authRouter";
import {
  LoginUserPayload,
  RegisterUserPayload
} from '../../src/types';
import { getUserToken, hashPassword } from "../../src/utils";
import { createSupertestAssertions } from '../helpers/supertest';

const { assertSupertestErrorRequest, assertSupertestSuccessRequest, router } = createSupertestAssertions()

router.use('/auth', authRouter);

let user: User;
const userPassword = 'Secret123$';
let userToken: string;

beforeAll(async () => {
  user = await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: v4().slice(0, 10),
    name: 'John Doe'
  })
  userToken = getUserToken(user)
})

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

describe('POST /auth/login', () => {
  it(`Should fail if incorrect payload is passed`, async () => {
    await assertSupertestErrorRequest({
      endpoint: 'auth/login',
      method: "post",
      statusCode: 400,
      payload: {
        name: "Hello World"
      }
    })
  })

  it(`Should pass if correct payload is passed`, async () => {
    await assertSupertestSuccessRequest<LoginUserPayload>({
      endpoint: 'auth/login',
      method: "post",
      payload: {
        usernameOrEmail: user.username,
        password: userPassword
      }
    })
  })
})

describe.only('POST /auth/logout', () => {
  it(`Should fail if no cookie is passed`, async () => {
    await assertSupertestErrorRequest({
      endpoint: 'auth/logout',
      method: "post",
      statusCode: 401,
    })
  })

  it.only(`Should pass if cookie is passed`, async () => {
    await assertSupertestSuccessRequest({
      endpoint: 'auth/logout',
      method: "post",
      cookie: userToken
    })
  })
})