import { User } from '@prisma/client';
import { v4 } from 'uuid';
import { IncorrectPasswordError, UniqueConstraintViolationError, UserNotFoundError } from '../../src/ApiError';
import { prisma } from '../../src/config';
import authController from '../../src/controllers/authController';
import { registerUser } from '../../src/models/User';
import { ChangeUserPasswordPayload, LoginUserPayload, LogoutUserPayload, RegisterUserPayload, SuccessApiResponse, UserWithoutSecretFields } from '../../src/types';
import { hashPassword } from '../../src/utils';
import { mockRequest, mockResponse } from '../helpers/mocks';
import { expectUserResponse } from '../helpers/user';

// test this user for updating
let activeUser: UserWithoutSecretFields;

const userPassword = 'Secret123$$';
const differentPassword = 'Terces321$$';

// test this user for login, registration
let privateUser: User;

beforeAll(async () => {
  const userId = v4();
  privateUser = (await prisma.user.create({
    data: {
      id: userId,
      email: `${v4()}@gmail.com`,
      hashedPass: await hashPassword(userPassword),
      username: v4(),
      status: 'private',
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

describe('authController.login', () => {
  it(`Should fail on incorrect username or email`, async () => {
    const mockedRequest = mockRequest<LoginUserPayload>({
      body: {
        usernameOrEmail: `x${privateUser.email}`,
        password: userPassword
      }
    });
    const mockedResponse = mockResponse();
    await authController.login(mockedRequest, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(
      UserNotFoundError.statusCode
    );
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: UserNotFoundError.message
    });
  });

  it(`Should pass and set cookies correctly if valid email or username and password is provided`, async () => {
    const loginUserPayload: LoginUserPayload = {
      usernameOrEmail: privateUser.email,
      password: userPassword,
      remember: true
    };
    const mockedRequest = mockRequest<LoginUserPayload>({
      body: loginUserPayload
    });
    const mockedResponse = mockResponse();

    await authController.login(mockedRequest, mockedResponse);

    const mockedResponseData = mockedResponse.mockedJson.mock
      .calls[0][0] as SuccessApiResponse<UserWithoutSecretFields>;
    expect(mockedResponse.mockedCookie.mock.calls[0][1].length).toBeGreaterThan(
      0
    );
    expect(mockedResponse.mockedCookie.mock.calls[0][2].expires).toBeTruthy();
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expectUserResponse(
      privateUser,
      mockedResponseData.data
    );
    expect(mockedResponseData.data).not.toHaveProperty('password');
  });
});

describe('authController.logout', () => {
  it(`Should remove cookie successfully`, async () => {
    const mockedRequest = mockRequest<LogoutUserPayload>();
    const mockedResponse = mockResponse();

    await authController.logout(mockedRequest, mockedResponse);

    expect(mockedResponse.mockedClearCookie).toHaveBeenCalled();
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
  });

  it(`Should remove cookie successfully when logging out from all devices`, async () => {
    const mockedRequest = mockRequest<LogoutUserPayload>({
      body: { allDevices: true },
      user: { id: privateUser.id }
    });
    const mockedResponse = mockResponse();

    await authController.logout(mockedRequest, mockedResponse);

    expect(mockedResponse.mockedClearCookie).toHaveBeenCalled();
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
  })

  it(`Should fail to remove cookie successfully`, async () => {
    const mockedRequest = mockRequest<LogoutUserPayload>();
    const mockedResponse = mockResponse();
    mockedResponse.mockedClearCookie.mockImplementationOnce(() => {
      throw new Error();
    });
    await authController.logout(mockedRequest, mockedResponse);
    expect(mockedResponse.status).toHaveBeenCalledWith(500);
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: 'Something went wrong, please try again!'
    });
  });
});

describe('authController.me', () => {
  it(`Should succeed on valid cookie for user`, async () => {
    const mockedRequest = mockRequest<LoginUserPayload>({
      user: {
        username: activeUser.username,
        email: activeUser.email,
        name: activeUser.name,
        // This should be removed
        hashedPass: '123'
      }
    });
    const mockedResponse = mockResponse();
    await authController.me(mockedRequest, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        username: activeUser.username,
        email: activeUser.email,
        name: activeUser.name
      }
    });
  });
});

describe('authController.changePassword', () => {
  it('should not update on incorrect password', async () => {
    const mockedRequest = mockRequest<ChangeUserPasswordPayload>({
      body: {
        currentPassword: differentPassword,
        newPassword: userPassword
      },
      user: {
        hashedPass: privateUser.hashedPass
      }
    });
    const mockedResponse = mockResponse();
    await authController.changePassword(mockedRequest, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(
      IncorrectPasswordError.statusCode
    );
    expect(mockedResponse.json).toHaveBeenCalledWith({
      status: 'error',
      error: IncorrectPasswordError.message
    });
  });

  it('should update password correctly and remove auth cookies', async () => {
    const mockedRequest = mockRequest<ChangeUserPasswordPayload>({
      body: {
        currentPassword: userPassword,
        newPassword: differentPassword
      },
      user: {
        hashedPass: privateUser.hashedPass,
        id: privateUser.id
      }
    });
    const mockedResponse = mockResponse();
    await authController.changePassword(mockedRequest, mockedResponse);

    expect(mockedResponse.mockedClearCookie).toHaveBeenCalled();
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    const mockedResponseData = mockedResponse.mockedJson.mock
      .calls[0][0] as SuccessApiResponse<null>;
    expect(mockedResponseData.status).toBe('success');
  });
});