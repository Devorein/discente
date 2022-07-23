import { User } from "@prisma/client";
import { v4 } from "uuid";
import { registerUser } from "../../src/models";
import authRouter from "../../src/routers/authRouter";
import { ChangeUserPassword, LoginUser, RegisterUser } from "../../src/types";
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
    name: 'John Doe',
    role: "learner"
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
    await assertSupertestSuccessRequest<RegisterUser['payload']>({
      endpoint: 'auth/register',
      method: "post",
      payload: {
        email: `${v4()}@gmail.com`,
        password: await hashPassword(userPassword),
        username: v4().slice(0, 10),
        name: 'John Doe',
        role: "learner"
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
    await assertSupertestSuccessRequest<LoginUser['payload']>({
      endpoint: 'auth/login',
      method: "post",
      payload: {
        usernameOrEmail: user.username,
        password: userPassword
      }
    })
  })
})

describe('POST /auth/logout', () => {
  it(`Should fail if no cookie is passed`, async () => {
    await assertSupertestErrorRequest({
      endpoint: 'auth/logout',
      method: "post",
      statusCode: 401,
    })
  })

  it(`Should pass if cookie is passed`, async () => {
    await assertSupertestSuccessRequest({
      endpoint: 'auth/logout',
      method: "post",
      cookie: userToken
    })
  })
})

describe('GET /auth/me', () => {
  it(`Should fail if no cookie is passed`, async () => {
    await assertSupertestErrorRequest({
      endpoint: 'auth/me',
      method: "get",
      statusCode: 401,
    })
  })

  it(`Should pass if cookie is passed`, async () => {
    await assertSupertestSuccessRequest({
      endpoint: 'auth/me',
      method: "get",
      cookie: userToken
    })
  })
})

describe('PUT /auth/change-password', () => {
  it(`Should fail if incorrect payload is passed`, async () => {
    await assertSupertestErrorRequest({
      endpoint: 'auth/change-password',
      method: "put",
      statusCode: 400,
      payload: {
        unknown: "123"
      }
    })
  })

  it(`Should fail if no cookie is passed`, async () => {
    await assertSupertestErrorRequest<ChangeUserPassword['payload']>({
      endpoint: 'auth/change-password',
      method: "put",
      statusCode: 401,
      payload: {
        currentPassword: "123",
        newPassword: "Secret123$"
      }
    })
  })

  it(`Should pass if cookie is passed`, async () => {
    await assertSupertestSuccessRequest<ChangeUserPassword['payload']>({
      endpoint: 'auth/logout',
      method: "post",
      payload: {
        currentPassword: userPassword,
        newPassword: `${userPassword}123`
      },
      cookie: userToken
    })
  })
})