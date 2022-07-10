import { User } from '@prisma/client';
import { v4 } from 'uuid';
import { UniqueConstraintViolationError } from '../../src/ApiError';
import { prisma } from '../../src/config';
import authController from '../../src/controllers/authController';
import { registerUser } from '../../src/models/User';
import { RegisterUserPayload, SuccessApiResponse, UserWithoutSecretFields } from '../../src/types';
import hashPassword from '../../src/utils/hashPassword';
import { mockRequest, mockResponse } from '../helpers/mocks';
import { expectUserResponse } from '../helpers/user';

// test this user for login, registration
let privateUser: User;

// test this user for updating
let activeUser: UserWithoutSecretFields;

const userPassword = 'Secret123$$';

beforeAll(async () => {
  const userId = v4();
  privateUser = (await prisma.user.create({
    data: {
      id: userId,
      email: `${v4()}@gmail.com`,
      hashedPass: await hashPassword(userPassword),
      username: v4(),
      name: "John Doe Private"
    }
  }));

  activeUser = await registerUser({
    email: `${v4()}@gmail.com`,
    password: userPassword,
    username: v4().slice(0, 10),
    name: 'John Doe Public'
  });
});


describe('authController.register', () => {
  it(`Should fail if email is already taken`, async () => {
    const mockedRequest = mockRequest<RegisterUserPayload>({
      body: {
        email: activeUser.email,
        password: v4(),
        username: `${activeUser.username}1`,
        name: 'John Doe'
      }
    });
    const mockedResponse = mockResponse();
    await authController.register(mockedRequest, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(
      UniqueConstraintViolationError.statusCode
    );
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: UniqueConstraintViolationError.messageConstructor('user', 'email')
    });
  });

  it(`Should register user and set cookies correctly`, async () => {
    const registerUserPayload: RegisterUserPayload = {
      email: `${v4()}@gmail.com`,
      password: 'Secret123%%',
      username: v4().slice(0, 12),
      name: "John Doe"
    };
    const mockedRequest = mockRequest<RegisterUserPayload>({
      body: registerUserPayload
    });
    const mockedResponse = mockResponse();

    await authController.register(mockedRequest, mockedResponse);

    const mockedResponseData = mockedResponse.mockedJson.mock
      .calls[0][0] as SuccessApiResponse<User>;
    expect(mockedResponse.mockedCookie.mock.calls[0][1].length).toBeGreaterThan(
      0
    );
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expectUserResponse(registerUserPayload, mockedResponseData.data);
    expect(mockedResponseData.data).not.toHaveProperty('password');
  });
});